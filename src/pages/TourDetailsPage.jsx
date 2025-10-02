import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDirectusTour } from '../hooks/useDirectusTours';
import { useTelegramWebApp } from '../hooks/useTelegramWebApp';
import { Clock, Users, Star, MapPin, Calendar, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function TourDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { tour, loading, error } = useDirectusTour(slug);
  const { isInTelegram, showBackButton, hideBackButton, onBackButtonClick, hapticFeedback } = useTelegramWebApp();
  const [selectedImage, setSelectedImage] = useState(0);

  // Настройка кнопки "Назад" в Telegram
  useEffect(() => {
    if (isInTelegram) {
      showBackButton();
      onBackButtonClick(() => {
        hapticFeedback('impact', 'light');
        navigate('/');
      });
      
      return () => hideBackButton();
    }
  }, [isInTelegram]);

  useEffect(() => {
    if (tour) {
      document.title = `${tour.title} | PhuketGo`;
    }
  }, [tour]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
          <p className="text-gray-600">Загрузка тура...</p>
        </div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Тур не найден</h2>
          <p className="text-gray-600 mb-8">{error || 'Извините, запрашиваемый тур не существует'}</p>
          <Link to="/" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  // Получаем главное фото из Directus или fallback на старую логику
  const getMainImage = () => {
    // Сначала проверяем main_image из Directus
    if (tour.main_image) {
      try {
        // Очищаем путь от лишних символов и убираем /src/
        let imagePath = tour.main_image.trim().replace(/^["']|["']$/g, ''); // удаляем кавычки
        imagePath = imagePath.replace('/src/', '../');
        return new URL(imagePath, import.meta.url).href;
      } catch (e) {
        console.error('Error loading main_image from Directus:', e);
      }
    }

    // Fallback на старую логику
    const specialMappings = {
      'james-bond-island': 'james-1-CrrUEsJ1.jpg',
      'racha-coral-islands': 'racha-1-DwZ8WjdT.jpg',
    };

    const slugToFolder = {
      'khao-lak-safari': 'kao-lak-safari',
      '11-islands-mega': 'eleven-islands-mega',
      '11-islands-standard': 'phi-phi-2days',
    };

    if (specialMappings[tour.slug]) {
      try {
        return new URL(`../../assets/${specialMappings[tour.slug]}`, import.meta.url).href;
      } catch { }
    }

    const photoFolder = slugToFolder[tour.slug] || tour.slug;

    try {
      return new URL(`../../assets/${photoFolder}/main-photo.jpg`, import.meta.url).href;
    } catch {
      try {
        return new URL(`../../assets/${photoFolder}/maya-bay-1.jpg`, import.meta.url).href;
      } catch {
        try {
          return new URL(`../../assets/${photoFolder}/gallery-01-railay-main.jpg`, import.meta.url).href;
        } catch {
          return null;
        }
      }
    }
  };

  // Получаем галерею из Directus
  const getGallery = () => {
    if (!tour.gallery) return [];
    
    try {
      // Парсим JSON если это строка
      let gallery = tour.gallery;
      
      // Если это строка, парсим её
      if (typeof gallery === 'string') {
        // Иногда Directus возвращает двойной JSON: "\"[...]\"" или "[...]"
        gallery = gallery.trim();
        // Убираем внешние кавычки если есть
        if (gallery.startsWith('"') && gallery.endsWith('"')) {
          gallery = gallery.slice(1, -1).replace(/\\"/g, '"');
        }
        gallery = JSON.parse(gallery);
      }
      
      if (!Array.isArray(gallery)) return [];
      
      // Преобразуем пути в URL
      return gallery.map(path => {
        try {
          // Очищаем путь от лишних символов и убираем /src/
          let imagePath = path.trim().replace(/^["']|["']$/g, ''); // удаляем кавычки
          imagePath = imagePath.replace('/src/', '../');
          return new URL(imagePath, import.meta.url).href;
        } catch (e) {
          console.error('Error loading gallery image:', path, e);
          return null;
        }
      }).filter(Boolean); // Убираем null значения
    } catch (e) {
      console.error('Error parsing gallery:', e);
      return [];
    }
  };

  const mainImage = getMainImage();
  const galleryImages = getGallery();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Breadcrumbs */}
      <section className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Link to="/" className="hover:text-red-600 transition">Главная</Link>
              <span>›</span>
              <span className="text-gray-700">{tour.title}</span>
            </div>
          </nav>
        </div>
      </section>

      {/* Photo Gallery Grid */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          {/* Главное фото + мини-галерея */}
          {galleryImages.length > 0 ? (
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-xl overflow-hidden">
                {/* Большое главное фото слева */}
                <div className="relative md:row-span-2 h-64 md:h-96">
                  <img 
                    src={galleryImages[0]} 
                    alt={tour.title}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition"
                    onClick={() => setSelectedImage(0)}
                  />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                    {tour.category === 'islands' && '🏝️ Острова'}
                    {tour.category === 'adventure' && '🎢 Приключения'}
                    {tour.category === 'cultural' && '🏛️ Культура'}
                    {tour.category === 'mainland' && '🏞️ Материк'}
                  </div>
                </div>

                {/* 4 маленьких фото справа */}
                {galleryImages.slice(1, 5).map((image, index) => (
                  <div key={index + 1} className="relative h-32 md:h-[11.75rem]">
                    <img 
                      src={image} 
                      alt={`${tour.title} - фото ${index + 2}`}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition"
                      onClick={() => setSelectedImage(index + 1)}
                    />
                    
                    {/* Кнопка "+N фото" на последнем фото */}
                    {index === 3 && galleryImages.length > 5 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer hover:bg-black/70 transition"
                           onClick={() => setSelectedImage(5)}>
                        <span className="text-white text-xl font-bold">
                          +{galleryImages.length - 5} фото
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Кнопка "Показать все N фото" */}
              {galleryImages.length > 5 && (
                <button 
                  className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-50 transition flex items-center gap-2"
                  onClick={() => setSelectedImage(0)}
                >
                  <span>📸</span>
                  <span className="font-semibold">Показать все {galleryImages.length} фото</span>
                </button>
              )}
            </div>
          ) : mainImage ? (
            // Fallback на старое главное фото если нет галереи
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden">
              <img 
                src={mainImage} 
                alt={tour.title}
                className="w-full h-full object-cover"
              />
              
              {/* Category badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                {tour.category === 'islands' && '🏝️ Острова'}
                {tour.category === 'adventure' && '🎢 Приключения'}
                {tour.category === 'cultural' && '🏛️ Культура'}
                {tour.category === 'mainland' && '🏞️ Материк'}
              </div>
            </div>
          ) : (
            // Fallback placeholder если совсем нет фото
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-4xl mb-2">🏝️</p>
                <p className="text-xl font-bold">{tour.title}</p>
              </div>
            </div>
          )}

          {/* Title and Meta */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{tour.title}</h1>
            {tour.subtitle && (
              <p className="text-lg text-gray-600 mb-4">{tour.subtitle}</p>
            )}
            
            {/* Meta info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-red-600" />
                <span className="font-medium">{tour.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-red-600" />
                <span className="font-medium">{tour.group_size}</span>
              </div>
              <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                <Star className="w-5 h-5 mr-1 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-gray-800">{tour.rating}</span>
                <span className="text-gray-500 ml-1">({tour.reviews_count})</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {tour.description && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Описание</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{tour.description}</p>
              </div>
            </div>
          )}

          {/* Price and Booking */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Цена от</p>
                <p className="text-4xl font-bold text-red-600">
                  {tour.price_adult}<span className="text-2xl ml-1">{tour.currency}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">за взрослого</p>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg hover:from-red-700 hover:to-red-800 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Забронировать тур
            </button>
            
            <div className="mt-4 text-center">
              <a 
                href="https://t.me/phuketgo" 
                className="text-red-600 hover:text-red-700 text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                📱 Написать в Telegram →
              </a>
            </div>
          </div>

          {/* Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">✨ Особенности тура</h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {tour.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Itinerary */}
          {tour.schedule && (() => {
            try {
              const schedule = typeof tour.schedule === 'string' ? JSON.parse(tour.schedule) : tour.schedule;
              return Array.isArray(schedule) && schedule.length > 0 ? (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">📅 Программа тура</h2>
                  <div className="space-y-4">
                    {schedule.map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                            {index + 1}
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              {item.time && <span className="text-gray-600 text-sm">{item.time}</span>}
                            </div>
                            <p className="text-gray-700">{item.activity || item.description || item}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;
            } catch (e) {
              console.error('Error parsing schedule:', e);
              return null;
            }
          })()}

          {/* Included */}
          {tour.included && (() => {
            try {
              const included = typeof tour.included === 'string' ? JSON.parse(tour.included) : tour.included;
              return Array.isArray(included) && included.length > 0 ? (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">💰 Включено в стоимость</h2>
                  <ul className="space-y-2">
                    {included.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null;
            } catch (e) {
              console.error('Error parsing included:', e);
              return null;
            }
          })()}

          {/* Excluded */}
          {tour.not_included && (() => {
            try {
              const notIncluded = typeof tour.not_included === 'string' ? JSON.parse(tour.not_included) : tour.not_included;
              return Array.isArray(notIncluded) && notIncluded.length > 0 ? (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">💸 Дополнительные расходы</h2>
                  <ul className="space-y-2">
                    {notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null;
            } catch (e) {
              console.error('Error parsing not_included:', e);
              return null;
            }
          })()}

          {/* Requirements */}
          {tour.what_to_bring && (() => {
            try {
              const whatToBring = typeof tour.what_to_bring === 'string' ? JSON.parse(tour.what_to_bring) : tour.what_to_bring;
              return Array.isArray(whatToBring) && whatToBring.length > 0 ? (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">🎒 Взять с собой</h2>
                  <ul className="space-y-2">
                    {whatToBring.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Info className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null;
            } catch (e) {
              console.error('Error parsing what_to_bring:', e);
              return null;
            }
          })()}

          {/* Important Info */}
          {tour.important_info && tour.important_info.length > 0 && (
            <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 text-yellow-600 mr-2" />
                Важно знать
              </h2>
              <ul className="space-y-2">
                {tour.important_info.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-3 flex-shrink-0">⚠️</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Mobile Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between sm:hidden z-50">
        <div>
          <div className="text-xs text-gray-600">От</div>
          <div className="text-lg font-bold text-red-600">฿{tour.price}</div>
        </div>
        <a 
          href="https://t.me/phuketgo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Написать в Telegram
        </a>
      </div>

      <Footer />
    </div>
  );
}
