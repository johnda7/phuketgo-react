# 🤖 ПОЛНОЕ РУКОВОДСТВО ДЛЯ AI АГЕНТА: РАБОТА С ПРОЕКТОМ PHUKETGO

> ## 🔴 КРИТИЧНО! ПРОЧИТАЙ ЭТО ПЕРВЫМ ДЕЛОМ!
>
> Это полная инструкция для Claude Sonnet 4.5 агента.
> Здесь описано ВСЁ что нужно знать о проекте и как работать САМОСТОЯТЕЛЬНО.
> **НЕ ПРОСИ ПОЛЬЗОВАТЕЛЯ ДЕЛАТЬ ЧТО-ТО ВРУЧНУЮ - ДЕЛАЙ САМ!**

---

## 📋 СОДЕРЖАНИЕ

1. [Что это за проект](#1-что-это-за-проект)
2. [Структура проекта (2 репозитория)](#2-структура-проекта)
3. [Все пароли и доступы](#3-все-пароли-и-доступы)
4. [Как добавить новый тур (полная инструкция)](#4-как-добавить-новый-тур)
5. [Как добавить фотографии](#5-как-добавить-фотографии)
6. [Как улучшить дизайн](#6-как-улучшить-дизайн)
7. [Как работать на локале](#7-как-работать-на-локале)
8. [Как задеплоить на production](#8-как-задеплоить-на-production)
9. [Чек-листы для проверки](#9-чек-листы-для-проверки)
10. [Частые проблемы и решения](#10-частые-проблемы)

---

## 1. ЧТО ЭТО ЗА ПРОЕКТ

**Название:** PhuketGO - Сайт туров и экскурсий по Пхукету

**Технологии:**
- **Frontend:** React 18 + Vite 6.3.5 + TailwindCSS + React Router
- **Backend:** Directus 11.12.0 (Headless CMS)
- **База данных:** SQLite (на Railway)
- **Hosting Frontend:** GitHub Pages
- **Hosting Backend:** Railway.app

**Архитектура:**
```
┌─────────────────────────────────────────────────────────────┐
│                        ПОЛЬЗОВАТЕЛЬ                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
         ┌─────────────────────────────┐
         │   Frontend (React + Vite)   │
         │  GitHub Pages / localhost   │
         │  johnda7.github.io          │
         └──────────┬──────────────────┘
                    │
                    │ HTTP GET /items/tours
                    │
                    ▼
         ┌─────────────────────────────┐
         │   Backend (Directus CMS)    │
         │      Railway.app            │
         │  phuketgo-directus-*        │
         └──────────┬──────────────────┘
                    │
                    │ SQL queries
                    │
                    ▼
         ┌─────────────────────────────┐
         │   Database (SQLite)         │
         │   data.db на Railway        │
         │   10 туров + контент        │
         └─────────────────────────────┘
```

**Как это работает:**
1. Пользователь открывает сайт (GitHub Pages или localhost)
2. React загружается и делает запрос к Directus API
3. Directus отдаёт туры из SQLite базы в JSON формате
4. React рендерит туры на странице

---

## 2. СТРУКТУРА ПРОЕКТА

### У нас есть ДВА репозитория на GitHub:

#### Репозиторий 1: Frontend (React приложение)

**GitHub:** https://github.com/johnda7/phuketgo-react  
**Локальный путь:** `/Users/evgeniymikhelev/phuketgo-react-1`

**Структура:**
```
phuketgo-react-1/
├── src/
│   ├── assets/              # Все фотографии туров
│   │   ├── dostoprimechatelnosti-phuketa/  # 28 фото
│   │   ├── eleven-islands-mega/            # Фото тура "11 островов"
│   │   ├── kao-lak-safari/                 # И т.д.
│   │   └── ...
│   ├── components/          # React компоненты
│   │   ├── TourCard.jsx     # Карточка тура
│   │   ├── Header.jsx       # Шапка сайта
│   │   └── ...
│   ├── pages/               # Страницы
│   │   ├── HomePage.jsx     # Главная (список туров)
│   │   ├── TourDetailsPage.jsx  # Страница одного тура
│   │   └── ...
│   ├── lib/
│   │   └── directus.ts      # Directus SDK клиент
│   ├── hooks/
│   │   └── useDirectusTours.js  # Хук для загрузки туров
│   └── App.jsx              # Главный компонент
├── public/
├── .env.local               # ENV переменные (НЕ в git!)
├── package.json
├── vite.config.js
└── AGENT_GUIDELINES.md      # Документация для агентов
```

**Что здесь:**
- Весь фронтенд код
- Все фотографии туров
- Конфигурация для деплоя на GitHub Pages

**Deploy:**
- Автоматически деплоится на GitHub Pages при `git push origin main`
- URL: https://johnda7.github.io/phuketgo-react

---

#### Репозиторий 2: Backend (Directus CMS)

**GitHub:** https://github.com/johnda7/phuketgo-directus  
**Локальный путь:** `/Users/evgeniymikhelev/Documents/GitHub/phuketgo-directus`

**Структура:**
```
phuketgo-directus/
├── data.db                  # SQLite база данных (10 туров)
├── .env                     # ENV переменные для Directus
├── extensions/              # Расширения Directus
├── uploads/                 # Загруженные файлы
├── package.json
└── railway.json             # Конфигурация для Railway
```

**Что здесь:**
- Directus CMS (сервер)
- SQLite база с турами
- Конфигурация для Railway

**Deploy:**
- Задеплоен на Railway.app
- URL: https://phuketgo-directus-production.up.railway.app

---

### Как репозитории связаны:

```
Frontend (phuketgo-react-1)
      │
      │ .env.local:
      │ VITE_DIRECTUS_URL=https://phuketgo-directus-production.up.railway.app
      │
      ▼
Backend (phuketgo-directus)
      │
      │ Railway deployment
      │
      ▼
SQLite Database (data.db)
```

**Важно:**
- Frontend НЕ хранит данные о турах
- Frontend только ОТОБРАЖАЕТ данные из Directus
- Все туры, цены, описания, фото хранятся в Directus
- Изменения в Directus сразу видны на сайте (после перезагрузки)

---

## 3. ВСЕ ПАРОЛИ И ДОСТУПЫ

> ### 🔐 КРИТИЧНО! ЗАПИШИ ЭТИ ДАННЫЕ!

### Directus Admin Panel (Railway Production)

**URL:** https://phuketgo-directus-production.up.railway.app/admin

**Учётные данные:**
```
Email:    admin@phuketgo.com
Password: admin123
```

**Где используется:**
- Для входа в админку Directus через браузер
- Для управления турами, контентом
- Для загрузки фотографий (хотя мы храним их в React проекте)

---

### Railway Dashboard

**URL:** https://railway.app

**Учётные данные:**
```
Email: (используй GitHub OAuth - у пользователя уже залогинен)
```

**Что здесь:**
- Управление backend сервером
- Переменные окружения (CORS_ORIGIN и др.)
- Логи сервера
- Перезапуск/деплой сервера

**Где найти проект:**
1. Открой https://railway.app
2. Найди проект "phuketgo-directus"
3. Внутри есть сервис с Directus

---

### GitHub

**Frontend репозиторий:**
- URL: https://github.com/johnda7/phuketgo-react
- Доступ: У пользователя уже есть права (owner: johnda7)

**Backend репозиторий:**
- URL: https://github.com/johnda7/phuketgo-directus
- Доступ: У пользователя уже есть права

**Учётные данные:**
- Уже залогинен на локальной машине
- `git push` работает без пароля (SSH ключ)

---

## 4. КАК ДОБАВИТЬ НОВЫЙ ТУР

> **ВАЖНО:** Ты делаешь ВСЁ сам! Не проси пользователя зайти куда-то!

### Шаг 1: Получи данные от пользователя

Пользователь скажет что-то типа:
```
"Добавь новый тур: Экскурсия в Као Лак, цена 3500 бат, 10 часов"
```

**Что тебе нужно узнать:**
- Название тура (title)
- Описание (description) - если не дал, попроси или создай сам
- Цена (price) - в батах
- Длительность (duration) - "8 часов", "1 день" и т.д.
- Категория (category) - excursions, islands, diving, adventures, wellness, romantic
- Что включено (included) - массив пунктов
- Что НЕ включено (not_included) - массив пунктов
- Что взять с собой (what_to_bring) - массив пунктов
- Расписание (schedule) - массив "время - событие"

### Шаг 2: Создай slug

Slug - это URL-friendly версия названия:
```javascript
// Название: "Экскурсия в Као Лак"
// Slug: "ekskursiya-v-kao-lak"

// Правила:
// 1. Только латиница (транслитерация)
// 2. Lowercase
// 3. Пробелы → дефисы
// 4. Убрать спецсимволы
```

**Пример функции транслитерации:**
```javascript
const transliterate = (text) => {
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  };
  return text.toLowerCase()
    .split('')
    .map(char => map[char] || char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
```

### Шаг 3: Подготовь JSON данные

Создай JSON объект:
```json
{
  "title": "Экскурсия в Као Лак",
  "slug": "ekskursiya-v-kao-lak",
  "description": "Увлекательная экскурсия...",
  "price": 3500,
  "duration": "10 часов",
  "category": "excursions",
  "included": "[\"Трансфер из отеля\",\"Обед\",\"Гид\",\"Страховка\"]",
  "not_included": "[\"Дополнительные напитки\",\"Личные расходы\"]",
  "what_to_bring": "[\"Паспорт\",\"Солнцезащитный крем\",\"Вода\",\"Удобная обувь\"]",
  "schedule": "[\"08:00 - Выезд из отеля\",\"10:00 - Первая остановка\",\"12:00 - Обед\",\"18:00 - Возвращение\"]",
  "main_image": "/src/assets/kao-lak-safari/main.jpg",
  "gallery": "[\"\/src\/assets\/kao-lak-safari\/main.jpg\",\"\/src\/assets\/kao-lak-safari\/photo1.jpg\"]"
}
```

**ВАЖНО:**
- JSON поля (`included`, `not_included` и т.д.) должны быть **строками с escaped JSON массивом**!
- Почему? Потому что SQLite хранит JSON как TEXT
- Формат: `"[\"item1\",\"item2\"]"` (обрати внимание на экранирование кавычек)

### Шаг 4: Добавь тур через Directus API

**НЕ проси пользователя зайти в админку! Используй API!**

```bash
# 1. Получи access token
curl -X POST "https://phuketgo-directus-production.up.railway.app/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@phuketgo.com",
    "password": "admin123"
  }'

# Ответ:
# {"data":{"access_token":"eyJ...","expires":900000,"refresh_token":"abc..."}}

# 2. Сохрани token в переменную
TOKEN="eyJ..."

# 3. Создай тур
curl -X POST "https://phuketgo-directus-production.up.railway.app/items/tours" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Экскурсия в Као Лак",
    "slug": "ekskursiya-v-kao-lak",
    "description": "Увлекательная экскурсия...",
    "price": 3500,
    "duration": "10 часов",
    "category": "excursions",
    "included": "[\"Трансфер\",\"Обед\",\"Гид\"]",
    "not_included": "[\"Напитки\"]",
    "what_to_bring": "[\"Паспорт\",\"Вода\"]",
    "schedule": "[\"08:00 - Выезд\",\"18:00 - Возврат\"]",
    "main_image": "/src/assets/kao-lak-safari/main.jpg",
    "gallery": "[\"\/src\/assets\/kao-lak-safari\/main.jpg\"]"
  }'
```

**Используй `run_in_terminal` для этого!**

### Шаг 5: Проверь что тур добавлен

```bash
# Проверь через API
curl "https://phuketgo-directus-production.up.railway.app/items/tours?filter[slug][_eq]=ekskursiya-v-kao-lak"

# Должен вернуть тур в JSON
```

### Шаг 6: Проверь на сайте

```bash
# 1. Открой главную страницу
open http://localhost:5173

# 2. Проверь что новый тур появился в списке

# 3. Открой страницу тура
open http://localhost:5173/tour/ekskursiya-v-kao-lak

# 4. Проверь что всё отображается корректно
```

---

## 5. КАК ДОБАВИТЬ ФОТОГРАФИИ

> **ВАЖНО:** Фотографии хранятся В FRONTEND репозитории, НЕ в Directus!

### Шаг 1: Получи фотографии от пользователя

Пользователь скажет что-то типа:
```
"Добавь фотографии для тура Достопримечательности Пхукета"
```

**Спроси:**
- Где находятся фотографии? (путь на диске)
- Или пользователь скажет что они уже в проекте

### Шаг 2: Проверь есть ли уже папка с фотографиями

```bash
# Проверь структуру assets
ls -la /Users/evgeniymikhelev/phuketgo-react-1/src/assets/

# Пример вывода:
# dostoprimechatelnosti-phuketa/  ← УЖЕ ЕСТЬ!
# eleven-islands-mega/
# kao-lak-safari/
```

**Если папка уже есть:**
```bash
# Посмотри что внутри
ls -la /Users/evgeniymikhelev/phuketgo-react-1/src/assets/dostoprimechatelnosti-phuketa/

# Увидишь список фотографий:
# big-buddha.jpg
# wat-chalong-main.jpg
# old-town-1.jpg
# ...
```

### Шаг 3: Если фотографий нет - скопируй их

```bash
# Узнай откуда копировать (спроси пользователя)
# Например: /Users/evgeniymikhelev/Downloads/tour-photos/

# Создай папку для тура
mkdir -p /Users/evgeniymikhelev/phuketgo-react-1/src/assets/ekskursiya-v-kao-lak/

# Скопируй фотографии
cp /Users/evgeniymikhelev/Downloads/tour-photos/*.jpg \
   /Users/evgeniymikhelev/phuketgo-react-1/src/assets/ekskursiya-v-kao-lak/
```

### Шаг 4: Создай JSON массив с путями к фото

```bash
# Используй find или ls для генерации массива
cd /Users/evgeniymikhelev/phuketgo-react-1/src/assets/dostoprimechatelnosti-phuketa/

# Список файлов
ls -1 *.jpg *.webp 2>/dev/null | while read file; do
  echo '"/src/assets/dostoprimechatelnosti-phuketa/'$file'",'
done

# Результат:
# "/src/assets/dostoprimechatelnosti-phuketa/big-buddha.jpg",
# "/src/assets/dostoprimechatelnosti-phuketa/wat-chalong-main.jpg",
# ...
```

**Или используй скрипт:**
```bash
# generate-gallery-json.sh
TOUR_SLUG="dostoprimechatelnosti-phuketa"
PHOTOS_DIR="/Users/evgeniymikhelev/phuketgo-react-1/src/assets/$TOUR_SLUG"

echo "["
find "$PHOTOS_DIR" -type f \( -name "*.jpg" -o -name "*.webp" -o -name "*.png" \) | while read file; do
  filename=$(basename "$file")
  echo "  \"/src/assets/$TOUR_SLUG/$filename\","
done | sed '$ s/,$//'  # убираем последнюю запятую
echo "]"
```

### Шаг 5: Обнови тур в Directus с фотографиями

```bash
# 1. Получи токен (как в шаге 4 выше)
TOKEN=$(curl -s -X POST "https://phuketgo-directus-production.up.railway.app/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@phuketgo.com","password":"admin123"}' \
  | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)

# 2. Обнови поля main_image и gallery
curl -X PATCH "https://phuketgo-directus-production.up.railway.app/items/tours/10" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "main_image": "/src/assets/dostoprimechatelnosti-phuketa/big-buddha.jpg",
    "gallery": "[\"\/src\/assets\/dostoprimechatelnosti-phuketa\/big-buddha.jpg\",\"\/src\/assets\/dostoprimechatelnosti-phuketa\/big-buddha-viewpoint.jpg\",\"\/src\/assets\/dostoprimechatelnosti-phuketa\/wat-chalong-main.jpg\"]"
  }'
```

**ВАЖНО:**
- `gallery` это JSON строка с escaped массивом!
- Формат: `"[\"path1\",\"path2\"]"`
- Используй `\/` для экранирования слэшей

### Шаг 6: Закоммить фотографии в git

```bash
cd /Users/evgeniymikhelev/phuketgo-react-1

# Добавь фотографии
git add src/assets/dostoprimechatelnosti-phuketa/

# Коммит
git commit -m "feat: добавлены фотографии для тура Достопримечательности Пхукета (28 фото)"

# Push
git push origin main
```

### Шаг 7: Проверь на сайте

```bash
# Обнови страницу (hard reload)
# Проверь что:
# 1. Главное фото отображается на карточке тура
# 2. Галерея работает на странице тура
# 3. Все фото загружаются без 404 ошибок
```

---

## 6. КАК УЛУЧШИТЬ ДИЗАЙН

### Типичные задачи:

**"Сделай кнопки более округлыми"**
**"Измени цвет карточек"**
**"Добавь анимацию при наведении"**

### Шаг 1: Найди нужный компонент

```bash
# Поиск по ключевому слову
cd /Users/evgeniymikhelev/phuketgo-react-1
grep -r "button" src/components/

# Или семантический поиск через semantic_search
```

**Частые компоненты:**
- `src/components/TourCard.jsx` - карточка тура
- `src/components/Header.jsx` - шапка сайта
- `src/components/Footer.jsx` - подвал
- `src/pages/HomePage.jsx` - главная страница
- `src/pages/TourDetailsPage.jsx` - страница тура

### Шаг 2: Открой компонент и найди нужное место

```bash
# Прочитай файл
read_file src/components/TourCard.jsx 1 200

# Найди кнопку или элемент который нужно изменить
```

### Шаг 3: Измени стили (TailwindCSS)

**Пример: Сделать кнопки более округлыми**

```jsx
// Было:
<button className="bg-blue-600 text-white px-6 py-2 rounded">
  Забронировать
</button>

// Стало:
<button className="bg-blue-600 text-white px-6 py-2 rounded-full">
  Забронировать
</button>
```

**Пример: Добавить анимацию при наведении**

```jsx
// Было:
<div className="bg-white shadow-lg">
  ...
</div>

// Стало:
<div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
  ...
</div>
```

### Шаг 4: Используй replace_string_in_file

```javascript
replace_string_in_file({
  filePath: "/Users/evgeniymikhelev/phuketgo-react-1/src/components/TourCard.jsx",
  oldString: `<button className="bg-blue-600 text-white px-6 py-2 rounded">
  Забронировать
</button>`,
  newString: `<button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
  Забронировать
</button>`
});
```

### Шаг 5: Проверь на локале

```bash
# Сайт должен быть запущен (npm run dev)
# Обнови страницу в браузере
# Проверь что изменения применились
```

### Шаг 6: Закоммить и задеплоить

```bash
cd /Users/evgeniymikhelev/phuketgo-react-1

git add src/components/TourCard.jsx
git commit -m "style: улучшен дизайн кнопок (rounded-full + hover эффект)"
git push origin main

# GitHub Actions автоматически задеплоит на GitHub Pages
```

---

## 7. КАК РАБОТАТЬ НА ЛОКАЛЕ

### Шаг 1: Проверь что зависимости установлены

```bash
cd /Users/evgeniymikhelev/phuketgo-react-1

# Проверь package.json существует
ls -la package.json

# Проверь node_modules
ls -la node_modules/ | head -20

# Если нет - установи
npm install
```

### Шаг 2: Проверь .env.local

```bash
# Файл ДОЛЖЕН существовать
cat /Users/evgeniymikhelev/phuketgo-react-1/.env.local

# Должно быть:
# VITE_DIRECTUS_URL=https://phuketgo-directus-production.up.railway.app

# Если нет - создай
echo 'VITE_DIRECTUS_URL=https://phuketgo-directus-production.up.railway.app' > .env.local
```

### Шаг 3: Запусти dev сервер

**ВАЖНО: НЕ используй `npm run dev` в background terminal!**

**Правильный способ - через VS Code Task:**

```javascript
// Используй create_and_run_task:
create_and_run_task({
  workspaceFolder: "/Users/evgeniymikhelev/phuketgo-react-1",
  task: {
    label: "Vite Dev Server",
    type: "shell",
    command: "npm run dev",
    isBackground: true,
    problemMatcher: []
  }
});
```

### Шаг 4: Подожди 5-10 секунд

**Vite нужно время для инициализации!**

```bash
# Подожди
sleep 10

# Проверь что сервер запустился
curl -s http://localhost:5173 | head -20

# Должен вернуть HTML (не "Connection refused")
```

### Шаг 5: Проверь что туры загружаются

```bash
# Проверь через curl
curl -s http://localhost:5173 | grep -o "tour-card" | wc -l

# Должно быть 10 (если 10 туров в базе)
```

### Шаг 6: Открой в браузере

```bash
# Открой автоматически
open http://localhost:5173
```

### Шаг 7: Открой DevTools консоль

**Проверь:**
- ✅ Нет красных ошибок
- ✅ В консоли есть лог: "Tours received: 10"
- ✅ Нет CORS ошибок
- ✅ Запросы к Railway успешны (200 OK)

---

## 8. КАК ЗАДЕПЛОИТЬ НА PRODUCTION

### Frontend (автоматический деплой)

**GitHub Pages настроен автоматически!**

```bash
cd /Users/evgeniymikhelev/phuketgo-react-1

# 1. Сделай изменения
# 2. Коммит
git add .
git commit -m "feat: добавлен новый тур"

# 3. Push
git push origin main

# 4. GitHub Actions автоматически:
#    - Запустит npm install
#    - Запустит npm run build
#    - Задеплоит на GitHub Pages
#    - Сайт обновится через 1-2 минуты
```

**Проверь статус деплоя:**
```bash
# Открой Actions в браузере
open https://github.com/johnda7/phuketgo-react/actions

# Или проверь через GitHub CLI (если установлен)
gh run list --limit 3
```

**После деплоя:**
```bash
# Подожди 1-2 минуты
sleep 120

# Открой production сайт
open https://johnda7.github.io/phuketgo-react

# Проверь что изменения применились
```

---

### Backend (Railway - только при изменении backend кода)

**Обычно НЕ НУЖНО!** Backend уже задеплоен и работает.

**Если нужно обновить backend:**

```bash
cd /Users/evgeniymikhelev/Documents/GitHub/phuketgo-directus

# 1. Коммит
git add .
git commit -m "fix: обновлена конфигурация Directus"

# 2. Push
git push origin main

# 3. Railway автоматически задеплоит (через railway.json)
```

**Проверь:**
```bash
# Подожди 2-3 минуты
sleep 180

# Проверь что API работает
curl "https://phuketgo-directus-production.up.railway.app/items/tours" | head -50
```

---

## 9. ЧЕК-ЛИСТЫ ДЛЯ ПРОВЕРКИ

### Чек-лист: Добавление нового тура

```markdown
□ Получил все данные от пользователя (title, price, duration и т.д.)
□ Создал slug (транслитерация + lowercase + дефисы)
□ Подготовил JSON данные (все JSON поля - escaped строки!)
□ Получил access token через /auth/login
□ Создал тур через POST /items/tours
□ Проверил что тур создан (GET /items/tours?filter[slug][_eq]=...)
□ Проверил на localhost:5173 (тур появился в списке)
□ Проверил страницу тура /tour/SLUG
□ Нет ошибок в консоли (F12)
□ Закоммитил изменения (если были)
□ Запушил на GitHub
□ Проверил production сайт (через 2 минуты)
```

### Чек-лист: Добавление фотографий

```markdown
□ Проверил что фотографии есть в src/assets/TOUR_SLUG/
□ Если нет - скопировал из указанной папки
□ Создал JSON массив с путями (["\/src\/assets\/..."])
□ Получил access token
□ Обновил main_image через PATCH /items/tours/ID
□ Обновил gallery через PATCH /items/tours/ID
□ Проверил на localhost:5173
□ Главное фото отображается на карточке
□ Галерея работает на странице тура
□ Нет 404 ошибок в Network tab
□ git add src/assets/TOUR_SLUG/
□ git commit -m "feat: добавлены фото для тура X"
□ git push origin main
□ Проверил production (через 2 минуты)
```

### Чек-лист: Изменение дизайна

```markdown
□ Нашел нужный компонент (grep или semantic_search)
□ Прочитал файл (read_file)
□ Нашел место которое нужно изменить
□ Изменил через replace_string_in_file
□ Проверил на localhost:5173
□ Изменения применились
□ Нет ошибок в консоли
□ Дизайн выглядит хорошо
□ git add CHANGED_FILE
□ git commit -m "style: ..."
□ git push origin main
□ Проверил production
```

### Чек-лист: Запуск на локале

```markdown
□ cd ~/phuketgo-react-1
□ ls -la .env.local (файл существует)
□ cat .env.local (VITE_DIRECTUS_URL правильный)
□ ls -la node_modules/ (зависимости установлены)
□ Запустил через create_and_run_task (НЕ npm run dev в terminal!)
□ Подождал 10 секунд
□ curl http://localhost:5173 (возвращает HTML)
□ open http://localhost:5173
□ Открыл DevTools (F12)
□ Нет красных ошибок в консоли
□ В консоли: "Tours received: 10"
□ Туры отображаются на странице
□ Можно кликнуть на тур и открыть детали
```

---

## 10. ЧАСТЫЕ ПРОБЛЕМЫ

### ❌ Проблема 1: "Туры не загружаются (0 туров или 2 mock тура)"

**Симптомы:**
- На главной странице нет туров
- Или показываются только 2 тура (mock данные)

**Причина:**
- CORS не настроен на Railway
- Или .env.local неправильный

**Решение:**

```bash
# 1. Проверь CORS на Railway
# Открой Railway Dashboard
open https://railway.app

# Найди проект phuketgo-directus → Variables
# CORS_ORIGIN должен быть:
# http://localhost:5173,https://johnda7.github.io

# 2. Проверь .env.local
cat ~/phuketgo-react-1/.env.local
# Должно быть:
# VITE_DIRECTUS_URL=https://phuketgo-directus-production.up.railway.app

# 3. Проверь API напрямую
curl "https://phuketgo-directus-production.up.railway.app/items/tours"
# Должен вернуть JSON с турами, не 403
```

---

### ❌ Проблема 2: "TypeError: tour.included.map is not a function"

**Симптомы:**
- Белый экран на странице тура
- В консоли: `TypeError: tour.included.map is not a function`

**Причина:**
- Directus возвращает JSON поля как строки
- Код пытается вызвать .map() на строке

**Решение:**
- ✅ УЖЕ ИСПРАВЛЕНО в TourDetailsPage.jsx!
- Проверь что файл содержит JSON.parse() для всех JSON полей
- См. AGENT_GUIDELINES.md → Ошибка #8

```bash
# Проверь что фикс применён
grep -A 5 "JSON.parse" ~/phuketgo-react-1/src/pages/TourDetailsPage.jsx
```

---

### ❌ Проблема 3: "Фотографии не отображаются (404)"

**Симптомы:**
- На карточке тура нет фото
- В Network tab: 404 на /src/assets/...

**Причина:**
- Файлы не существуют в проекте
- Или путь в Directus неправильный

**Решение:**

```bash
# 1. Проверь что файлы существуют
ls -la ~/phuketgo-react-1/src/assets/TOUR_SLUG/

# 2. Проверь путь в Directus
curl "https://phuketgo-directus-production.up.railway.app/items/tours/ID" | grep main_image

# Должно быть:
# "main_image": "/src/assets/TOUR_SLUG/photo.jpg"

# НЕ:
# "main_image": "src/assets/..."  (без /)
# "main_image": "/assets/..."      (без /src)

# 3. Если путь неправильный - исправь через PATCH
TOKEN=$(curl -s -X POST "https://phuketgo-directus-production.up.railway.app/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@phuketgo.com","password":"admin123"}' \
  | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)

curl -X PATCH "https://phuketgo-directus-production.up.railway.app/items/tours/ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"main_image": "/src/assets/TOUR_SLUG/photo.jpg"}'
```

---

### ❌ Проблема 4: "npm run dev не запускается"

**Симптомы:**
- `curl http://localhost:5173` → Connection refused
- В терминале: process завершился

**Причина:**
- Используешь `run_in_terminal` с `isBackground: true` для `npm run dev`
- Это НЕ РАБОТАЕТ для Vite dev сервера!

**Решение:**

```javascript
// ❌ НЕ ДЕЛАЙ ТАК:
run_in_terminal({
  command: "npm run dev",
  isBackground: true
});

// ✅ ПРАВИЛЬНО:
create_and_run_task({
  workspaceFolder: "/Users/evgeniymikhelev/phuketgo-react-1",
  task: {
    label: "Vite Dev Server",
    type: "shell",
    command: "npm run dev",
    isBackground: true,
    problemMatcher: []
  }
});

// Потом подожди 10 секунд!
```

---

### ❌ Проблема 5: "Изменения не видны на production сайте"

**Симптомы:**
- Сделал git push
- Но на https://johnda7.github.io/phuketgo-react ничего не изменилось

**Причина:**
- GitHub Actions ещё не закончил деплой
- Или браузер показывает кэш

**Решение:**

```bash
# 1. Проверь статус деплоя
open https://github.com/johnda7/phuketgo-react/actions

# 2. Дождись зелёной галочки (1-2 минуты)

# 3. Очисть кэш браузера
# Cmd+Shift+R (Mac)
# Ctrl+Shift+R (Windows/Linux)

# 4. Или открой в приватном окне
open -n -a "Google Chrome" --args --incognito "https://johnda7.github.io/phuketgo-react"
```

---

## 🎯 КРАТКАЯ СПРАВКА (QUICK REFERENCE)

### Команды которые ты будешь использовать постоянно:

```bash
# === РАБОТА С DIRECTUS API ===

# Логин (получить токен)
curl -X POST "https://phuketgo-directus-production.up.railway.app/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@phuketgo.com","password":"admin123"}'

# Получить все туры
curl "https://phuketgo-directus-production.up.railway.app/items/tours"

# Получить один тур по slug
curl "https://phuketgo-directus-production.up.railway.app/items/tours?filter[slug][_eq]=SLUG"

# Создать новый тур
curl -X POST "https://phuketgo-directus-production.up.railway.app/items/tours" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"...","slug":"...","price":2500}'

# Обновить тур
curl -X PATCH "https://phuketgo-directus-production.up.railway.app/items/tours/ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"main_image":"...","gallery":"[...]"}'

# === РАБОТА С FRONTEND ===

# Запустить dev сервер (через VS Code Task!)
create_and_run_task({...})

# Проверить что сервер запустился
curl http://localhost:5173

# Открыть в браузере
open http://localhost:5173

# === GIT ===

# Статус
git status

# Добавить файлы
git add .

# Коммит
git commit -m "feat: описание изменений"

# Push
git push origin main

# === ФОТОГРАФИИ ===

# Создать папку для тура
mkdir -p ~/phuketgo-react-1/src/assets/TOUR_SLUG

# Скопировать фото
cp /path/to/photos/*.jpg ~/phuketgo-react-1/src/assets/TOUR_SLUG/

# Список фото
ls -la ~/phuketgo-react-1/src/assets/TOUR_SLUG/

# Сгенерировать JSON массив
ls -1 ~/phuketgo-react-1/src/assets/TOUR_SLUG/*.jpg | \
  sed 's|.*/|"/src/assets/TOUR_SLUG/|' | \
  sed 's|$|",|'
```

---

## 📝 ШАБЛОНЫ JSON

### Новый тур (минимальный)

```json
{
  "title": "Название тура",
  "slug": "nazvanie-tura",
  "description": "Описание тура...",
  "price": 2500,
  "duration": "8 часов",
  "category": "excursions"
}
```

### Новый тур (полный)

```json
{
  "title": "Название тура",
  "slug": "nazvanie-tura",
  "description": "Полное описание тура на несколько предложений...",
  "price": 2500,
  "duration": "8 часов",
  "category": "excursions",
  "included": "[\"Трансфер из отеля\",\"Обед\",\"Русскоговорящий гид\",\"Страховка\"]",
  "not_included": "[\"Дополнительные напитки\",\"Личные расходы\",\"Чаевые\"]",
  "what_to_bring": "[\"Паспорт\",\"Солнцезащитный крем\",\"Вода\",\"Удобная обувь\",\"Купальник\",\"Полотенце\"]",
  "schedule": "[\"08:00 - Выезд из отеля\",\"10:00 - Первая остановка\",\"12:00 - Обед\",\"14:00 - Продолжение экскурсии\",\"18:00 - Возвращение в отель\"]",
  "main_image": "/src/assets/nazvanie-tura/main.jpg",
  "gallery": "[\"\/src\/assets\/nazvanie-tura\/main.jpg\",\"\/src\/assets\/nazvanie-tura\/photo1.jpg\",\"\/src\/assets\/nazvanie-tura\/photo2.jpg\"]",
  "difficulty": "medium",
  "min_age": 7,
  "max_group_size": 15
}
```

---

## ✅ ИТОГО: ГЛАВНЫЕ ПРАВИЛА

1. **НЕ ПРОСИ ПОЛЬЗОВАТЕЛЯ ДЕЛАТЬ ЧТО-ТО ВРУЧНУЮ**
   - Не говори "зайди в админку и добавь"
   - Делай сам через API (curl + Authorization Bearer token)

2. **ВСЕГДА ПРОВЕРЯЙ РЕЗУЛЬТАТ**
   - После добавления тура → проверь через GET запрос
   - После изменения дизайна → проверь на localhost:5173
   - После деплоя → проверь на production сайте

3. **ФОТОГРАФИИ ХРАНЯТСЯ В FRONTEND, НЕ В DIRECTUS**
   - Копируй в `/src/assets/TOUR_SLUG/`
   - Пути в Directus: `/src/assets/TOUR_SLUG/photo.jpg`
   - Закоммить и запушить в git!

4. **JSON ПОЛЯ В DIRECTUS - ЭТО СТРОКИ**
   - Не `["item1", "item2"]`
   - А `"[\"item1\",\"item2\"]"` (escaped!)
   - Frontend парсит их через JSON.parse()

5. **DEV СЕРВЕР ТОЛЬКО ЧЕРЕЗ VS CODE TASK**
   - НЕ `npm run dev` в background terminal
   - Используй `create_and_run_task`
   - Подожди 10 секунд после запуска

6. **ДЕПЛОЙ АВТОМАТИЧЕСКИЙ**
   - Frontend: git push → GitHub Actions → GitHub Pages (2 минуты)
   - Backend: уже задеплоен на Railway, менять не нужно

7. **ЧИТАЙ AGENT_GUIDELINES.MD**
   - 3863 строки критической информации
   - Все ошибки прошлых агентов описаны там
   - Не повторяй те же ошибки!

---

**Версия:** 1.0  
**Дата:** 2 октября 2025  
**Автор:** AI Agent  
**Для:** Claude Sonnet 4.5 агентов  
**Статус:** 🔥 ОБЯЗАТЕЛЬНО К ПРОЧТЕНИЮ ПЕРЕД РАБОТОЙ
