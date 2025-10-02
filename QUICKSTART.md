# 🚀 БЫСТРЫЙ ЗАПУСК ПРОЕКТА PHUKETGO

## Автоматический запуск (рекомендуется):

```bash
cd /Users/evgeniymikhelev/phuketgo-react-1
./start-dev.sh
```

## Ручной запуск:

### 1. Запустить Directus (Backend):
```bash
cd /Users/evgeniymikhelev/Documents/GitHub/phuketgo-directus
DB_CLIENT=sqlite3 DB_FILENAME=./data.db PORT=8055 npx directus start
```

### 2. Запустить React (Frontend):
```bash
# В НОВОМ терминале
cd /Users/evgeniymikhelev/phuketgo-react-1
npm run dev
```

## Результат:

- ✅ Frontend: http://localhost:5173/
- ✅ Directus Admin: http://localhost:8055/admin
- ✅ Directus API: http://localhost:8055/items/tours

## Структура проекта:

```
~/Documents/GitHub/
├── phuketgo-react-1/          ← Frontend (React + Vite)
│   ├── src/                   ← Исходный код
│   ├── start-dev.sh           ← Скрипт запуска
│   └── AGENT_GUIDELINES.md    ← Инструкции для AI
│
└── phuketgo-directus/         ← Backend (Directus CMS)
    ├── data.db                ← База данных SQLite
    ├── .env                   ← Настройки
    └── railway.json           ← Конфиг Railway
```

## Если что-то не работает:

### Проблема: Directus не запускается
**Решение:**
```bash
cd /Users/evgeniymikhelev/Documents/GitHub/phuketgo-directus
ls -la data.db  # Проверить что файл существует
```

### Проблема: Туры не загружаются
**Решение:**
```bash
# Проверить что Directus работает
curl http://localhost:8055/server/ping

# Проверить API туров
curl http://localhost:8055/items/tours
```

### Проблема: Ошибка "DB_CLIENT missing"
**Решение:** Используйте полную команду с переменными:
```bash
DB_CLIENT=sqlite3 DB_FILENAME=./data.db PORT=8055 npx directus start
```

## Деплой в Production:

### Frontend (GitHub Pages):
```bash
npm run build
npm run deploy
```

### Backend (Railway):
Railway автоматически деплоит из GitHub при пуше в main ветку.

## Полезные команды:

```bash
# Остановить все процессы на портах
lsof -ti:5173 | xargs kill -9  # Vite
lsof -ti:8055 | xargs kill -9  # Directus

# Проверить что работает
lsof -i :5173  # Vite
lsof -i :8055  # Directus

# Логи Directus (если запущен через скрипт)
tail -f /tmp/directus.log
```

## Логин в Directus Admin:

- URL: http://localhost:8055/admin
- Email: admin@phuketgo.com
- Password: admin123

---

**Документация:** См. AGENT_GUIDELINES.md для подробностей
