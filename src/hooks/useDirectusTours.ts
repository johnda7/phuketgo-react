import { useEffect, useState } from 'react';
import { toursApi } from '../lib/directus';

/**
 * Хук для получения всех туров из Directus
 * @returns {{tours: Array, loading: boolean, error: string|null}} - Список туров, статус загрузки и ошибка
 */
export function useDirectusTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);
        const data = await toursApi.getAll();
        setTours(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tours');
        console.error('Error in useDirectusTours:', err);
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
export function useDirectusTour(slug) {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
