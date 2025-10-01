# 🏝 PhuketGo - Профессиональная туристическая платформа

> Современная система управления турами с CMS, CRM и Telegram ботом

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/johnda7/phuketgo-react)

---

## � ДОКУМЕНТАЦИЯ - ЧИТАТЬ ПЕРВЫМ!

### 🚨 **ОБЯЗАТЕЛЬНО К ПРОЧТЕНИЮ:**

1. **[AGENT_GUIDELINES.md](./AGENT_GUIDELINES.md)** ⚡ - Главное руководство для AI агентов
2. **[DO_NOT_TOUCH.md](./DO_NOT_TOUCH.md)** 🛡️ - Защищенные файлы (не менять!)
3. **[README.md](./README.md)** 📖 - Этот файл (общая информация)

---

## 🎯 ФИЛОСОФИЯ ПРОЕКТА

### Как в WordPress:
```
✅ Централизованное управление (Directus CMS)
✅ Готовые шаблоны (не нужно писать код)
✅ Админка для редактирования (как wp-admin)
✅ Автоматическое API (как REST API в WP)
✅ CRM система (управление заказами)
✅ Защита от поломок (агент не может сломать)
```

### Принцип работы:
> **"Добавил в Directus → Появилось везде автоматически"**

---

## 🏗️ АРХИТЕКТУРА

```
DIRECTUS CMS → API → React Frontend + Telegram Bot
```

## 🛠️ ТЕХНОЛОГИИ

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite, Shadcn/UI
- **Backend**: Directus (Headless CMS), PostgreSQL
- **Bot**: Telegram Bot API (@phuketgobot)
- **Deploy**: Vercel (Frontend), Railway/Heroku (Directus)

## 📦 Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/johnda7/phuketgo-react.git
cd phuketgo-react
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env`:
```bash
cp .env.example .env
```

4. Запустите в режиме разработки:
```bash
npm run dev
```

## 🤖 Настройка Telegram бота

Подробные инструкции в файле [BOT_SETUP.md](./BOT_SETUP.md)

## 🌐 Деплой

1. Подключите проект к Vercel
2. Установите переменные окружения в Vercel
3. Настройте webhook для Telegram бота

## 📡 API

### Получение мест
```
GET /api/places?category={category}
```

Параметры:
- `category` (optional): all, hotels, restaurants, beaches, activities

### Webhook для бота
```
POST /api/webhook
```

## 🏗️ Структура проекта

```
phuketgo-react/
├── api/                 # Vercel Functions
│   ├── webhook.js      # Telegram webhook
│   └── places.js       # API для мест
├── App.jsx             # Главный компонент React
├── main.jsx            # Точка входа React
├── index.html          # HTML шаблон
├── index.css           # Стили
├── package.json        # Зависимости
├── vite.config.js      # Настройки Vite
├── tailwind.config.js  # Настройки Tailwind
└── BOT_SETUP.md        # Инструкции по настройке бота
```

## 🤝 Вклад в проект

1. Fork проекта
2. Создайте ветку для новой функции
3. Сделайте commit изменений
4. Push в ветку
5. Создайте Pull Request

## 📄 Лицензия

MIT License
