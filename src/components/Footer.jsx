import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-3xl">🏝️</div>
              <h3 className="text-xl font-bold">PhuketGo</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Telegram Mini App №1 для бронирования туров на Пхукете. Лучшие экскурсии, низкие цены, русскоговорящие гиды.
            </p>
            <a 
              href="https://t.me/phuketgo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
            >
              <MessageCircle className="w-4 h-4" />
              Открыть в Telegram
            </a>
          </div>

          {/* Popular Tours */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Популярные туры</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tour/phi-phi-2days" className="text-gray-400 hover:text-white transition">
                  Пхи-Пхи 2 дня / 1 ночь
                </Link>
              </li>
              <li>
                <Link to="/tour/james-bond-island" className="text-gray-400 hover:text-white transition">
                  Остров Джеймса Бонда
                </Link>
              </li>
              <li>
                <Link to="/tour/11-islands-mega" className="text-gray-400 hover:text-white transition">
                  11 островов МЕГА-ТУР
                </Link>
              </li>
              <li>
                <Link to="/tour/rafting-spa-atv" className="text-gray-400 hover:text-white transition">
                  Рафтинг + СПА + ATV
                </Link>
              </li>
              <li>
                <Link to="/tour/dostoprimechatelnosti-phuketa" className="text-gray-400 hover:text-white transition">
                  Достопримечательности Пхукета
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Категории</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/?category=islands" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <span>🏝️</span> Острова
                </Link>
              </li>
              <li>
                <Link to="/?category=adventure" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <span>🎢</span> Приключения
                </Link>
              </li>
              <li>
                <Link to="/?category=cultural" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <span>🏛️</span> Культура
                </Link>
              </li>
              <li>
                <Link to="/?category=mainland" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <span>🏞️</span> Материк
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Пхукет, Таиланд</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <a 
                  href="https://t.me/phuketgo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  @phuketgo
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <a 
                  href="mailto:info@phuketgo.com" 
                  className="text-gray-400 hover:text-white transition"
                >
                  info@phuketgo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} PhuketGo. Все права защищены.</p>
          <p className="mt-2">
            Made with ❤️ for travelers | Powered by Directus CMS + React + Telegram
          </p>
        </div>
      </div>
    </footer>
  );
}
