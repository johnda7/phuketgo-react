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

  // Получаем главное фото
  const getMainImage = () => {
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

  const mainImage = getMainImage();

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

      {/* Main Image */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-4">
            {mainImage ? (
              <img 
                src={mainImage} 
                alt={tour.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-4xl mb-2">🏝️</p>
                  <p className="text-xl font-bold">{tour.title}</p>
                </div>
              </div>
            )}
            
            {/* Category badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              {tour.category === 'islands' && '🏝️ Острова'}
              {tour.category === 'adventure' && '🎢 Приключения'}
              {tour.category === 'cultural' && '🏛️ Культура'}
              {tour.category === 'mainland' && '🏞️ Материк'}
            </div>
          </div>

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
          {tour.itinerary && tour.itinerary.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">📅 Программа тура</h2>
              <div className="space-y-4">
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        {index + 1}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          {item.day && <span className="font-bold text-red-600">{item.day}</span>}
                          {item.time && <span className="text-gray-600 text-sm">{item.time}</span>}
                        </div>
                        <p className="text-gray-700">{item.activity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Included */}
          {tour.included && tour.included.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">💰 Включено в стоимость</h2>
              <ul className="space-y-2">
                {tour.included.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Excluded */}
          {tour.excluded && tour.excluded.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">💸 Дополнительные расходы</h2>
              <ul className="space-y-2">
                {tour.excluded.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {tour.requirements && tour.requirements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">🎒 Взять с собой</h2>
              <ul className="space-y-2">
                {tour.requirements.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Info className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
