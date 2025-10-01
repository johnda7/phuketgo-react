import { useEffect, useState } from 'react';
import { toursApi } from '../lib/directus';

// Моковые данные для fallback (если Directus недоступен)
const MOCK_TOURS = [
  {
    id: 1,
    slug: 'phi-phi-2days',
    title: 'Пхи-Пхи 2 дня',
    subtitle: 'Райские острова с ночёвкой',
    category: 'Острова',
    duration: '2 дня',
    group_size: '15 человек',
    price: 4500,
    rating: 4.9,
    description: 'Незабываемое путешествие на острова Пхи-Пхи с ночёвкой в отеле',
    photo_folder: 'phi-phi'
  },
  {
    id: 2,
    slug: 'james-bond-island',
    title: 'Остров Джеймса Бонда',
    subtitle: 'Залив Пханг Нга',
    category: 'Острова',
    duration: '1 день',
    group_size: '20 человек',
    price: 2800,
    rating: 4.8,
    description: 'Экскурсия к знаменитому острову из фильма про Джеймса Бонда',
    photo_folder: 'james-bond'
  }
];

/**
 * Хук для получения всех туров из Directus
 * @returns {{tours: Array, loading: boolean, error: string|null}} - Список туров, статус загрузки и ошибка
 */
export function useDirectusTours() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);
        const data = await toursApi.getAll();
        setTours(data);
        setError(null);
      } catch (err) {
        // Fallback на моковые данные если Directus недоступен
        console.warn('Directus unavailable, using mock data:', err);
        setTours(MOCK_TOURS);
        setError(null); // Не показываем ошибку пользователю
      } finally {
        setLoading(false);
      }
    }
    
    fetchTours();
  }, []);

  return { tours, loading, error };
}

/**
 * Хук для получения одного тура по slug
 * @param {string|undefined} slug - URL slug тура
 */
export function useDirectusTour(slug: string | undefined) {
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTour() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await toursApi.getBySlug(slug);
        setTour(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tour');
        console.error('Error in useDirectusTour:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTour();
  }, [slug]);

  return { tour, loading, error };
}
