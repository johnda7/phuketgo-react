import { createDirectus, rest, readItems, readItem, createItem } from '@directus/sdk';

// Типы для наших коллекций
export interface Tour {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price_adult: number;
  price_child: number;
  price_infant: number;
  currency: string;
  duration: string;
  group_size: string;
  rating: number;
  reviews_count: number;
  category: 'islands' | 'mainland' | 'adventure' | 'cultural';
  tags: string[];
  status: 'published' | 'draft' | 'archived';
  main_image?: string;
  gallery?: string[];
  schedule?: any[];
  included?: string[];
  not_included?: string[];
  what_to_bring?: string[];
  date_created: string;
  date_updated: string;
}

export interface Booking {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  tour_id: number;
  adults: number;
  children: number;
  infants: number;
  total_price: number;
  status: 'new' | 'confirmed' | 'cancelled';
  date_created: string;
}

// Схема коллекций для типизации
type Schema = {
  tours: Tour[];
  bookings: Booking[];
};

// Используем переменную окружения VITE_DIRECTUS_URL если есть
const directusUrl = (import.meta as any).env?.VITE_DIRECTUS_URL || 'http://localhost:8055';
export const DIRECTUS_BASE_URL = directusUrl;

export const directus = createDirectus<Schema>(directusUrl).with(rest());

// Вспомогательные функции для работы с турами
export const toursApi = {
  // Получить все опубликованные туры
  async getAll() {
    try {
      const tours = await directus.request(
        readItems('tours', {
          filter: {
            status: {
              _eq: 'published'
            }
          },
          sort: ['-date_created']
        })
      );
      return tours || [];
    } catch (error) {
      console.error('Error fetching tours:', error);
      return [];
    }
  },

  // Получить тур по slug
  async getBySlug(slug: string) {
    try {
      const tours = await directus.request(
        readItems('tours', {
          filter: {
            slug: {
              _eq: slug
            },
            status: {
              _eq: 'published'
            }
          },
          limit: 1
        })
      );
      return tours[0] || null;
    } catch (error) {
      console.error('Error fetching tour:', error);
      return null;
    }
  },

  // Получить тур по ID
  async getById(id: number) {
    try {
      const tour = await directus.request(
        readItem('tours', id)
      );
      return tour;
    } catch (error) {
      console.error('Error fetching tour:', error);
      return null;
    }
  }
};

// Вспомогательные функции для работы с бронированиями
export const bookingsApi = {
  // Создать новое бронирование
  async create(bookingData: Omit<Booking, 'id' | 'date_created'>) {
    try {
      const booking = await directus.request(
        createItem('bookings', bookingData)
      );
      return booking;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }
};
