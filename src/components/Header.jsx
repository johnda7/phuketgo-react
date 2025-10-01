import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="py-2 border-b border-gray-100 hidden md:flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Пхукет, Таиланд</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <a href="tel:+66123456789" className="hover:text-red-600">+66 12 345 6789</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://t.me/phuketgo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Telegram</span>
            </a>
          </div>
        </div>

        {/* Main header */}
        <div className="py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-3xl">🏝️</div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">PhuketGo</h1>
              <p className="text-xs text-gray-600 hidden md:block">Откройте лучшие места Пхукета</p>
            </div>
          </Link>

          {/* Mobile Telegram button */}
          <a 
            href="https://t.me/phuketgo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="md:hidden bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
          >
            Telegram
          </a>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a 
              href="https://t.me/phuketgo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg"
            >
              📱 Забронировать в Telegram
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
