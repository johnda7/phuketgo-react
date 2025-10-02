// 🎯 ЦЕНТРАЛЬНЫЙ ХУК ДЛЯ УПРАВЛЕНИЯ ТУРАМИ
// Адаптировано для Telegram Mini App

import { useState, useEffect, useMemo } from 'react';
import { toursRegistry } from '../data/toursRegistry';

export const useTours = () => {
  const [state, setState] = useState({
    allTours: [],
    popularTours: [],
    featuredTours: [],
    filteredTours: [],
    categories: [],
    tags: [],
    loading: true,
    selectedCategory: 'all',
    searchQuery: ''
  });

  // 🎯 ЗАГРУЗКА ТУРОВ ИЗ СТАТИЧЕСКИХ ДАННЫХ
  useEffect(() => {
    const loadTours = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));

        // 📦 Загружаем все активные туры
        const toursWithMeta = await Promise.all(
          toursRegistry
            .filter(tour => tour.isActive)
            .map(async (tour) => {
              try {
                const data = await tour.data();
                return {
                  id: tour.id,
                  name: tour.name,
                  category: tour.category,
                  tags: tour.tags,
                  isPopular: tour.isPopular,
                  isFeatured: tour.isFeatured,
                  priority: tour.priority,
                  data
                };
              } catch (error) {
                console.warn(`Failed to load tour ${tour.id}:`, error);
                return {
                  id: tour.id,
                  name: tour.name,
                  category: tour.category,
                  tags: tour.tags,
                  isPopular: tour.isPopular,
                  isFeatured: tour.isFeatured,
                  priority: tour.priority
                };
              }
            })
        );

        // Сортировка по приоритету
        toursWithMeta.sort((a, b) => a.priority - b.priority);

        // Извлекаем уникальные категории и теги
        const categories = Array.from(new Set(toursWithMeta.map(t => t.category)));
        const tags = Array.from(new Set(toursWithMeta.flatMap(t => t.tags)));

        setState(prev => ({
          ...prev,
          allTours: toursWithMeta,
          popularTours: toursWithMeta.filter(t => t.isPopular),
          featuredTours: toursWithMeta.filter(t => t.isFeatured),
          filteredTours: toursWithMeta,
          categories,
          tags,
          loading: false
        }));
      } catch (error) {
        console.error('Failed to load tours:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    loadTours();
  }, []);

  // 🔍 ФИЛЬТРАЦИЯ ПО КАТЕГОРИИ И ПОИСКУ
  const filteredTours = useMemo(() => {
    let filtered = state.allTours;

    // Фильтр по категории
    if (state.selectedCategory && state.selectedCategory !== 'all') {
      filtered = filtered.filter(tour =>
        tour.category === state.selectedCategory ||
        tour.tags.includes(state.selectedCategory)
      );
    }

    // Поиск
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(tour =>
        tour.name.toLowerCase().includes(query) ||
        tour.tags.some(tag => tag.toLowerCase().includes(query)) ||
        tour.data?.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [state.allTours, state.selectedCategory, state.searchQuery]);

  // 🔄 МЕТОДЫ УПРАВЛЕНИЯ
  const setCategory = (category) => {
    setState(prev => ({ ...prev, selectedCategory: category }));
  };

  const setSearchQuery = (query) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const getTourById = (id) => {
    return state.allTours.find(tour => tour.id === id);
  };

  const getToursByTag = (tag) => {
    return state.allTours.filter(tour => tour.tags.includes(tag));
  };

  return {
    ...state,
    filteredTours,

    // Методы
    setCategory,
    setSearchQuery,
    getTourById,
    getToursByTag,

    // Удобные флаги
    hasResults: filteredTours.length > 0,
    totalCount: state.allTours.length,
    filteredCount: filteredTours.length
  };
};
