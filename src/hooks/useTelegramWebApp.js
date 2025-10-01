import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

/**
 * Хук для работы с Telegram Web App API
 * Определяет запущено ли приложение в Telegram и предоставляет доступ к WebApp API
 */
export function useTelegramWebApp() {
  const [isInTelegram, setIsInTelegram] = useState(false);
  const [user, setUser] = useState(null);
  const [platform, setPlatform] = useState('web');

  useEffect(() => {
    // Проверяем, запущено ли приложение в Telegram
    if (WebApp.initDataUnsafe?.user) {
      setIsInTelegram(true);
      setUser(WebApp.initDataUnsafe.user);
      setPlatform(WebApp.platform);
      
      // Настраиваем внешний вид
      WebApp.ready();
      WebApp.expand(); // Развернуть на весь экран
      
      // Настраиваем цвета под тему Telegram
      if (WebApp.themeParams.bg_color) {
        document.documentElement.style.setProperty('--tg-theme-bg-color', WebApp.themeParams.bg_color);
        document.documentElement.style.setProperty('--tg-theme-text-color', WebApp.themeParams.text_color);
      }

      console.log('✅ Telegram Web App initialized:', {
        user: WebApp.initDataUnsafe.user,
        platform: WebApp.platform,
        version: WebApp.version
      });
    } else {
      console.log('ℹ️ Running outside Telegram');
    }
  }, []);

  return {
    isInTelegram,
    user,
    platform,
    webApp: WebApp,
    
    // Полезные методы
    showBackButton: () => WebApp.BackButton.show(),
    hideBackButton: () => WebApp.BackButton.hide(),
    onBackButtonClick: (callback) => WebApp.BackButton.onClick(callback),
    showMainButton: (text, onClick) => {
      WebApp.MainButton.setText(text);
      WebApp.MainButton.onClick(onClick);
      WebApp.MainButton.show();
    },
    hideMainButton: () => WebApp.MainButton.hide(),
    close: () => WebApp.close(),
    openLink: (url) => WebApp.openLink(url),
    openTelegramLink: (url) => WebApp.openTelegramLink(url),
    showAlert: (message) => WebApp.showAlert(message),
    showConfirm: (message) => WebApp.showConfirm(message),
    showPopup: (params) => WebApp.showPopup(params),
    hapticFeedback: (type = 'impact', style = 'medium') => {
      if (type === 'impact') {
        WebApp.HapticFeedback.impactOccurred(style);
      } else if (type === 'notification') {
        WebApp.HapticFeedback.notificationOccurred(style);
      } else if (type === 'selection') {
        WebApp.HapticFeedback.selectionChanged();
      }
    }
  };
}
