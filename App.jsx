import { useState } from 'react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = ['all', 'hotels', 'restaurants', 'beaches', 'activities'];
  const places = [
    {
      id: 1,
      name: "Ленивое секретное озеро",
      category: "activities",
      image: "https://picsum.photos/600/400", 
      rating: 4.8,
      price: "от $50",
      location: "Пхукет"
    },
    {
      id: 2,
      name: "Симиланы 7",
      category: "beaches",
      image: "https://picsum.photos/600/400", 
      rating: 4.9,
      price: "от $70",
      location: "Симиланские острова"
    }
  ];

  const filtered = places.filter(p => activeCategory === 'all' || p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold">PhuketGo</h1>
        <p className="text-gray-600 mt-1">Привет! Добро пожаловать в ваш гид по Пхукету</p>
      </header>
      <main className="container mx-auto p-4">
        <div className="flex gap-2 mb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded ${activeCategory === cat ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
            >
              {cat === 'all' ? 'Все' : cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(place => (
            <div key={place.id} className="border rounded overflow-hidden shadow-md">
              <img src={place.image} alt={place.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{place.name}</h3>
                <p className="text-gray-600">{place.location}</p>
                <div className="flex justify-between mt-2">
                  <span>★ {place.rating}</span>
                  <span>{place.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
