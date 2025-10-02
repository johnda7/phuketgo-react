import { useState, useEffect } from 'react';
import { useDirectusTours } from './hooks/useDirectusTours';
import { useTelegramWebApp } from './hooks/useTelegramWebApp';
import { ToursGrid } from './components/tours/TourCard.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { tours, loading, error } = useDirectusTours();
  const { isInTelegram, user, platform, hapticFeedback } = useTelegramWebApp();
  
  // Отладка: показываем что получили от Directus
  useEffect(() => {
    console.log('🔍 DEBUG Tours:', { count: tours.length, loading, error, tours });
  }, [tours, loading, error]);
  
  // Показываем информацию о пользователе Telegram (если запущено в Telegram)
  useEffect(() => {
    if (isInTelegram && user) {
      console.log('👤 Telegram User:', user);
    }
  }, [isInTelegram, user]);
  
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

  // Добавляем вибрацию при смене категории (только в Telegram)
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (isInTelegram) {
      hapticFeedback('selection');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Header />
      
      <main className="container mx-auto p-4 flex-1">
        {/* Telegram User Info (показывается только в Telegram) */}
        {isInTelegram && user && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
            <span className="text-blue-700">
              👋 Привет, {user.first_name}! Приложение запущено в Telegram ({platform})
            </span>
          </div>
        )}

        {/* Hero Section */}
        <section className="mb-8 text-center py-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Лучшие туры на Пхукете 🏝️
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Забронируйте незабываемые экскурсии на острова, рафтинг, сафари и культурные туры. 
            Русскоговорящие гиды, низкие цены, быстрое бронирование в Telegram.
          </p>
        </section>

        {/* Categories Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
      
      <Footer />
    </div>
  );
}
