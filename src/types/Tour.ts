// 🎯 ТИПЫ ДЛЯ ТУРОВ - ЕДИНСТВЕННЫЙ ИСТОЧНИК ПРАВДЫ
// Используется во всех файлах туров для обеспечения согласованности данных

export interface ItineraryItem {
  day: string;
  time: string;
  activity: string;
}

export interface TourData {
  // 🆔 ИДЕНТИФИКАЦИЯ
  id: string;
  title: string;
  subtitle: string;
  description: string;
  route: string;

  // 💰 ЦЕНООБРАЗОВАНИЕ
  priceAdult: number;
  priceChild: number;
  priceInfant?: number;
  currency: string;

  // ⏱️ ХАРАКТЕРИСТИКИ
  duration: string;
  groupSize: string;
  rating: number;
  reviewsCount: number;

  // 🖼️ МЕДИА
  mainImage: string;
  gallery: string[];

  // 📋 ОПИСАТЕЛЬНЫЕ СПИСКИ
  highlights: string[];
  included: string[];
  excluded: string[];
  requirements?: string[];
  importantInfo?: string[];

  // 📅 ПРОГРАММА ТУРА
  itinerary: ItineraryItem[];

  // 🏷️ ТЕГИ И КАТЕГОРИИ
  tags?: string[];
  category?: 'islands' | 'adventure' | 'cultural' | 'mainland' | 'diving' | 'fishing';
  isPopular?: boolean;
}
