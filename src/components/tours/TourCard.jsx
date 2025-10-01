// Карточка одного тура. Использует данные из Directus
// Фотографии загружаются из src/assets/{slug}/
export function TourCard({ tour }) {
  // Пытаемся загрузить главное фото тура
  const getMainImage = () => {
    try {
      // Пробуем разные варианты главного фото
      return new URL(`../../assets/${tour.slug}/main-photo.jpg`, import.meta.url).href;
    } catch {
      try {
        return new URL(`../../assets/${tour.slug}/maya-bay-1.jpg`, import.meta.url).href;
      } catch {
        try {
          return new URL(`../../assets/${tour.slug}/gallery-01-railay-main.jpg`, import.meta.url).href;
        } catch {
          // Fallback на градиент если фото не найдено
          return null;
        }
      }
    }
  };

  const mainImage = getMainImage();

  return (
    <div className="group border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white flex flex-col transform hover:-translate-y-2">
      <div className="w-full h-56 relative overflow-hidden">
        {mainImage ? (
          <>
            <img 
              src={mainImage} 
              alt={tour.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                // Если фото не загрузилось, показываем градиент
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-full h-full bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 items-center justify-center">
              <div className="text-center text-white">
                <p className="text-xs uppercase tracking-wide opacity-80">{tour.category}</p>
                <p className="text-4xl mt-2" aria-hidden>🏝️</p>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-xs uppercase tracking-wide opacity-80">{tour.category}</p>
              <p className="text-4xl mt-2" aria-hidden>🏝️</p>
            </div>
          </div>
        )}
        {/* Категория бейдж */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-md">
          {tour.category === 'islands' && '🏝️ Острова'}
          {tour.category === 'adventure' && '🎢 Приключения'}
          {tour.category === 'cultural' && '🏛️ Культура'}
          {tour.category === 'mainland' && '🏞️ Материк'}
        </div>
        {/* Темный оверлей снизу для лучшей читаемости */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-800 group-hover:text-red-600 transition-colors" title={tour.title}>
          {tour.title}
        </h3>
        {tour.subtitle && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 font-medium" title={tour.subtitle}>
            {tour.subtitle}
          </p>
        )}
        {tour.description && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
            {tour.description}
          </p>
        )}
        
        {/* Детали тура */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-lg mr-2">⏱️</span>
            <span className="font-medium">{tour.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-lg mr-2">👥</span>
            <span className="font-medium">{tour.group_size}</span>
          </div>
        </div>

        {/* Рейтинг и цена */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
              <span className="text-yellow-500 text-base">★</span>
              <span className="ml-1 font-bold text-gray-800">{tour.rating}</span>
              <span className="text-gray-500 text-xs ml-1">({tour.reviews_count})</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">от</div>
            <div className="font-bold text-2xl text-red-600">
              {tour.price_adult}<span className="text-lg ml-1">{tour.currency}</span>
            </div>
          </div>
        </div>

        {/* Кнопка */}
        <button className="mt-4 w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg hover:from-red-700 hover:to-red-800 text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105">
          Подробнее →
        </button>
      </div>
    </div>
  );
}

export function ToursGrid({ tours }) {
  if (!tours?.length) {
    return <p className="text-center text-gray-500 py-8">Туры не найдены</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map(t => <TourCard key={t.id} tour={t} />)}
    </div>
  );
}
