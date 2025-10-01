// Карточка одного тура. Использует данные из Directus
// Позже можно заменить фон на реальное изображение (tour.main_image)
export function TourCard({ tour }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white flex flex-col">
      <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white relative">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wide opacity-80">{tour.category}</p>
          <p className="text-2xl" aria-hidden>🏝️</p>
        </div>
        {tour.main_image && (
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
            {/* TODO: Заменить на компонент <img /> с URL файла из Directus */}
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold mb-1 line-clamp-2" title={tour.title}>{tour.title}</h3>
        {tour.subtitle && <p className="text-gray-600 text-sm mb-2 line-clamp-1" title={tour.subtitle}>{tour.subtitle}</p>}
        {tour.description && (
          <p className="text-gray-700 text-sm mb-3 line-clamp-3 flex-1">{tour.description}</p>
        )}
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p>⏱️ {tour.duration}</p>
          <p>👥 {tour.group_size}</p>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="flex items-center text-sm">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{tour.rating}</span>
            <span className="text-gray-500 ml-1">({tour.reviews_count})</span>
          </span>
          <span className="font-semibold text-red-600">
            {tour.price_adult} {tour.currency}
          </span>
        </div>
        <button className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 text-sm font-medium transition-colors">
          Подробнее
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
