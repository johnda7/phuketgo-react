// Webhook для Telegram бота
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const update = req.body;
    
    // Обработка сообщений от Telegram
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      
      // Простой ответ
      if (text === '/start') {
        await sendMessage(chatId, 'Добро пожаловать в PhuketGo! 🌴\n\nВыберите категорию:', {
          reply_markup: {
            inline_keyboard: [
              [{ text: '🏨 Отели', callback_data: 'hotels' }],
              [{ text: '🍽️ Рестораны', callback_data: 'restaurants' }],
              [{ text: '🏖️ Пляжи', callback_data: 'beaches' }],
              [{ text: '🎯 Активности', callback_data: 'activities' }]
            ]
          }
        });
      }
    }
    
    // Обработка нажатий на кнопки
    if (update.callback_query) {
      const chatId = update.callback_query.message.chat.id;
      const data = update.callback_query.data;
      
      // Получаем места по категории
      const places = getPlacesByCategory(data);
      const message = formatPlacesMessage(places);
      
      await sendMessage(chatId, message);
    }
    
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Функция отправки сообщения в Telegram
async function sendMessage(chatId, text, options = {}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
      ...options
    })
  });
  
  return response.json();
}

// Получение мест по категории (пока статичные данные)
function getPlacesByCategory(category) {
  const allPlaces = [
    {
      id: 1,
      name: "Ленивое секретное озеро",
      category: "activities",
      rating: 4.8,
      price: "от $50",
      location: "Пхукет",
      description: "Скрытое озеро в джунглях с кристально чистой водой"
    },
    {
      id: 2,
      name: "Симиланы 7",
      category: "beaches",
      rating: 4.9,
      price: "от $70",
      location: "Симиланские острова",
      description: "Один из красивейших пляжей Таиланда"
    }
  ];
  
  return allPlaces.filter(place => place.category === category);
}

// Форматирование сообщения с местами
function formatPlacesMessage(places) {
  if (places.length === 0) {
    return 'Места в этой категории пока не найдены 😔';
  }
  
  let message = `Найдено мест: ${places.length}\n\n`;
  
  places.forEach(place => {
    message += `🏷️ <b>${place.name}</b>\n`;
    message += `📍 ${place.location}\n`;
    message += `⭐ ${place.rating} | 💰 ${place.price}\n`;
    message += `${place.description}\n\n`;
  });
  
  return message;
}