import { useState } from 'react';
import { useDirectusTours } from './src/hooks/useDirectusTours';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // 🎯 ИСПОЛЬЗУЕМ DIRECTUS API через Custom Hook
  const { tours, loading, error } = useDirectusTours();
  
  const categories = ['all', 'islands', 'mainland', 'adventure', 'cultural'];
  const categoryNames = {
    all: 'Все',
    islands: 'Острова',
    mainland: 'Материк', 
    adventure: 'Приключения',
    cultural: 'Культура'
  };

  // Фильтрация туров по категории
  const filtered = activeCategory === 'all' 
    ? tours 
    : tours.filter(tour => tour.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold">PhuketGo</h1>
        <p className="text-sm text-gray-600">Откройте лучшие места Пхукета</p>
      </header>
      <main className="container mx-auto p-4">
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {categoryNames[cat]}
            </button>
          ))}
        </div>
        
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <p className="mt-2 text-gray-600">Загрузка туров из Directus...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Ошибка загрузки туров</p>
            <p className="text-sm">{error}</p>
            <p className="text-xs mt-2">Проверьте что Directus запущен: curl http://localhost:8055/items/tours</p>
          </div>
        )}
        
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            <p>Туры не найдены в категории "{categoryNames[activeCategory]}"</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(tour => (
            <div key={tour.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                <div className="text-center">
                  <p className="text-sm opacity-75">{tour.category}</p>
                  <p className="text-3xl font-bold">🏝️</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{tour.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{tour.subtitle}</p>
                {tour.description && (
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">{tour.description}</p>
                )}
                <div className="flex justify-between items-center mt-4">
                  <span className="flex items-center text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{tour.rating}</span>
                    <span className="text-gray-500 ml-1">({tour.reviews_count})</span>
                  </span>
                  <span className="font-semibold text-red-600">
                    {tour.price_adult} {tour.currency}
                  </span>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <p>⏱️ {tour.duration}</p>
                  <p>👥 {tour.group_size}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!loading && !error && filtered.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            <p>Показано туров: {filtered.length} из {tours.length}</p>
            <p className="text-sm mt-2">🎯 Данные загружены из Directus CMS</p>
          </div>
        )}
      </main>
    </div>
  );
}
