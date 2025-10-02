// 🖼️ GALLERY COMPONENT - Адаптировано для Telegram Mini App
// Mobile: Карусель с точками (ОДНА фото на экран)
// Desktop: Grid галерея + модальное окно

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Grid3x3 } from 'lucide-react';

export const Gallery = ({ images = [], tourTitle = '', onOpenModal, onOpenGallery }) => {
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState(0);

  // 📱 Mobile Gallery Scroll Handler
  const handleMobileGalleryScroll = (e) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const newIndex = Math.round(scrollLeft / containerWidth);
    setMobileGalleryIndex(newIndex);
  };

  // Показываем только первые 6 фото для мобильной карусели
  const mobileImages = images.slice(0, 6);
  
  return (
    <>
      {/* 📱 МОБИЛЬНАЯ КАРУСЕЛЬ - во всю ширину экрана */}
      <div className="md:hidden">
        <div className="relative">
          {/* Карусель с свайпом */}
          <div 
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            onScroll={handleMobileGalleryScroll}
            style={{ scrollBehavior: 'smooth' }}
            id="mobile-gallery"
          >
            {mobileImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full snap-center"
                onClick={() => onOpenModal && onOpenModal(image, index)}
              >
                <div className="relative w-full h-[300px] bg-gray-100">
                  <img
                    src={image}
                    alt={`${tourTitle} - фото ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Точки-индикаторы */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {mobileImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  const gallery = document.getElementById('mobile-gallery');
                  if (gallery) {
                    gallery.scrollTo({
                      left: index * gallery.clientWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === mobileGalleryIndex
                    ? 'bg-white w-6'
                    : 'bg-white/60'
                }`}
                aria-label={`Перейти к фото ${index + 1}`}
              />
            ))}
          </div>

          {/* Кнопка "Показать все фото" */}
          {images.length > 1 && (
            <button
              onClick={onOpenGallery}
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-white transition-all duration-300 flex items-center gap-2"
            >
              <Grid3x3 className="w-4 h-4" />
              <span>{images.length} фото</span>
            </button>
          )}
        </div>
      </div>

      {/* 🖥️ DESKTOP ГАЛЕРЕЯ - Grid */}
      <div className="hidden md:block container mx-auto px-4">
        <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden">
          {/* Главное фото - 2x2 */}
          <div className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden">
            <img
              src={images[0]}
              alt={`${tourTitle} - главное фото`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onClick={() => onOpenModal && onOpenModal(images[0], 0)}
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          {/* Остальные фото - по одному */}
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index + 1}
              className="relative group cursor-pointer overflow-hidden aspect-square"
              onClick={() => onOpenModal && onOpenModal(image, index + 1)}
            >
              <img
                src={image}
                alt={`${tourTitle} - фото ${index + 2}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              
              {/* Последнее фото - показываем счетчик */}
              {index === 3 && images.length > 5 && (
                <div
                  className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenGallery && onOpenGallery();
                  }}
                >
                  <div className="text-center text-white">
                    <Grid3x3 className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-xl font-bold">+{images.length - 5}</p>
                    <p className="text-sm">Показать все</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Кнопка "Смотреть все фото" под grid */}
        {images.length > 5 && (
          <div className="mt-4 text-center">
            <button
              onClick={onOpenGallery}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              <Grid3x3 className="w-5 h-5" />
              <span>Смотреть все {images.length} фото</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// 🎯 ПОЛНОЭКРАННАЯ ГАЛЕРЕЯ (Modal)
export const FullScreenGallery = ({ 
  images = [], 
  currentIndex = 0, 
  onClose, 
  onNext, 
  onPrev, 
  tourTitle = '' 
}) => {
  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      {/* Закрыть */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors z-10"
        aria-label="Закрыть галерею"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Счетчик */}
      <div className="absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded-full text-sm font-semibold z-10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Главное изображение */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <img
          src={images[currentIndex]}
          alt={`${tourTitle} - фото ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Стрелка назад */}
      {currentIndex > 0 && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors"
          aria-label="Предыдущее фото"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Стрелка вперед */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors"
          aria-label="Следующее фото"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Thumbnails (опционально) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
        {images.slice(0, 10).map((image, index) => (
          <button
            key={index}
            onClick={() => {
              // Можно добавить функцию для переключения на конкретное фото
            }}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              index === currentIndex
                ? 'border-white scale-110'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={image}
              alt={`Превью ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
