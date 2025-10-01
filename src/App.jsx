import { useState } from 'react';
import { useDirectusTours } from './hooks/useDirectusTours';
import { ToursGrid } from './components/tours/TourCard.jsx';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { tours, loading, error } = useDirectusTours();
  
  const categories = ['all', 'islands', 'mainland', 'adventure', 'cultural'];
  const categoryNames = {
    all: 'Все',
    islands: 'Острова',
    mainland: 'Материк', 
    adventure: 'Приключения',
    cultural: 'Культура'
  };

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
        
        <ToursGrid tours={filtered} />
        
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
