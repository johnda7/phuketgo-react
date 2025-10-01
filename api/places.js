// API для получения мест (для фронтенда)
export default async function handler(req, res) {
  // Разрешаем CORS для фронтенда
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { category } = req.query;
    
    // Статичные данные (позже можно подключить БД)
    const allPlaces = [
      {
        id: 1,
        name: "Ленивое секретное озеро",
        category: "activities",
        image: "https://picsum.photos/600/400?random=1",
        rating: 4.8,
        price: "от $50",
        location: "Пхукет",
        description: "Скрытое озеро в джунглях с кристально чистой водой"
      },
      {
        id: 2,
        name: "Симиланы 7",
        category: "beaches",
        image: "https://picsum.photos/600/400?random=2",
        rating: 4.9,
        price: "от $70",
        location: "Симиланские острова",
        description: "Один из красивейших пляжей Таиланда"
      },
      {
        id: 3,
        name: "Отель Paradise",
        category: "hotels",
        image: "https://picsum.photos/600/400?random=3",
        rating: 4.7,
        price: "от $120",
        location: "Патонг",
        description: "Роскошный отель с видом на море"
      },
      {
        id: 4,
        name: "Ресторан Sea View",
        category: "restaurants",
        image: "https://picsum.photos/600/400?random=4",
        rating: 4.6,
        price: "от $25",
        location: "Ката",
        description: "Тайская кухня с панорамным видом"
      }
    ];
    
    // Фильтруем по категории если указана
    const filteredPlaces = category && category !== 'all' 
      ? allPlaces.filter(place => place.category === category)
      : allPlaces;
    
    res.status(200).json({
      success: true,
      data: filteredPlaces,
      total: filteredPlaces.length
    });
    
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}