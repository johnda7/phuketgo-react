// 🎯 ЭТАЛОННАЯ СТРАНИЦА ТУРА ДЛЯ TELEGRAM MINI APP
// Адаптировано из island-travel-echo-clone с учетом Telegram WebApp
// Архитектура: Mobile-First с Gallery + Desktop Sidebar + Booking Modal

import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDirectusTour } from '../hooks/useDirectusTours';
import { useTelegramWebApp } from '../hooks/useTelegramWebApp';
import { 
  Clock, Users, Star, MapPin, Calendar, 
  CheckCircle, XCircle, AlertCircle, Info,
  ChevronLeft, ChevronRight, X, Grid3x3
} from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Gallery, FullScreenGallery } from '../components/GalleryTour.jsx';
import { UniversalBookingModal } from '../components/UniversalBookingModal';
import { MobileBookingBar } from '../components/MobileBookingBar';
import { ModalPortal } from '../components/ModalPortal';
import { TourTags } from '../components/TourTags';

export default function TourDetailsPageNew() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { tour, loading, error } = useDirectusTour(slug);
  const { isInTelegram, showBackButton, hideBackButton, onBackButtonClick, hapticFeedback } = useTelegramWebApp();
  
  // 🎨 Состояние UI
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState(0);

  // 🔙 Настройка кнопки "Назад" в Telegram
  useEffect(() => {
    if (isInTelegram) {
      showBackButton();
      onBackButtonClick(() => {
        hapticFeedback('impact', 'light');
        navigate('/');
      });
      
      return () => hideBackButton();
    }
  }, [isInTelegram, navigate, showBackButton, hideBackButton, onBackButtonClick, hapticFeedback]);

  // 📄 Обновление title
  useEffect(() => {
    if (tour) {
      document.title = `${tour.title} | PhuketGo`;
    }
  }, [tour]);

  // 🖼️ Галерея: открытие модального окна
  const openModal = useCallback((image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setShowFullGallery(true);
  }, []);

  const openGallery = useCallback(() => {
    if (tour?.gallery && tour.gallery.length > 0) {
      setShowFullGallery(true);
      setSelectedImage(tour.gallery[0]);
      setCurrentImageIndex(0);
    }
  }, [tour]);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setShowFullGallery(false);
  }, []);

  const nextImage = useCallback(() => {
    if (!tour?.gallery) return;
    setCurrentImageIndex((prev) => {
      const nextIndex = (prev + 1) % tour.gallery.length;
      setSelectedImage(tour.gallery[nextIndex]);
      return nextIndex;
    });
  }, [tour]);

  const prevImage = useCallback(() => {
    if (!tour?.gallery) return;
    setCurrentImageIndex((prev) => {
      const prevIndex = prev === 0 ? tour.gallery.length - 1 : prev - 1;
      setSelectedImage(tour.gallery[prevIndex]);
      return prevIndex;
    });
  }, [tour]);

  // 🎯 Booking Modal
  const handleOpenBooking = useCallback(() => {
    if (isInTelegram) {
      hapticFeedback('impact', 'medium');
    }
    setShowBookingModal(true);
  }, [isInTelegram, hapticFeedback]);

  const handleCloseBooking = useCallback(() => {
    setShowBookingModal(false);
  }, []);

  // ⏳ Loading state
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

  // ❌ Error state
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

  return (
    <div className="min-h-screen bg-white overflow-x-hidden pb-20 lg:pb-0">
      <Header />
      
      {/* 📍 Breadcrumbs */}
      <section className="pt-20 pb-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Link to="/" className="hover:text-red-600 transition-colors">
                Главная
              </Link>
              <span>›</span>
              <Link to="/tours" className="hover:text-red-600 transition-colors">
                Туры
              </Link>
              <span>›</span>
              <span className="text-gray-700">{tour.title}</span>
            </div>
          </nav>
        </div>
      </section>

      {/* 🖼️ Gallery Section - КРИТИЧНО! */}
      <section className="pb-2">
        {tour.gallery && tour.gallery.length > 0 && (
          <Gallery
            images={tour.gallery}
            tourTitle={tour.title}
            onOpenModal={openModal}
            onOpenGallery={openGallery}
          />
        )}
      </section>

      {/* 📱 Main Content with Desktop Sidebar */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* 📄 Main Column - Content */}
          <div className="md:col-span-2">
            
            {/* 🏷️ Title and Tags */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                {tour.title}
              </h1>
              {tour.subtitle && (
                <p className="text-lg text-gray-600 mb-4">{tour.subtitle}</p>
              )}
              
              {/* 🏷️ Tags */}
              {tour.tags && tour.tags.length > 0 && (
                <TourTags tags={tour.tags} />
              )}
            </div>

            {/* 📊 Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
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

            {/* 📝 Description */}
            {tour.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Описание</h2>
                <div 
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: tour.description }}
                />
              </div>
            )}

            {/* ✨ Highlights */}
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

            {/* 📅 Itinerary - Программа тура */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">📅 Программа тура</h2>
                <div className="space-y-4">
                  {tour.itinerary.map((item, index) => (
                    <div key={index} className="relative pl-8 pb-6 border-l-4 border-red-600">
                      <div className="absolute -left-3 top-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center gap-3 mb-2">
                          {item.day && (
                            <span className="font-bold text-red-600">{item.day}</span>
                          )}
                          {item.time && (
                            <span className="text-gray-600 text-sm">{item.time}</span>
                          )}
                        </div>
                        <p className="text-gray-700">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 💰 Включено / Не включено (Grid 2 колонки) */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Включено */}
              {tour.included && tour.included.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">✅ Включено</h2>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Не включено */}
              {tour.excluded && tour.excluded.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">❌ Не включено</h2>
                  <ul className="space-y-2">
                    {tour.excluded.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* ⚠️ Important Info */}
            {tour.important_info && tour.important_info.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">⚠️ Важная информация</h2>
                <ul className="space-y-2">
                  {tour.important_info.map((info, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{info}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 📋 Requirements */}
            {tour.requirements && tour.requirements.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">📋 Требования</h2>
                <ul className="space-y-2">
                  {tour.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <Info className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* 📌 Desktop Sidebar - STICKY */}
          <div className="hidden md:block">
            <div className="sticky top-24 bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
              
              {/* 💰 Price */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Цена от</p>
                <p className="text-4xl font-bold text-red-600">
                  {tour.price_adult}
                  <span className="text-2xl ml-1">{tour.currency}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">за взрослого</p>
                {tour.price_child && (
                  <p className="text-sm text-gray-600 mt-2">
                    Дети: {tour.price_child} {tour.currency}
                  </p>
                )}
              </div>

              {/* 🎯 Booking Button */}
              <button 
                onClick={handleOpenBooking}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg hover:from-red-700 hover:to-red-800 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
              >
                Забронировать тур
              </button>

              {/* 📱 Telegram Link */}
              <div className="text-center">
                <a 
                  href="https://t.me/phuketgo" 
                  className="text-red-600 hover:text-red-700 text-sm font-medium inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📱 Написать в Telegram →
                </a>
              </div>

              {/* ℹ️ Quick Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Длительность:</span>
                  <span className="font-semibold text-gray-800">{tour.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Группа:</span>
                  <span className="font-semibold text-gray-800">{tour.group_size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Рейтинг:</span>
                  <span className="font-semibold text-gray-800">⭐ {tour.rating}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 📱 Mobile Booking Bar - FIXED BOTTOM */}
      {isInTelegram && (
        <MobileBookingBar
          price={tour.price_adult}
          currency={tour.currency}
          onBookClick={handleOpenBooking}
        />
      )}

      {/* 🎯 Booking Modal */}
      {showBookingModal && (
        <ModalPortal>
          <UniversalBookingModal
            isOpen={showBookingModal}
            onClose={handleCloseBooking}
            tourTitle={tour.title}
            tourId={slug}
            priceAdult={tour.price_adult}
            priceChild={tour.price_child}
            currency={tour.currency}
          />
        </ModalPortal>
      )}

      {/* 🖼️ Full Screen Gallery Modal */}
      {showFullGallery && tour.gallery && (
        <FullScreenGallery
          images={tour.gallery}
          currentIndex={currentImageIndex}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
          tourTitle={tour.title}
        />
      )}

      <Footer />
    </div>
  );
}
