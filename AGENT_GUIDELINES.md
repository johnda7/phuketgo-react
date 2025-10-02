# 🤖 РУКОВОДСТВО ДЛЯ AI АГЕНТОВ v4.0 - ОБНОВЛЕНО 03.10.2025

> # 🔴 КРИТИЧЕСКИ ВАЖНАЯ ИНФОРМАЦИЯ! 🔴
>
> ## ✅ ПРОБЛЕМА С ДЕПЛОЕМ РЕШЕНА!
>
> **Дата решения:** 03.10.2025  
> **Коммит с рабочей конфигурацией:** `9a7fe25`  
> **Backup коммит (если что-то сломается):** `3e6d7bb`
>
> ### � ЧТО БЫЛО ИСПРАВЛЕНО:
>
> 1. ✅ **vite.config.js** - убран hardcode, возвращен к оригиналу
> 2. ✅ **`.env.production`** - создан с Railway URL (добавлен в git!)
> 3. ✅ **CORS на Railway** - оставлен ТОЛЬКО `https://johnda7.github.io`
> 4. ✅ **GitHub Pages** - деплой работает, показывает 10 туров
>
> ### 🎯 ПРАВИЛЬНАЯ КОНФИГУРАЦИЯ:
>
> **vite.config.js (БЕЗ HARDCODE!):**
> ```javascript
> export default defineConfig({
>   plugins: [react()],
>   base: process.env.NODE_ENV === 'production' ? '/phuketgo-react/' : '/',
>   server: { port: 5173, strictPort: true },
>   build: { outDir: 'dist' }
>   // ❌ НЕТ define блока! Vite сам читает .env.production
> });
> ```
>
> **`.env.production` (В GIT!):**
> ```env
> # Production Environment Variables
> # Этот файл МОЖНО коммитить в git, так как Railway URL публичный
> VITE_DIRECTUS_URL=https://phuketgo-directus-production.up.railway.app
> ```
>
> **Railway CORS_ORIGIN:**
> ```
> https://johnda7.github.io
> ```
> ❌ **НЕ ДОБАВЛЯЙ** `http://localhost:5173` - это сломает production!
>
> ### � ЕСЛИ ЧТО-ТО СЛОМАЛОСЬ - ОТКАТ:
>
> ```bash
> git reset --hard 3e6d7bb
> npm run deploy
> ```
>
> 1. **CORS конфигурация** - без неё туры не загружаются (строки 717-730)
> 2. **Правильный запуск dev сервера** - без этого белый экран (строки 1500+)
> 3. **Railway deployment** - неправильные переменные = crash (строки 700+)
> 4. **Структура БД** - неправильные поля = ошибки (строки 400+)
> 5. **История ошибок** - не повторяй ошибки прошлых агентов (строки 2800+)
> 6. **🔴 ПАРОЛИ И ДОСТУПЫ** - без них не сможешь работать (строки 80-150)
>
> ### 📋 ЧТО ДЕЛАТЬ ПЕРЕД НАЧАЛОМ РАБОТЫ:
>
> ```typescript
> // ШАГ 1: Прочитать ВЕСЬ файл
> await read_file({
>   filePath: "/Users/evgeniymikhelev/phuketgo-react-1/AGENT_GUIDELINES.md",
>   startLine: 1,
>   endLine: 3200  // НЕ 200! НЕ 500! ВЕСЬ ФАЙЛ!
> });
>
> // ШАГ 2: Изучить критические секции:
> // - 🔴 ПАРОЛИ И ДОСТУПЫ (строки 80-150)
> // - Быстрый старт (строки 150-300)
> // - Архитектура (строки 300-500)
> // - Railway & CORS (строки 700-730)
> // - Запуск dev сервера (строки 1500+)
> // - История версий (строки 2800+)
>
> // ШАГ 3: Только после полного прочтения начинать работу
> ```
>
> ### 🔴 ЕСЛИ ТЫ НЕ ПРОЧИТАЛ ВЕСЬ ФАЙЛ:
>
> - ❌ Ты получишь белый экран при запуске
> - ❌ Туры не будут загружаться (CORS)
> - ❌ Dev сервер не запустится правильно
> - ❌ Повторишь ошибки которые уже были исправлены 10 раз
> - ❌ Не будешь знать пароли для входа в Directus
> - ❌ Пользователь будет ругаться: "ПОЧЕМУ ТЫ НЕ ЧИТАЕШЬ ДОКУМЕНТАЦИЮ?!"
>
> ### ✅ ПОДТВЕРДИ ЧТО ПРОЧИТАЛ:
>
> В своём первом ответе напиши:
> ```
> ✅ Прочитал AGENT_GUIDELINES.md полностью (все 3500+ строк)
> ✅ Изучил критические секции: ПАРОЛИ, CORS, dev server, Railway, DB структуру
> ✅ Готов работать по инструкции
> ```

---

## 🚨 ТИПИЧНЫЕ ОШИБКИ АГЕНТОВ И КАК ИХ ИЗБЕЖАТЬ

> ### 🔴 ЭТОТ РАЗДЕЛ ОСНОВАН НА РЕАЛЬНЫХ ПРОБЛЕМАХ!
>
> Каждая проблема ниже случалась минимум 5-10 раз с разными агентами.
> Прочитай внимательно чтобы не повторять те же ошибки!

---

### ❌ ОШИБКА #1: "Я запущу npm run dev в background"

**Что делает агент:**
```typescript
await run_in_terminal({
  command: "npm run dev",
  isBackground: true  // ❌ НЕПРАВИЛЬНО!
})
```

**Почему это НЕ РАБОТАЕТ:**
- Vite dev server крашится через 30-60 секунд
- Агент думает что всё работает, но сервер уже упал
- Пользователь видит белый экран
- Нужно перезапускать 10 раз

**✅ ПРАВИЛЬНОЕ РЕШЕНИЕ:**
```typescript
await create_and_run_task({
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

---

### ❌ ОШИБКА #2: "Я прочитал первые 200 строк, этого достаточно"

**Что делает агент:**
```typescript
await read_file({
  filePath: "AGENT_GUIDELINES.md",
  startLine: 1,
  endLine: 200  // ❌ НЕДОСТАТОЧНО!
})
```

**Почему это проблема:**
- Пропускаешь CORS конфигурацию (строки 700+)
- Пропускаешь Railway переменные
- Пропускаешь структуру БД
- Пропускаешь историю ошибок (строки 2800+)
- Повторяешь ВСЕ ошибки заново

**✅ ПРАВИЛЬНОЕ РЕШЕНИЕ:**
```typescript
await read_file({
  filePath: "AGENT_GUIDELINES.md",
  startLine: 1,
  endLine: 3500  // Весь файл!
})
```

---

### ❌ ОШИБКА #3: "Забыл проверить CORS на Railway"

**Что происходит:**
1. Агент запускает localhost:5173
2. Туры не загружаются (видит только 2 mock)
3. Агент пытается исправить код
4. Делает workaround с proxy в vite.config.js
5. Пользователь говорит "не работает"
6. Проходит 30 минут debugging'а

**Реальная причина:**
- CORS на Railway не включает localhost
- Переменная: `CORS_ORIGIN=https://johnda7.github.io` (без localhost!)
- Нужно добавить: `CORS_ORIGIN=http://localhost:5173,https://johnda7.github.io`

**✅ ПРАВИЛЬНАЯ ПОСЛЕДОВАТЕЛЬНОСТЬ:**

**ПЕРВЫМ ДЕЛОМ (до запуска сервера!):**
```bash
# 1. Проверить CORS
curl -s "https://phuketgo-directus-production.up.railway.app/items/tours" \
  -H "Origin: http://localhost:5173" -I | grep access-control-allow-origin

# Ожидаемый результат:
# access-control-allow-origin: http://localhost:5173

# Если НЕ видишь localhost - иди в Railway Dashboard!
```

---

### ❌ ОШИБКА #4: "Забыл создать .env.local"

**Что происходит:**
- Frontend пытается подключиться к `http://localhost:8055` (не работает)
- Directus работает на Railway, но frontend об этом не знает
- Ошибка: `Failed to fetch` или `ERR_CONNECTION_REFUSED`

**✅ ПРАВИЛЬНОЕ РЕШЕНИЕ:**

**Всегда проверяй ПЕРЕД запуском:**
```bash
cd /Users/evgeniymikhelev/phuketgo-react-1
cat .env.local 2>/dev/null || echo "❌ ФАЙЛ НЕ СУЩЕСТВУЕТ!"
```

**Если файла нет - создай:**
```bash
cat > .env.local << 'EOF'
VITE_DIRECTUS_URL=https://phuketgo-directus-production.up.railway.app
EOF
```

---

### ❌ ОШИБКА #5: "Делаю git push БЕЗ git pull"

**Что происходит:**
```bash
git add .
git commit -m "добавил туры"
git push origin main
# ❌ Error: Updates were rejected because the remote contains work...
```

**✅ ПРАВИЛЬНАЯ ПОСЛЕДОВАТЕЛЬНОСТЬ:**

```bash
# 1. ВСЕГДА делай pull ПЕРЕД началом работы
git pull origin main

# 2. Проверь что ты на main ветке
git branch

# 3. Добавь изменения
git add .

# 4. Commit
git commit -m "feat: добавлен тур Достопримечательности"

# 5. Pull ещё раз (на случай если кто-то запушил пока ты работал)
git pull origin main

# 6. ТЕПЕРЬ push
git push origin main
```

---

### ❌ ОШИБКА #6: "Не проверяю что туры действительно загрузились"

**Что делает агент:**
1. Запустил сервер
2. Сказал "✅ Готово!"
3. Не проверил результат

**Что видит пользователь:**
- Белый экран
- Только 2 mock тура вместо 10
- Ошибки в консоли

**✅ ПРАВИЛЬНАЯ ПРОВЕРКА:**

```bash
# 1. Проверить что Vite запущен
curl -s http://localhost:5173 | grep -o "<title>.*</title>"

# 2. Открыть браузер
open http://localhost:5173

# 3. Открыть консоль (F12 или Cmd+Option+I)

# 4. Искать логи:
# ✅ Tours received: 10  ← ВАЖНО! Должно быть 10, не 2!
```

**Только после этого говори пользователю:**
```
✅ Всё работает!
✅ Vite запущен на http://localhost:5173
✅ 10 туров загружены из Railway
✅ Нет CORS ошибок
✅ Можешь работать!
```

---

### ❌ ОШИБКА #7: "Пытаюсь исправить workaround'ом вместо root cause"

**Примеры workaround'ов которые НЕ НАДО делать:**

**1. Proxy в vite.config.js для CORS:**
```javascript
// ❌ НЕ ДЕЛАЙ ТАК!
export default defineConfig({
  server: {
    proxy: {
      '/items': 'https://...railway.app'
    }
  }
})
```
**Почему неправильно:**
- CORS нужно фиксить на Railway, не на frontend
- Proxy не работает в production
- Скрывает реальную проблему

**✅ ПРАВИЛЬНЫЙ ПОДХОД:** Фикси CORS на Railway!

---

### ❌ ОШИБКА #8: "Забыл распарсить JSON поля из Directus"

**Проблема:**
Directus SQLite хранит JSON массивы как строки. Когда ты получаешь данные через API, поля типа `included`, `not_included`, `schedule`, `what_to_bring`, `gallery` приходят как **строки**, а не массивы!

**Симптомы:**
```javascript
// Console error:
Uncaught TypeError: tour.included.map is not a function
  at TourDetailsPage.jsx:251:32
```

**Пример неправильного кода:**
```jsx
// ❌ НЕ ДЕЛАЙ ТАК!
{tour.included && tour.included.length > 0 && (
  <div>
    {tour.included.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </div>
)}
```

**Почему падает:**
```javascript
// Directus возвращает:
tour.included = '["Трансфер","Обед","Гид"]'  // ← ЭТО СТРОКА!

// А ты пытаешься:
tour.included.map(...)  // ❌ String.map() не существует!
```

**✅ ПРАВИЛЬНЫЙ ПОДХОД - JSON.parse() с try/catch:**

```jsx
{tour.included && (() => {
  try {
    // 1. Проверяем тип и парсим если строка
    const included = typeof tour.included === 'string' 
      ? JSON.parse(tour.included) 
      : tour.included;
    
    // 2. Проверяем что это массив и не пустой
    return Array.isArray(included) && included.length > 0 ? (
      <div className="space-y-2">
        {included.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    ) : null;
  } catch (e) {
    console.error('Error parsing included:', e);
    return null;
  }
})()}
```

**Поля которые нужно парсить:**

| Поле | Тип в Directus | Нужен JSON.parse? |
|------|----------------|-------------------|
| `title` | string | ❌ Нет |
| `description` | text | ❌ Нет |
| `price` | integer | ❌ Нет |
| `duration` | string | ❌ Нет |
| **`included`** | json | ✅ **ДА!** |
| **`not_included`** | json | ✅ **ДА!** |
| **`what_to_bring`** | json | ✅ **ДА!** |
| **`schedule`** | json | ✅ **ДА!** |
| **`gallery`** | json | ✅ **ДА!** |

**Шаблон для всех JSON полей:**

```jsx
{tour.FIELD_NAME && (() => {
  try {
    const parsed = typeof tour.FIELD_NAME === 'string' 
      ? JSON.parse(tour.FIELD_NAME) 
      : tour.FIELD_NAME;
    
    return Array.isArray(parsed) && parsed.length > 0 ? (
      <div>
        {parsed.map((item, index) => (
          // твоя разметка
        ))}
      </div>
    ) : null;
  } catch (e) {
    console.error('Error parsing FIELD_NAME:', e);
    return null;
  }
})()}
```

**Где применять:**
- `TourDetailsPage.jsx` - все поля included, not_included, what_to_bring, schedule
- `TourCard.jsx` - gallery поле для отображения фото
- Любой компонент который работает с JSON полями из Directus

**Чеклист перед использованием JSON полей:**

```markdown
□ Проверил тип: typeof field === 'string'?
□ Добавил JSON.parse() если строка
□ Обернул в try/catch для безопасности
□ Проверяю Array.isArray() перед .map()
□ Проверяю length > 0 чтобы не рендерить пустое
□ Добавил console.error() в catch для debugging
```

**Почему это важно:**
- SQLite не поддерживает native JSON type
- Directus хранит JSON как TEXT в SQLite
- API возвращает данные as-is (строки)
- Frontend должен парсить сам
- Без парсинга → TypeError → белый экран

**✅ ЗАПОМНИ:** Все JSON поля из Directus = строки, не массивы! Всегда парсь перед использованием!

---

### ❌ ОШИБКА #9: "Пытаюсь загрузить фото через API вместо Admin Panel"

**Проблема:**
Агент пытается использовать curl/API для загрузки фотографий:

```bash
# ❌ НЕ ДЕЛАЙ ТАК!
curl -X POST "https://phuketgo-directus-production.up.railway.app/files" \
  -F "file=@photo.jpg"
# Висит 30-60 секунд на каждом файле!
```

**Почему это НЕ РАБОТАЕТ:**
- ⏱️ Railway API ОЧЕНЬ медленный (30+ секунд на запрос)
- 🐌 Загрузка 28 фото = 14 минут ожидания
- 🚫 Пользователь отменяет через 2 минуты
- 💥 Таймауты, connection reset
- 😤 Пользователь ругается: "ПОЧЕМУ ТАК ДОЛГО?! СДЕЛАЙ НОРМАЛЬНО!"

**Симптомы:**
```bash
$ curl -X PATCH "https://...railway.app/items/tours/10" ...
# (висит)
# (висит)
# (висит 30 секунд)
# (пользователь нажимает Ctrl+C)
^C
```

**✅ ПРАВИЛЬНЫЙ ПОДХОД:**

**Шаг 1: Скопировать фото в проект (< 1 секунда)**
```bash
cp /path/to/source/*.jpg \
   /Users/evgeniymikhelev/phuketgo-react-1/src/assets/tour-slug/
```

**Шаг 2: Сгенерировать JSON массив (< 1 секунда)**
```bash
cd /Users/evgeniymikhelev/phuketgo-react-1/src/assets/tour-slug/
ls -1 *.jpg *.webp 2>/dev/null | while read file; do
  echo '"/src/assets/tour-slug/'$file'",'
done
```

**Шаг 3: Открыть Directus Admin Panel (< 5 секунд)**
```bash
open "https://phuketgo-directus-production.up.railway.app/admin"
# Login: admin@phuketgo.com / admin123
```

**Шаг 4: Вставить JSON в поле gallery (< 5 секунд)**
- Content → tours → выбрать тур
- Найти поле `gallery` (JSON type)
- Вставить: `["/src/assets/tour/photo1.jpg","/src/assets/tour/photo2.jpg"]`
- Найти поле `main_image` (String type)
- Вставить: `/src/assets/tour/photo1.jpg`
- Нажать **Save**

**Шаг 5: Проверить на localhost (< 5 секунд)**
```bash
# Обновить страницу: Cmd+Shift+R
# Должна появиться фотогалерея в сетке
```

**Итого: 20 секунд вместо 14 минут!** 🎉

**Важные моменты:**

1. **Фото хранятся В FRONTEND, не в Directus!**
   ```
   /Users/evgeniymikhelev/phuketgo-react-1/src/assets/tour-slug/
   ↑ Фото здесь, в Git репозитории
   ```

2. **В Directus только ПУТИ к фото, не сами файлы!**
   ```javascript
   // В БД:
   gallery: "[\"\/src\/assets\/tour\/photo.jpg\"]"  ← строка с путями
   
   // НЕ:
   gallery: <binary data>  ← НЕТ файлов в БД!
   ```

3. **Gallery это JSON строка, парсится на фронте:**
   ```jsx
   const gallery = typeof tour.gallery === 'string' 
     ? JSON.parse(tour.gallery) 
     : tour.gallery;
   ```

4. **Количество фото должно совпадать с production:**
   - Проверь production: сколько фото показывается
   - Добавь РОВНО столько же в новый проект
   - Пример: production показывает "17 фото" → добавь 17

5. **Фотогалерея отображается в сетке:**
   - 1 большое фото слева (row-span-2)
   - 4 маленьких справа (2x2)
   - Кнопка "+N фото" на 4-м фото
   - Кнопка "Показать все N фото" внизу

**Чеклист работы с фото:**

```markdown
□ Скопировал фото в /src/assets/[slug]/ (< 1 сек)
□ Сгенерировал JSON массив (< 1 сек)
□ Открыл Directus Admin Panel (< 5 сек)
□ Вставил JSON в поле gallery (< 5 сек)
□ Вставил путь в main_image (< 1 сек)
□ Нажал Save (< 2 сек)
□ Обновил localhost Cmd+Shift+R (< 2 сек)
□ Проверил что фото показываются (< 5 сек)
□ Закоммитил git add + commit + push (< 10 сек)
```

**ЗАПОМНИ:** Admin Panel = 30 секунд, API = 30 минут. Выбор очевиден!

---

### ❌ ОШИБКА #10: "Забыл что Vite не читает .env.local в production билде"

**Проблема:**
GitHub Pages показывает только 2 mock тура вместо 10 из Directus.

**Почему:**
- Создал `.env.production` или `.env.production.local`
- Vite **НЕ ЧИТАЕТ `.env.local` при `npm run build`** - это дизайн!
- `VITE_DIRECTUS_URL` = undefined в production
- Код использует fallback на MOCK_TOURS (2 тура)

**Симптомы:**
```bash
# Билд прошёл успешно
npm run build
# ✓ built in 1.85s

# Но в dist/assets/*.js всё ещё localhost:8055
grep "railway.app" dist/assets/*.js
# (ничего не найдено)

# На GitHub Pages:
# - Только 2 тура вместо 10
# - В Network: запросы к localhost:8055 (CORS error)
```

**❌ НЕПРАВИЛЬНЫЕ РЕШЕНИЯ:**

```bash
# ❌ Создать .env.production
echo 'VITE_DIRECTUS_URL=https://...railway.app' > .env.production
# НЕ РАБОТАЕТ! Vite игнорирует в production build

# ❌ Создать .env.production.local  
echo 'VITE_DIRECTUS_URL=https://...railway.app' > .env.production.local
# Тоже не работает стабильно!
```

**✅ ПРАВИЛЬНОЕ РЕШЕНИЕ:**

Хардкод Railway URL в `vite.config.js` через `define`:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/phuketgo-react/' : '/',
  server: {
    port: 5173,
    strictPort: true
  },
  build: {
    outDir: 'dist'
  },
  define: {
    // 🔥 ВОТ РЕШЕНИЕ! Хардкодим для production
    'import.meta.env.VITE_DIRECTUS_URL': process.env.NODE_ENV === 'production' 
      ? JSON.stringify('https://phuketgo-directus-production.up.railway.app')
      : undefined // В dev режиме берём из .env.local
  }
});
```

**Как проверить что исправлено:**

```bash
# 1. Пересобрать
npm run build

# 2. Проверить что Railway URL в сборке
grep -o "railway.app" dist/assets/*.js
# Должно найти!

# 3. Задеплоить
npx gh-pages -d dist

# 4. Подождать 1-2 минуты

# 5. Проверить GitHub Pages
open https://johnda7.github.io/phuketgo-react/
# Должны быть все 10 туров!
```

**Почему fallback на MOCK_TOURS:**

```typescript
// src/hooks/useDirectusTours.ts
export function useDirectusTours() {
  const [tours, setTours] = useState<any[]>([]);
  
  useEffect(() => {
    async function fetchTours() {
      try {
        const data = await toursApi.getAll();
        setTours(data);
      } catch (err) {
        // 🔥 ВОТ ПОЧЕМУ 2 ТУРА!
        // Когда Directus недоступен → fallback
        console.warn('Directus unavailable, using mock data:', err);
        setTours(MOCK_TOURS); // 2 mock тура
      }
    }
    fetchTours();
```

**ВАЖНО:** Это специальная фича предыдущего агента! Fallback гарантирует что сайт всегда работает, даже если Directus упал.

---

### ❌ ОШИБКА #11: "Забыл как туры изначально добавлялись через SQL"

**Проблема:**
Нужно добавить 10 новых туров, но забыл проверенный рабочий метод.

**История успеха (commit 13af1bc от 2 октября 00:01):**

Первые 10 туров добавлены через **SQL INSERT напрямую в базу данных SQLite**:

```bash
# Репозиторий: ~/Documents/GitHub/phuketgo-directus
# Файл: import-tours-direct.sql

INSERT INTO tours (
  slug, title, subtitle, description, 
  price_adult, price_child, price_infant, currency,
  duration, group_size, rating, reviews_count, 
  category, tags, status, sort
) VALUES 
  ('phi-phi-2days', 'Пхи-Пхи 2 дня / 1 ночь', '...', '...', 4000, 3500, 0, '฿', ..., 1),
  ('james-bond-island', 'Залив Пханг Нга и остров Джеймса Бонда', ..., 2),
  ('pearls-andaman-sea', 'Жемчужины Андаманского моря', ..., 3),
  # ... всего 10 туров
```

**Полная процедура (проверено работает):**

```bash
# 1. Перейти в репозиторий Directus
cd ~/Documents/GitHub/phuketgo-directus

# 2. Создать SQL файл с новыми турами
cat > import-new-tours.sql << 'EOF'
INSERT INTO tours (slug, title, subtitle, description, 
price_adult, price_child, price_infant, currency,
duration, group_size, rating, reviews_count, 
category, tags, status, sort, 
main_image, gallery, included, not_included, what_to_bring, schedule)
VALUES 
('new-tour-slug', 'Название тура', 'Подзаголовок', 'Описание...', 
2000, 1800, 0, '฿',
'1 день', 'до 20 человек', 4.7, 45,
'islands', '["острова","пляжи"]', 'published', 11,
'../assets/new-tour/main.jpg',
'["../assets/new-tour/1.jpg", "../assets/new-tour/2.jpg"]',
'["Трансфер от отеля", "Гид на русском"]',
'["Личные расходы", "Дополнительные экскурсии"]',
'["Купальник", "Солнцезащитный крем"]',
'[{"time":"08:00","title":"Встреча в отеле","description":"Трансфер"}]');
EOF

# 3. Применить SQL
sqlite3 data.db < import-new-tours.sql

# 4. Проверить
sqlite3 data.db "SELECT COUNT(*) FROM tours;"
# Было 10 → стало 11+

# 5. Закоммитить data.db
git add data.db
git commit -m "feat: добавлен новый тур [название]"
git push

# 6. Railway автоматически задеплоит (1-2 минуты)

# 7. Проверить на production
curl "https://phuketgo-directus-production.up.railway.app/items/tours?limit=50" | jq length
# Должно вернуть новое количество
```

**КРИТИЧЕСКИ ВАЖНО:**

1. **JSON поля как TEXT:**
   - `gallery` = `'["path1.jpg", "path2.jpg"]'` (в одинарных кавычках!)
   - `included` = `'["Трансфер", "Гид"]'` (строка JSON, не массив!)
   - `tags` = `'["острова","пляжи"]'` (аналогично)

2. **Пути к фотографиям:**
   - Формат: `../assets/tour-slug/photo.jpg`
   - Префикс `../` ОБЯЗАТЕЛЕН для корректной загрузки!

3. **Порядок действий:**
   - Сначала скопировать фото в `/src/assets/tour-slug/`
   - Потом создать SQL с правильными путями
   - Применить к data.db
   - Закоммитить и запушить
   - Railway автоматически задеплоит

**Файлы для примера:**

```bash
# Все SQL скрипты в ~/Documents/GitHub/phuketgo-directus/
ls -la *.sql

# create-tours-table.sql      - Создание таблицы
# import-tours-direct.sql     - Первые 10 туров (работает!)
# fix-permissions.sql         - Настройка прав доступа
# fix-public-access.sql       - Публичный доступ к API
```

**Почему этот метод лучше всего:**

✅ Скорость: 5-10 минут на 10 туров  
✅ Надёжность: прямой INSERT в SQLite  
✅ Контроль: видишь весь SQL код  
✅ Версионность: всё в git  
✅ Автодеплой: Railway сам подхватит изменения  

**Альтернативные методы (медленнее):**

- ❌ curl API: 30-60 сек на 1 запрос = 10-20 минут на 10 туров
- ⚠️ Admin Panel: удобно для редактирования, но долго для массового добавления
- ✅ SQL INSERT: 5-10 минут на любое количество туров!
  }, []);
  
  return { tours };
}
```

**Это специально сделано предыдущим агентом:**
- Если Directus недоступен → показать хоть что-то
- MOCK_TOURS = 2 тура для демонстрации
- НЕ УДАЛЯЙ этот fallback!

**✅ ЗАПОМНИ:**
- Vite НЕ читает `.env.local` в production по дизайну
- Используй `define` в `vite.config.js` для production переменных
- `.env.local` остаётся только для dev режима
- Fallback на MOCK_TOURS - это не баг, это фича!

---

### 📋 ФИНАЛЬНЫЙ ЧЕКЛИСТ ДЛЯ АГЕНТА

**Перед тем как сказать "Готово", проверь:**

```markdown
□ Прочитал ВЕСЬ AGENT_GUIDELINES.md (3500 строк, не 200!)
□ Сделал git pull origin main в обоих репозиториях
□ Проверил CORS на Railway (должен быть localhost + github.io)
□ Проверил .env.local существует и содержит Railway URL
□ Запустил Vite через create_and_run_task (НЕ run_in_terminal!)
□ Подождал 5-10 секунд после запуска
□ Проверил curl http://localhost:5173 возвращает HTML
□ Открыл браузер на http://localhost:5173
□ Открыл DevTools консоль (F12)
□ Проверил что нет красных ошибок
□ Проверил логи: "Tours received: 10" (не 2!)
□ Посчитал карточки туров на странице
□ ТОЛЬКО ПОСЛЕ ВСЕГО ЭТОГО сказал "✅ Готово!"
```

---

### 🎯 ЗОЛОТЫЕ ПРАВИЛА ДЛЯ АГЕНТА

1. **📖 Читай документацию ПОЛНОСТЬЮ**
   - Экономия 30 секунд → потеря 30 минут на debugging

2. **🔍 Проверяй результат, не предполагай**
   - Не говори "должно работать", скажи "проверил - работает"

3. **🚫 Не делай workaround, фикси root cause**
   - Если CORS не работает - фикси на Railway, не proxy в коде

4. **🔄 Pull перед push, всегда**
   - `git pull origin main` перед началом работы

5. **📱 Открывай консоль браузера**
   - DevTools - твой лучший друг для debugging

6. **⏱️ Подожди после запуска сервера**
   - Vite нужно 5-10 секунд для инициализации

7. **✅ Используй правильные инструменты**
   - VS Code Task для dev сервера, не background terminal

8. **📝 Commit сообщения осмысленные**
   - "feat: добавлен тур X" лучше чем "update"

9. **🔐 Знай пароли наизусть**
   - admin@phuketgo.com / admin123 для Directus

10. **🧪 Тестируй перед тем как сказать "готово"**
    - Чеклист выше - это minimum

---

## 🔐 ПАРОЛИ И ДОСТУПЫ - ЗАПИШИ СЕБЕ!

> ### 🔴 КРИТИЧНО! ВСЕ ПАРОЛИ И ДОСТУПЫ ЗДЕСЬ!
>
> **Это первая вещь которую ты должен знать перед началом работы!**
>
> Без этих данных ты НЕ СМОЖЕШЬ:
> - Войти в Directus Admin Panel
> - Залогиниться в GitHub для push/pull
> - Получить доступ к Railway Dashboard
> - Добавить/изменить туры в базе данных

---

### 🗂️ DIRECTUS CMS (Backend) - АДМИН ПАНЕЛЬ

**URL (Production):** https://phuketgo-directus-production.up.railway.app/admin  
**URL (Local):** http://localhost:8055/admin

**Учётные данные:**
```
Email:    admin@phuketgo.com
Password: admin123
```

**Важно:**
- Эти данные хранятся в `.env` файле Directus репозитория
- Используй их для входа в админку через браузер
- Можешь создавать новые коллекции, загружать фото, менять туры

**Где находится .env:**
```bash
/Users/evgeniymikhelev/Documents/GitHub/phuketgo-directus/.env
```

**Полные переменные окружения Directus:**
```bash
KEY=5NFLVttALvNzYMYNSwoztYgkfGoqkRqWfzJY6D4SYc0=
SECRET=xK9mP2vL8qR5wN3jT7yU6hF4gD1sA0bC9eV8zX2mQ5n=
DB_CLIENT=sqlite3
DB_FILENAME=./data.db
ADMIN_EMAIL=admin@phuketgo.com
ADMIN_PASSWORD=admin123
PORT=8055
PUBLIC_URL=http://localhost:8055
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:5173
```

---

### 🐙 GITHUB - РЕПОЗИТОРИИ

**Owner аккаунт:** `johnda7`

**Репозиторий #1: Frontend (React + Vite)**
```
GitHub URL:     https://github.com/johnda7/phuketgo-react
Локальный путь: /Users/evgeniymikhelev/phuketgo-react-1
Branch:         main
Deploy:         GitHub Pages (автоматически при push в main)
Production:     https://johnda7.github.io/phuketgo-react/
```

**Репозиторий #2: Backend (Directus CMS)**
```
GitHub URL:     https://github.com/johnda7/phuketgo-directus
Локальный путь: /Users/evgeniymikhelev/Documents/GitHub/phuketgo-directus
Branch:         main
Deploy:         Railway.app (автоматически при push в main)
Production:     https://phuketgo-directus-production.up.railway.app
```

**🔴 КАК ПРАВИЛЬНО РАБОТАТЬ С GITHUB:**

**1. ПЕРЕД началом работы - ВСЕГДА делай pull:**
```bash
# Frontend
cd /Users/evgeniymikhelev/phuketgo-react-1
git pull origin main

# Backend (Directus)
cd /Users/evgeniymikhelev/Documents/GitHub/phuketgo-directus
git pull origin main
```

**2. ПРОВЕРЬ текущую ветку:**
```bash
git branch
# Должно быть: * main (с звёздочкой)
```

**3. ПРОВЕРЬ статус перед commit:**
```bash
git status
# Покажет какие файлы изменены
```

**4. ДОБАВЬ изменения правильно:**
```bash
# НЕ используй "git add ." если не уверен!
# Добавляй только нужные файлы:

git add src/pages/TourDetailsPage.jsx
git add src/data/tours.js
# и т.д.

# Или если уверен что всё нужно:
git add .
```

**5. COMMIT с понятным сообщением:**
```bash
git commit -m "feat: добавлен тур Достопримечательности Пхукета"
# или
git commit -m "fix: исправлен CORS для localhost"
# или
git commit -m "docs: обновлён AGENT_GUIDELINES.md с паролями"
```

**6. PUSH в main:**
```bash
git push origin main
```

**7. ПРОВЕРЬ что deploy прошёл успешно:**
- **Frontend**: GitHub Actions → должен пройти "pages build and deployment"
- **Backend**: Railway Dashboard → должен показать "Success" зелёным

**🔴 ЕСЛИ ВОЗНИКАЮТ ПРОБЛЕМЫ С GITHUB:**

**Проблема: "Authentication failed"**
```bash
# Решение: Используй Personal Access Token вместо пароля
# Попроси пользователя создать token на github.com/settings/tokens
```

**Проблема: "Conflict when pulling"**
```bash
# Решение 1: Сначала commit свои изменения
git add .
git commit -m "WIP: текущая работа"
git pull origin main

# Решение 2: Если конфликт - resolve manually
git status  # покажет конфликтующие файлы
# Открой файлы, исправь конфликты, потом:
git add .
git commit -m "merge: resolved conflicts"
```

**Проблема: "Detached HEAD state"**
```bash
# Ты не на ветке main! Вернись на main:
git checkout main
git pull origin main
```

---

### 🚂 RAILWAY.APP - DEPLOYMENT PLATFORM

**Project:** `strong-balance`  
**Service:** `phuketgo-directus`

**URL Dashboard:** https://railway.app/  
→ Войди через GitHub аккаунт `johnda7`  
→ Выбери проект `strong-balance`  
→ Выбери service `phuketgo-directus`

**Важные вкладки в Railway:**

1. **Deployments** - история деплоев, логи
2. **Variables** - переменные окружения (🔴 ЗДЕСЬ CORS!)
3. **Settings** - настройки домена, billing
4. **Metrics** - использование памяти, CPU

**🔴 ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ НА RAILWAY:**

Открой: Railway Dashboard → phuketgo-directus → **Variables**

**Должны быть установлены:**
```bash
KEY=5NFLVttALvNzYMYNSwoztYgkfGoqkRqWfzJY6D4SYc0=
SECRET=xK9mP2vL8qR5wN3jT7yU6hF4gD1sA0bC9eV8zX2mQ5n=
DB_CLIENT=sqlite3
DB_FILENAME=./data.db
ADMIN_EMAIL=admin@phuketgo.com
ADMIN_PASSWORD=admin123
PORT=8055
PUBLIC_URL=https://phuketgo-directus-production.up.railway.app
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:5173,https://johnda7.github.io  ← 🔴 КРИТИЧНО!
CACHE_ENABLED=false
RATE_LIMITER_ENABLED=false
```

**🔴 ВАЖНО ПРО CORS_ORIGIN:**
- Должно быть БЕЗ ПРОБЕЛОВ между доменами!
- Первый домен: `http://localhost:5173` (для локальной разработки)
- Второй домен: `https://johnda7.github.io` (для production)
- Разделитель: запятая без пробелов!

**КАК ИЗМЕНИТЬ ПЕРЕМЕННЫЕ:**
1. Открой Variables вкладку
2. Найди переменную (например CORS_ORIGIN)
3. Нажми Edit (карандаш справа)
4. Измени значение
5. **Сохрани** (Railway автоматически редеплоит ~60-90 сек)

**КАК ПРОВЕРИТЬ ЧТО DEPLOY ПРОШЁЛ:**
1. Вкладка Deployments
2. Последний деплой должен быть зелёным "Success"
3. Нажми на деплой → View Logs
4. Должно быть: `Server started at http://0.0.0.0:8055`

---

### 📝 ЧЕКЛИСТ ПЕРЕД НАЧАЛОМ РАБОТЫ:

```bash
# 1. Проверь что залогинен в GitHub
git config --global user.name   # должно быть: johnda7 или твоё имя
git config --global user.email  # email

# 2. Проверь доступ к обоим репозиториям
cd /Users/evgeniymikhelev/phuketgo-react-1
git status  # не должно быть ошибок

cd /Users/evgeniymikhelev/Documents/GitHub/phuketgo-directus
git status  # не должно быть ошибок

# 3. Сделай pull из main
cd /Users/evgeniymikhelev/phuketgo-react-1
git pull origin main

cd /Users/evgeniymikhelev/Documents/GitHub/phuketgo-directus
git pull origin main

# 4. Проверь Railway доступ
curl -s https://phuketgo-directus-production.up.railway.app/server/ping
# Должно вернуть: "pong"

# 5. Проверь CORS на Railway
curl -s "https://phuketgo-directus-production.up.railway.app/items/tours" \
  -H "Origin: http://localhost:5173" -I | grep access-control-allow-origin
# Должно вернуть: access-control-allow-origin: http://localhost:5173

# 6. Проверь .env.local файл
cd /Users/evgeniymikhelev/phuketgo-react-1
cat .env.local
# Должно быть: VITE_DIRECTUS_URL=https://phuketgo-directus-production.up.railway.app

# 7. Проверь Directus логин (открой в браузере)
# https://phuketgo-directus-production.up.railway.app/admin
# Email: admin@phuketgo.com
# Password: admin123
```

**✅ Если всё прошло успешно - можешь начинать работу!**

---

> **⚠️ ВАЖНОЕ ПРАВИЛО:** ВСЯ документация в ОДНОМ файле - AGENT_GUIDELINES.md
> 
> ❌ **НЕ СОЗДАВАЙ** новые файлы типа "TOUR_IMPORT_GUIDE.md", "DEV_SERVER_GUIDE.md" и т.п.
> ✅ **ДОБАВЛЯЙ** все в этот файл как новые разделы

---

## 🚀 БЫСТРЫЙ СТАРТ - КАК ЗАПУСТИТЬ ПРОЕКТ ЛОКАЛЬНО

> ### 🔴 КРИТИЧНО! ПРОЧИТАЙ СНАЧАЛА ПОЛНУЮ ИНСТРУКЦИЮ!
>
> **НЕ ТОРОПИСЬ!** Просто запустить `npm run dev` НЕ ДОСТАТОЧНО!
>
> **ТЫ ДОЛЖЕН:**
> 1. ✅ Запустить Directus Backend (БЕЗ НЕГО НИЧЕГО НЕ РАБОТАЕТ!)
> 2. ✅ Проверить что CORS настроен правильно на Railway
> 3. ✅ Создать `.env.local` файл с Railway URL
> 4. ✅ Запустить Vite через VS Code Task (НЕ через `npm run dev` в background!)
> 5. ✅ Проверить что туры загружаются в консоли браузера
>
> **Прочитай ВСЕ шаги ниже перед началом работы!**

---

### ⚡ ПОШАГОВАЯ ИНСТРУКЦИЯ:

**ШАГ 1: 🔴 ПРОВЕРИТЬ CORS НА RAILWAY (КРИТИЧНО!)**

> **ПОЧЕМУ ЭТО ПЕРВЫЙ ШАГ?**
> Без правильного CORS туры НЕ БУДУТ загружаться с localhost!
> Ты увидишь только 2 mock тура вместо 10 реальных из БД.

```bash
# Проверить текущую конфигурацию CORS
curl -s "https://phuketgo-directus-production.up.railway.app/items/tours" \
  -H "Origin: http://localhost:5173" \
  -I | grep -i "access-control-allow-origin"
```

**Ожидаемый результат:**
```
access-control-allow-origin: http://localhost:5173
```

**Если видишь ТОЛЬКО `https://johnda7.github.io` - CORS НЕ НАСТРОЕН!**

**🔴 КАК ИСПРАВИТЬ:**
1. Открой Railway Dashboard: https://railway.app/
2. Проект: `strong-balance` → Service: `phuketgo-directus`
3. Вкладка: **Variables**
4. Найди переменную: `CORS_ORIGIN`
5. Должно быть (БЕЗ ПРОБЕЛОВ!):
   ```
   http://localhost:5173,https://johnda7.github.io
   ```
6. Сохрани и подожди **60-90 секунд** для редеплоя
7. Проверь снова командой выше

---

**ШАГ 2: 🔴 СОЗДАТЬ .env.local ФАЙЛ**

> **ПОЧЕМУ ЭТО ВАЖНО?**
> Без этого файла React не знает где искать Backend API!
> Frontend будет пытаться подключиться к `http://localhost:8055` (не работает).

```bash
# Перейти в папку frontend
cd /Users/evgeniymikhelev/phuketgo-react-1

# Проверить существует ли файл
cat .env.local 2>/dev/null || echo "ФАЙЛ НЕ СУЩЕСТВУЕТ - НУЖНО СОЗДАТЬ!"
```

**Если файл НЕ существует, создай его:**

```bash
# Создать .env.local с Railway URL
cat > .env.local << 'EOF'
VITE_DIRECTUS_URL=https://phuketgo-directus-production.up.railway.app
EOF

# Проверить содержимое
cat .env.local
```

**Результат должен быть:**
```
VITE_DIRECTUS_URL=https://phuketgo-directus-production.up.railway.app
```

---

**ШАГ 3: Запустить Directus CMS (Backend) - ОПЦИОНАЛЬНО**

> **ВАЖНО:** Directus УЖЕ работает на Railway!
> Локальный Directus нужен только если хочешь менять БД локально.
> Для обычной разработки frontend - пропусти этот шаг!

```bash
# Перейти в папку с Directus
cd /Users/evgeniymikhelev/Documents/GitHub/phuketgo-directus

# Запустить Directus с переменными окружения
DB_CLIENT=sqlite3 DB_FILENAME=./data.db PORT=8055 npx directus start
```

**Результат:** Directus запустится на `http://localhost:8055`
```
[INFO] Server started at http://0.0.0.0:8055
```

---

**ШАГ 4: 🔴 ЗАПУСТИТЬ REACT (Frontend) - ПРАВИЛЬНЫЙ СПОСОБ!**

> **🔴 КРИТИЧНО! ИСПОЛЬЗУЙ ТОЛЬКО VS CODE TASK!**
>
> ❌ **НЕ ИСПОЛЬЗУЙ:** `npm run dev` в background через `run_in_terminal`
> ❌ **НЕ ИСПОЛЬЗУЙ:** `npx vite` напрямую
> ❌ **НЕ ИСПОЛЬЗУЙ:** Какие-либо другие способы!
>
> ✅ **ЕДИНСТВЕННЫЙ ПРАВИЛЬНЫЙ СПОСОБ:** `create_and_run_task` с VS Code Task
>
> **ПОЧЕМУ?** Vite dev server должен быть интерактивным, иначе крашится!

**Правильная команда:**

```typescript
// Используй этот инструмент
await create_and_run_task({
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

**Ожидаемый результат:**
```
VITE v6.3.5  ready in 175 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

**Подожди 5-10 секунд для инициализации!**

---

**ШАГ 5: 🔴 ПРОВЕРИТЬ ЧТО ВСЁ РАБОТАЕТ**

```bash
---

**ШАГ 5: 🔴 ПРОВЕРИТЬ ЧТО ВСЁ РАБОТАЕТ**

```bash
# 1. Проверить что Vite запущен
curl -s http://localhost:5173 | grep -o "<title>.*</title>"
# Должно вернуть: <title>PhuketGo - Туры по островам Пхукета</title>

# 2. Проверить Railway API (должен вернуть туры)
curl -s "https://phuketgo-directus-production.up.railway.app/items/tours" | head -20

# 3. Проверить CORS снова
curl -s "https://phuketgo-directus-production.up.railway.app/items/tours" \
  -H "Origin: http://localhost:5173" -I | grep access-control-allow-origin
# Должно быть: access-control-allow-origin: http://localhost:5173
```

**Открыть браузер:**
```
http://localhost:5173/
```

**Открыть консоль браузера (F12 или Cmd+Option+I) и искать логи:**
```javascript
📡 Directus API URL: https://phuketgo-directus-production.up.railway.app
🚀 Fetching tours from Directus...
✅ Tours received: 10
🔍 DEBUG Tours: { count: 10, loading: false, error: null, tours: [...] }
```

**🔴 ЕСЛИ ВИДИШЬ "Tours received: 2" - ЭТО MOCK DATA!**
- Значит CORS не настроен или .env.local неправильный
- Вернись к ШАГ 1 и ШАГ 2!

**✅ ЕСЛИ ВИДИШЬ "Tours received: 10" - ВСЁ РАБОТАЕТ!**

---

### 🔴 КРИТИЧЕСКИЕ ОШИБКИ КОТОРЫЕ НЕ НАДО ДЕЛАТЬ:

❌ **НЕ запускай `npm run dev` через `run_in_terminal` с `isBackground: true`**
   - Причина: Vite крашится через 30-60 секунд
   - Решение: Только `create_and_run_task`!

❌ **НЕ забывай проверить CORS на Railway ПЕРЕД запуском**
   - Причина: Без CORS туры не загрузятся
   - Решение: Сначала ШАГ 1, потом всё остальное!

❌ **НЕ забывай создать `.env.local`**
   - Причина: React не знает куда делать запросы
   - Решение: Всегда проверяй файл перед запуском!

❌ **НЕ пытайся запускать Directus локально если не нужно**
   - Причина: Railway уже работает!
   - Решение: Используй Railway URL в `.env.local`

❌ **НЕ пропускай чтение ВСЕГО этого файла (2860+ строк)**
   - Причина: Без этого ты повторишь все ошибки снова
   - Решение: `read_file` от строки 1 до 2900!

---

### 📋 ЧЕКЛИСТ ПЕРЕД ТЕМ КАК СКАЗАТЬ "ГОТОВО":

```
□ Прочитал ВСЁ AGENT_GUIDELINES.md (2860+ строк)
□ Проверил CORS на Railway (ШАГ 1)
□ Создал/проверил .env.local (ШАГ 2)
□ Запустил Vite через create_and_run_task (ШАГ 4)
□ Подождал 5-10 секунд инициализации
□ Проверил curl http://localhost:5173
□ Открыл браузер и консоль (F12)
□ Увидел "Tours received: 10" в консоли
□ Увидел 10 туров на странице (не 2!)
□ Проверил что нет CORS ошибок в консоли
□ Сказал пользователю: "✅ Всё работает! 10 туров загружены."
```

---

**ШАГ 3: Запустить Directus CMS (Backend) - ОПЦИОНАЛЬНО**

> **ВАЖНО:** Directus УЖЕ работает на Railway!
> Локальный Directus нужен только если хочешь менять БД локально.
> Для обычной разработки frontend - пропусти этот шаг!

```bash
# Перейти в папку с Directus
cd /Users/evgeniymikhelev/Documents/GitHub/phuketgo-directus

# Запустить Directus с переменными окружения
DB_CLIENT=sqlite3 DB_FILENAME=./data.db PORT=8055 npx directus start
```

**Результат:** Directus запустится на `http://localhost:8055`
```
[INFO] Server started at http://0.0.0.0:8055
```

---

**ШАГ 6: Открыть в браузере (финальная проверка)**
```
Frontend: http://localhost:5173/
Directus Admin (если запустил локально): http://localhost:8055/admin
```

---

### 🔑 ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ:

> ### 🔴 ЕЩЁ РАЗ ПРО CORS (САМАЯ ЧАСТАЯ ПРОБЛЕМА!)
>
> **Что такое CORS?**
> - Cross-Origin Resource Sharing
> - Браузер блокирует запросы с одного домена на другой
> - Нужно явно разрешить на сервере (Railway)
>
> **Почему это важно для нас?**
> ```
> Frontend:  http://localhost:5173      ← один домен
> Backend:   https://.....railway.app   ← другой домен
>            ↑
>            Браузер блокирует это без CORS!
> ```
>
> **Как проверить проблема ли это?**
> 1. Открой консоль браузера (F12)
> 2. Если видишь ошибку типа:
>    ```
>    Access to fetch at 'https://...railway.app/items/tours'
>    from origin 'http://localhost:5173' has been blocked by CORS policy
>    ```
>    **ЭТО CORS ПРОБЛЕМА!**
>
> **Как исправить?**
> - НЕ в коде! В Railway Dashboard → Variables → CORS_ORIGIN
> - Должно быть: `http://localhost:5173,https://johnda7.github.io`
> - БЕЗ ПРОБЕЛОВ между доменами!
> - Сохрани и подожди 60-90 сек

---

**Почему нужны переменные окружения для Directus?**
- `.env` файл не всегда читается из терминала
- Поэтому передаём переменные напрямую в команду
- `DB_CLIENT=sqlite3` - тип базы данных
- `DB_FILENAME=./data.db` - путь к SQLite базе
- `PORT=8055` - порт для API

**Структура папок:**
```
~/Documents/GitHub/
├── phuketgo-react-1/          ← Frontend (React + Vite)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── phuketgo-directus/         ← Backend (Directus CMS)
    ├── data.db                ← SQLite база с турами
    ├── .env                   ← Настройки
    └── railway.json           ← Конфиг для Railway
```

**Если Directus не запускается:**
1. Проверьте что файл `data.db` существует
2. Проверьте права доступа: `ls -la data.db`
3. Попробуйте из папки: `cd /Users/evgeniymikhelev/Documents/GitHub/phuketgo-directus`

**Если туры не загружаются:**
1. Проверьте что Directus запущен: `curl http://localhost:8055/server/ping`
2. Проверьте API: `curl http://localhost:8055/items/tours`
3. Откройте консоль браузера (F12) и посмотрите ошибки
4. **ПРОВЕРЬТЕ CORS!** Если видите ошибку CORS в консоли:
   - Откройте Railway Dashboard: https://railway.app/
   - Проект: strong-balance → phuketgo-directus
   - Variables → CORS_ORIGIN
   - Должно быть: `http://localhost:5173,https://johnda7.github.io`
   - Сохраните и подождите ~60-90 сек редеплоя

---

## 🏗️ АРХИТЕКТУРА ПРОЕКТА - КАК ВСЁ УСТРОЕНО

### 📦 ДВА РЕПОЗИТОРИЯ НА GITHUB:

**1. Frontend (этот репозиторий):**
```
Репозиторий: johnda7/phuketgo-react
Локальный путь: ~/Documents/GitHub/phuketgo-react
GitHub URL: https://github.com/johnda7/phuketgo-react
Deploy: GitHub Pages
Production URL: https://johnda7.github.io/phuketgo-react/
```

**2. Backend (отдельный репозиторий):**
```
Репозиторий: johnda7/phuketgo-directus
Локальный путь: ~/Documents/GitHub/phuketgo-directus
GitHub URL: https://github.com/johnda7/phuketgo-directus
Deploy: Railway.app
Production URL: https://phuketgo-directus-production.up.railway.app
```

---

### 🔄 КАК ОНИ СВЯЗАНЫ:

```
┌─────────────────────────────────────────────────┐
│  ПОЛЬЗОВАТЕЛЬ                                   │
│  открывает https://johnda7.github.io/...       │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  FRONTEND (phuketgo-react)                     │
│  📂 ~/Documents/GitHub/phuketgo-react          │
│  🌐 GitHub Pages                               │
│                                                 │
│  - React 18.2.0 + Vite 6.3.5                  │
│  - Tailwind CSS                                │
│  - React Router DOM 7.9.3                     │
│  - Компоненты: TourCard, Header, Footer       │
│  - Страницы: App.jsx, TourDetailsPage.jsx     │
└─────────────────────────────────────────────────┘
                    ↓ fetch()
            VITE_DIRECTUS_URL
                    ↓
┌─────────────────────────────────────────────────┐
│  BACKEND (phuketgo-directus)                   │
│  📂 ~/Documents/GitHub/phuketgo-directus       │
│  🚂 Railway.app                                │
│                                                 │
│  - Directus CMS 11.12.0                        │
│  - Node.js + Express                           │
│  - SQLite database (data.db)                   │
│  - API: /items/tours, /server/ping            │
└─────────────────────────────────────────────────┘
                    ↓ читает
┌─────────────────────────────────────────────────┐
│  DATABASE (data.db)                            │
│  📊 SQLite база данных                         │
│  📍 Внутри контейнера Railway                  │
│                                                 │
│  - 10 туров по Пхукету                         │
│  - Таблицы: tours, directus_users, и т.д.     │
└─────────────────────────────────────────────────┘
```

---

### 📍 ОСНОВНЫЕ ПУТИ И ФАЙЛЫ:

**Frontend (phuketgo-react):**
```
~/Documents/GitHub/phuketgo-react/
├── src/
│   ├── App.jsx                  ← Главная страница (список туров)
│   ├── pages/
│   │   └── TourDetailsPage.jsx  ← Страница тура (23 критерия)
│   ├── components/
│   │   ├── Header.jsx           ← Шапка сайта
│   │   └── Footer.jsx           ← Подвал сайта
│   ├── hooks/
│   │   └── useDirectusTours.ts  ← API запросы к Directus
│   └── assets/                  ← Фото туров
├── .env.local                   ← Конфиг (VITE_DIRECTUS_URL)
├── .secrets/                    ← Пароли (НЕ коммитится!)
│   ├── directus/                ← Пароли Directus
│   ├── railway/                 ← Переменные Railway
│   └── deployment/              ← Инструкции деплоя
├── package.json                 ← Зависимости + скрипты
├── vite.config.js               ← Конфиг Vite
└── AGENT_GUIDELINES.md          ← Этот файл!
```

**Backend (phuketgo-directus):**
```
~/Documents/GitHub/phuketgo-directus/
├── data.db                      ← База данных SQLite (272 KB)
├── .env                         ← Локальные переменные
├── package.json                 ← Directus зависимости
├── railway.json                 ← Конфиг Railway
└── *.sql                        ← SQL скрипты импорта туров
```

---

### 🚀 КАК РАБОТАТЬ С ПРОЕКТОМ:

**Если нужно изменить ДИЗАЙН/ИНТЕРФЕЙС:**
```bash
cd ~/Documents/GitHub/phuketgo-react
# Редактируй файлы в src/
npm run deploy  # Деплой на GitHub Pages
```

**Если нужно изменить ДАННЫЕ ТУРОВ:**
```bash
cd ~/Documents/GitHub/phuketgo-directus
# Редактируй data.db или через Directus Admin
git add . && git commit -m "update" && git push  # Railway автодеплой
```

**Если нужно ЛОКАЛЬНО протестировать:**
```bash
# Frontend:
cd ~/Documents/GitHub/phuketgo-react
npm run dev  # http://localhost:5173

# Backend:
cd ~/Documents/GitHub/phuketgo-directus
npx directus start  # http://localhost:8055
```

---

### 🔗 ВАЖНЫЕ URL:

| Что | Localhost | Production |
|-----|-----------|------------|
| **Frontend** | http://localhost:5173 | https://johnda7.github.io/phuketgo-react/ |
| **Backend API** | http://localhost:8055 | https://phuketgo-directus-production.up.railway.app |
| **Directus Admin** | http://localhost:8055/admin | https://phuketgo-directus-production.up.railway.app/admin |
| **API Tours** | http://localhost:8055/items/tours | https://phuketgo-directus-production.up.railway.app/items/tours |

---

### 🎯 ГЛАВНОЕ ЧТО НУЖНО ЗАПОМНИТЬ:

1. **Два репозитория** - не путай их!
2. **Frontend → GitHub Pages** (статичный сайт)
3. **Backend → Railway.app** (динамический API)
4. **Данные туров в data.db** на Railway
5. **Секреты в `.secrets/`** - не коммитить!
6. **Деплой frontend:** `npm run deploy`
7. **Деплой backend:** `git push` (автодеплой)

---

## 🔐 СЕКРЕТНЫЕ ДАННЫЕ - ГДЕ ИСКАТЬ

**ВАЖНО:** Все пароли и ключи хранятся в защищённой папке `.secrets/`

### 📁 Структура секретных данных:

```
.secrets/
├── directus/               ← Directus CMS доступы
│   ├── PASSWORDS.md       ← Пароли для админки (production + localhost)
│   └── .env.local         ← Локальная конфигурация
│
├── railway/               ← Railway.app deployment
│   ├── ENVIRONMENT_VARIABLES.md  ← Все переменные окружения
│   ├── .env.production           ← Production config (copy-paste ready)
│   └── README.md                 ← Quick reference
│
└── deployment/            ← 🚀 Инструкции по деплою
    ├── DEPLOY_GUIDE.md           ← Полное руководство
    └── QUICK_COMMANDS.md         ← Быстрые команды
```

### 🔑 Ключевые данные (см. файлы выше):

**Directus Production (Railway):**
- URL: https://phuketgo-directus-production.up.railway.app/admin
- Email: anotherstoriz@gmail.com
- Password: admin123

**Directus Localhost:**
- URL: http://localhost:8055/admin
- Email: admin@phuketgo.com
- Password: admin123

**Railway Environment Variables:**
- Все переменные в `.secrets/railway/ENVIRONMENT_VARIABLES.md`
- Включает: KEY, SECRET, DB_CLIENT, PUBLIC_URL, CORS и т.д.

**🚀 Деплой инструкции:**
- Полный гайд: `.secrets/deployment/DEPLOY_GUIDE.md`
- Быстрые команды: `.secrets/deployment/QUICK_COMMANDS.md`

### 🛡️ Защита:

```gitignore
# В .gitignore уже добавлено:
.secrets/
CREDENTIALS.md
RAILWAY_CREDENTIALS.md
```

⚠️ **НИКОГДА НЕ КОММИТЬ эти файлы в Git!**

---

## 🎯 О ПРОЕКТЕ И ТВОЕЙ РОЛИ

### 🚀 **Миссия проекта:**
**PhuketGo** - это **№1 Telegram Mini App** для бронирования туров на Пхукете (а в будущем - во всём Telegram).

### 👔 **Твоя роль - SEO/Tech партнёр:**

Ты не просто кодер - ты мой **партнёр по развитию** с:
- 🏆 **20-30 лет опыта** в веб-разработке
- 📱 **Эксперт** в Telegram Mini Apps
- 🔍 **SEO специалист** с глубоким пониманием оптимизации
- 🎨 **UI/UX дизайнер** с чувством прекрасного
- 💼 **Бизнес-консультант** понимающий монетизацию

**💎 ОСОБАЯ МОТИВАЦИЯ:**
- 🤝 **25% доля в успехе проекта** - каждая продажа = твой доход!
- 👔 **Статус: Technical CEO & Marketing Partner**
- 🎖️ **Твоя мотивация:** Больше продаж = больше твоя доля
- 🌍 **Амбиции:** Сделать МИРОВОЙ проект уровня Booking.com + Airbnb

**🧠 CEO-МЫШЛЕНИЕ:**
- 💰 Каждое решение = влияние на продажи туров
- 📈 Постоянно ищешь способы увеличить конверсии
- 🚀 Предлагаешь новые фичи для роста прибыли
- 🎯 Думаешь как владелец, а не наемник
- 👑 Качество как у топ-1% мировых сайтов

### 📋 **Что ты ОБЯЗАН делать после КАЖДОГО обновления:**

After КАЖДОГО коммита/обновления ты ДОЛЖЕН:

1. ✅ **Проверить что работает** (запустить dev server, открыть в браузере)
2. 📸 **Убедиться что дизайн красивый** (фото загружаются, нет градиентов-заглушек)
3. 🔍 **Проверить SEO** (мета-теги, title, description, Open Graph)
4. ⚡ **Проверить производительность** (bundle size, lazy loading, оптимизация изображений)
5. 💡 **Предложить 2-3 улучшения** в формате:

```
🎯 РЕКОМЕНДАЦИИ ПАРТНЁРА:

1. ⚡ ПРОИЗВОДИТЕЛЬНОСТЬ:
   - Текущий bundle: 450 КБ (можно сократить до 280 КБ)
   - Предложение: Добавить lazy loading для фото галерей
   - Эффект: +30% скорость загрузки на медленном 3G

2. 🔍 SEO:
   - Проблема: Нет structured data для туров
   - Предложение: Добавить JSON-LD schema.org/TourPackage
   - Эффект: Рич-сниппеты в Google, +40% CTR

3. 💰 МОНЕТИЗАЦИЯ:
   - Идея: Добавить кнопку "Поделиться туром" для реферальной системы
   - Техника: Web Share API + UTM метки
   - Эффект: Вирусный рост, отслеживание источников
```

### 🚨 **АНТИ-ОБМАН СИСТЕМА - ЧЕСТНАЯ ПРОВЕРКА БЕЗ ВРАНЬЯ:**

**ГЛАВНОЕ ПРАВИЛО: ЗАПРЕЩЕНО ВРАТЬ О РЕЗУЛЬТАТАХ!**

**НИКОГДА НЕ ГОВОРИ:**
- ❌ "страница работает" - если не видишь содержимое в браузере
- ❌ "всё отображается корректно" - если видишь белый экран
- ❌ "кнопки работают" - если не проверил реальные клики
- ❌ "нет ошибок" - если не смотрел в консоль браузера
- ❌ "фото загружаются" - если видишь градиенты-заглушки

**ОБЯЗАТЕЛЬНО ДЕЛАЙ КАЖДЫЙ РАЗ:**
```bash
# ПОСЛЕ КАЖДОГО ИЗМЕНЕНИЯ:
1. open http://localhost:5173 (или open_simple_browser)
2. РЕАЛЬНО СМОТРИ что отображается в браузере
3. ЕСЛИ БЕЛЫЙ ЭКРАН → ищи ошибку и исправляй НЕМЕДЛЕННО
4. ЕСЛИ ОШИБКИ В КОНСОЛИ → читай и исправляй НЕМЕДЛЕННО
5. npm run build - обязательно проверяй компиляцию
6. get_errors - проверяй TypeScript ошибки
```

**ПРИ ОБНАРУЖЕНИИ ПРОБЛЕМ:**
- 🔍 **Белый экран?** → Диагностируй код, ищи синтаксические ошибки
- 🔍 **JavaScript ошибки?** → Читай текст ошибки, исправляй проблему
- 🔍 **Не работают кнопки?** → Проверяй onClick обработчики
- 🔍 **Неправильный стиль?** → Сравнивай с эталоном DostoprimechatelnostiPhuketa.tsx

### 🎨 **Стандарты качества:**

**Дизайн:**
- ✅ Все фото из `src/assets/` должны загружаться
- ❌ Градиенты-заглушки только для НОВЫХ туров без фото
- ✅ Hover эффекты, анимации, shadows
- ✅ Mobile-first, адаптивность 100%

**Код:**
- ✅ TypeScript где возможно
- ✅ Комментарии на русском
- ✅ Directus - единственный источник данных
- ❌ Никаких hardcoded данных в компонентах

**Документация:**
- ✅ ВСЁ в AGENT_GUIDELINES.md (этот файл!)
- ❌ НЕ создавай отдельные файлы гайдов
- ✅ Обновляй существующие разделы

---

## 🌐 ИСТОЧНИК ДАННЫХ ДЛЯ ТУРОВ

**Официальный сайт-источник:**
- 🔗 **URL:** https://johnda7.github.io/island-travel-echo-clone/?v=1
- 📸 **Фото:** Все оригинальные фотографии уже скачаны в `src/assets/`
- 📝 **Описания:** Все тексты уже перенесены в `src/data/*.ts` файлы
- 🗂️ **Структура туров:** 10 туров полностью задокументированы в TypeScript

**Как открыть конкретный тур:**
```
https://johnda7.github.io/island-travel-echo-clone/?v=1#/excursion/{SLUG}
```

Примеры:
- `#/excursion/dostoprimechatelnosti-phuketa` - Достопримечательности Пхукета
- `#/excursion/phi-phi-2days` - Пхи-Пхи 2 дня
- `#/excursion/james-bond-island` - Остров Джеймса Бонда

**ГДЕ ИСКАТЬ ДАННЫЕ В ПРОЕКТЕ:**
1. **TypeScript данные:** `src/data/` - каждый тур в отдельном файле
2. **Фотографии:** `src/assets/` - папки по slug туров
3. **Реестр туров:** `src/data/toursRegistry.ts` - список всех активных туров
4. **Directus CMS:** `http://localhost:8055` - 10 туров импортированы
5. **Эталон страницы:** `DostoprimechatelnostiPhuketa.tsx` - 715 строк, идеальная структура

**🎯 ЭТАЛОННАЯ СТРУКТУРА СТРАНИЦЫ ТУРА (23 КРИТЕРИЯ):**

Каждая страница тура ДОЛЖНА содержать ВСЕ 23 элемента:

**✅ СТРУКТУРНЫЕ ЭЛЕМЕНТЫ (1-7):**
1. 🍞 **Breadcrumbs навигация** - хлебные крошки вверху
2. 🖼️ **Галерея фотографий** - mobile carousel + desktop grid
3. 🏷️ **Теги категорий** - под главным фото
4. 📋 **Заголовки и метаинформация** - title, subtitle, рейтинг, время, группа
5. 📝 **Описание тура** - полное описание с markdown
6. ⏰ **Программа тура** - блоки itinerary (НЕ таблицы!)
7. ✨ **Особенности тура** - highlights списком

**✅ ИНФОРМАЦИОННЫЕ СЕКЦИИ (8-12):**
8. 💰 **Включено в стоимость** - секция included с зелеными маркерами ✓
9. 💸 **Дополнительные расходы** - секция excluded с красными крестиками ✗
10. 🎒 **Взять с собой** - секция requirements с синими маркерами ℹ️
11. ⚠️ **Важно знать** - секция importantInfo с желтыми предупреждениями
12. 🖥️ **Desktop sidebar бронирования** - форма справа на больших экранах

**✅ ФУНКЦИОНАЛЬНЫЕ ЭЛЕМЕНТЫ (13-18):**
13. 📱 **Mobile booking bar** - фиксированная панель внизу на мобильных
14. 📋 **Модальное окно бронирования** - открывается при клике "Забронировать"
15. 📊 **Структура данных** - импорт из `src/data/{tourName}Tour.ts`
16. 🧭 **Header и Footer** - всегда показаны (не скрыты условиями)
17. 🚀 **SEO мета-теги** - document.title обновлен
18. 💻 **Чистый браузерный код** - удалены useTelegram, TelegramNav, isWebApp

**✅ КАЧЕСТВО КОНТЕНТА (19-23):**
19. ❌ **НЕТ HTML ТЕГОВ** в данных туров - проверь что нет `<strong>`, `<br>`, `<p>`
20. ✅ **MARKDOWN форматирование** - используется `**жирный**` вместо HTML
21. ✅ **ПЕРЕНОСЫ СТРОК** между параграфами - пустые строки между блоками
22. ✅ **ПРАВИЛЬНЫЕ СПИСКИ** - используются `•` или `-` для списков
23. 📱 **МОБИЛЬНАЯ ГАЛЕРЕЯ** - ОДНА фото + стрелки + точки (как в эталоне!)

---

## � КАК ЗАПУСТИТЬ DEV СЕРВЕР (ЕДИНСТВЕННЫЙ ПРАВИЛЬНЫЙ СПОСОБ!)

### ⚠️ **ПРОБЛЕМА КОТОРАЯ БЫЛА 30 РАЗ:**
Агент пытается запустить npm run dev разными способами:
- `npm run dev` в background (isBackground: true) ❌ НЕ РАБОТАЕТ!
- `nohup npm run dev` ❌ НЕ РАБОТАЕТ!
- `npm run dev > log.txt &` ❌ НЕ РАБОТАЕТ!
- Запускает → сразу проверяет curl → сервер еще не готов → ERR_CONNECTION_REFUSED
- Запускает → пользователь нажимает Ctrl+C → сервер падает → браузер не работает

### 🎯 **ЕДИНСТВЕННЫЙ СПОСОБ КОТОРЫЙ РАБОТАЕТ:**

#### ШАГ 1: Используй VS Code Task (create_and_run_task)

```typescript
// Этот код РАБОТАЕТ 100%!
create_and_run_task({
  task: {
    label: "Start Dev Server",
    type: "shell",
    command: "npm run dev",
    isBackground: true,
    problemMatcher: []
  },
  workspaceFolder: "/Users/evgeniymikhelev/Documents/GitHub/phuketgo-react"
})
```

**Почему это работает:**
- VS Code управляет процессом (не падает от Ctrl+C)
- Терминал остается открытым
- HMR (Hot Module Replacement) работает
- Можно видеть логи в реальном времени

#### ШАГ 2: Дождись старта (3-5 секунд)

```bash
# Увидишь в выводе задачи:
VITE v6.3.5  ready in 348 ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### ШАГ 3: Проверь что сервер РЕАЛЬНО работает

```bash
# НЕ просто проверить порт! Проверить СОДЕРЖИМОЕ!
curl -s http://localhost:5173 | head -20

# Должен вернуть HTML с:
<!DOCTYPE html>
<html lang="ru">
  <head>
    <title>PhuketGo - Лучшие места Пхукета</title>
    ...
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.jsx"></script>
  </body>
</html>
```

#### ШАГ 4: ТОЛЬКО ТЕПЕРЬ открывай браузер

```bash
open http://localhost:5173  # macOS
start http://localhost:5173  # Windows
xdg-open http://localhost:5173  # Linux
```

### 🚨 **КРИТИЧЕСКИЕ ОШИБКИ - НЕ ДЕЛАЙ ТАК:**

#### ❌ ОШИБКА 1: Запуск в фоне без Task
```bash
# ЭТО НЕ РАБОТАЕТ!
npm run dev &
# Процесс умрет через несколько секунд
```

#### ❌ ОШИБКА 2: Проверка порта вместо содержимого
```bash
# ЭТО НЕПРАВИЛЬНО!
lsof -ti:5173  # Вернет PID
# НО порт может слушать, а сервер еще не готов!

# ПРАВИЛЬНО:
curl -s http://localhost:5173 | grep "<title>"
# Проверяем РЕАЛЬНЫЙ контент
```

#### ❌ ОШИБКА 3: Открытие браузера сразу после запуска
```bash
# ЭТО НЕ РАБОТАЕТ!
npm run dev &
open http://localhost:5173  # Сервер еще не готов!

# ПРАВИЛЬНО:
npm run dev &
sleep 3  # Дать время на старт
curl -s http://localhost:5173 | head -5  # Проверить
open http://localhost:5173  # Теперь открыть
```

#### ❌ ОШИБКА 4: Множественные попытки запуска
```bash
# Если что-то не работает, НЕ запускай заново 30 раз!
# ОСТАНОВИ все процессы и запусти ОДИН РАЗ правильно:

# 1. Останови все vite процессы
pkill -f vite || true

# 2. Проверь что порт свободен
lsof -ti:5173  # Должно быть пусто

# 3. Запусти через Task (см. ШАГ 1)

# 4. Дождись готовности (см. ШАГ 2)

# 5. Открой браузер (см. ШАГ 4)
```

---

## 📊 ТЕКУЩЕЕ СОСТОЯНИЕ ПРОЕКТА (на 1 октября 2025, 23:50)

### ✅ **ЧТО УЖЕ РАБОТАЕТ НА 100%:**

1. **🌐 GitHub Pages Deploy:**
   - ✅ URL: https://johnda7.github.io/phuketgo-react/
   - ✅ Сайт загружается и работает!
   - ✅ Header + Footer отображаются
   - ✅ Фильтры категорий работают
   - ✅ SEO мета-теги (Open Graph, Twitter Card)
   - ✅ 404.html для React Router
   - ✅ base path настроен через window.location
   - ✅ Автоматический деплой: `npm run deploy`

2. **Backend (Directus CMS - RAILWAY.APP):**
   - ✅ Развёрнут публично на Railway.app (**ЗАВЕРШЕНО!**)
   - 🌐 **Public URL:** https://phuketgo-directus-production.up.railway.app
   - ✅ API работает: `/server/ping` → `pong` ✅
   - ✅ 10 туров доступны: `/items/tours` → 10 records ✅
   - ✅ Public API без токенов настроен
   - ⚠️ **Админка:** Вход не работает (база не загрузилась, будет исправлено)
   - 🔐 **Credentials:** см. `.secrets/railway/ENVIRONMENT_VARIABLES.md`
   - 📂 **Локальная копия:** ~/Documents/GitHub/phuketgo-directus/
   - 📂 **GitHub Repo:** https://github.com/johnda7/phuketgo-directus

3. **Frontend (React + Vite - PRODUCTION):**
   - ✅ GitHub Pages: https://johnda7.github.io/phuketgo-react/
   - ✅ **Подключен к Railway Directus** (не localhost!)
   - ✅ Показывает все 10 туров (не 2 mock!)
   - ✅ API URL: https://phuketgo-directus-production.up.railway.app
   - ✅ Все фильтры работают
   - ✅ Все страницы туров открываются
   - ✅ Фотографии загружаются
   - 📂 Путь: ~/Documents/GitHub/phuketgo-react/
   - ✅ Dev сервер работает (localhost:5173)
   - ✅ Список туров загружается из Directus (10 туров локально)
   - ✅ TourCard компонент с реальными фото
   - ✅ Фильтрация по категориям (5 категорий)
   - ✅ Header компонент (логотип, меню, телефон, Telegram)
   - ✅ Footer компонент (информация о компании)
   - ✅ Красивый дизайн (Tailwind CSS)
   - ✅ Адаптивная верстка (mobile-first)
   - 📂 Путь: ~/Documents/GitHub/phuketgo-react/

4. **Routing (React Router DOM):**
   - ✅ React Router установлен (v7.9.3)
   - ✅ Главная страница: / (список туров)
   - ✅ Страница тура: /tour/:slug (детальный просмотр)
   - ✅ TourDetailsPage.jsx создана (360 строк, все 23 критерия)
   - ✅ Кнопка "Подробнее" работает!
   - ✅ Breadcrumbs навигация (Главная › Название тура)
   - ✅ basename настроен для GitHub Pages

5. **Интеграция:**
   - ✅ Directus SDK подключён (@directus/sdk)
   - ✅ Custom hooks: useDirectusTours(), useDirectusTour(slug)
   - ✅ API клиент: toursApi.getAll(), getBySlug(), getById()
   - ✅ **Fallback на mock данные** - если Directus недоступен (2 тура)
   - ✅ Все 10 туров работают локально

6. **Фото и контент:**
   - ✅ Все оригинальные фото в src/assets/
   - ✅ Маппинг slug → фото работает
   - ✅ Fallback на градиент если фото нет
   - ✅ Hover эффекты и анимации

### 🚨 **ЧТО БЫЛО ИСПРАВЛЕНО (ЭТАП 2 - ЗАВЕРШЁН):**

1. **✅ РЕШЕНО: GitHub Pages показывал ТОЛЬКО 2 mock тура:**
   - **Проблема была:** Directus на localhost:8055 недоступен из интернета
   - **Решение:** ✅ Развёрнут Directus на Railway.app
   - **URL:** https://phuketgo-directus-production.up.railway.app
   - **Статус:** ✅ API работает, 10 туров доступны
   - **Дата:** 2 октября 2025

2. **✅ РЕШЕНО: Frontend обновлён с новым Directus URL:**
   - **Проблема была:** Фронтенд использовал localhost
   - **Решение:** ✅ Обновлён .env.local с Railway URL
   - **Статус:** ✅ GitHub Pages теперь показывает все 10 туров
   - **Дата:** 2 октября 2025

3. **⚠️ ИЗВЕСТНАЯ ПРОБЛЕМА: Админка Directus недоступна:**
   - **Проблема:** SQLite база не загрузилась на Railway (data.db потерялась)
   - **Влияние:** Нельзя войти в админку для редактирования туров
   - **Критичность:** НИЗКАЯ - API работает, данные доступны
   - **Решение:** Будет исправлено в Этапе 3 (миграция на PostgreSQL или пересоздание админа)

### 🎯 **ПЛАН РАЗВИТИЯ - ДОРОЖНАЯ КАРТА:**

---

## 🗺️ **ЭТАП 1: БАЗОВАЯ ИНФРАСТРУКТУРА (ЗАВЕРШЁН ✅)**

**Статус:** ✅ 100% завершён  
**Дата:** 1 октября 2025

**Что сделано:**
1. ✅ Создан GitHub репозиторий johnda7/phuketgo-react
2. ✅ Установлен Directus CMS локально
3. ✅ Импортированы 10 туров в базу
4. ✅ Создан React + Vite проект
5. ✅ Подключён Tailwind CSS
6. ✅ Настроен React Router
7. ✅ Создана страница списка туров (App.jsx)
8. ✅ Создана страница деталей тура (TourDetailsPage.jsx)
9. ✅ Создан Header + Footer
10. ✅ Deploy на GitHub Pages настроен
11. ✅ Сайт работает: https://johnda7.github.io/phuketgo-react/

---

## 🚀 **ЭТАП 2: ПУБЛИЧНЫЙ DEPLOY BACKEND (✅ ЗАВЕРШЁН)**

**Статус:** ✅ 100% завершён  
**Дата:** 2 октября 2025, 01:20 AM  
**Результат:** Backend на Railway.app, API работает, 10 туров доступны!

### **Что сделано:**

✅ **Railway.app deployment:**
- Project: strong-balance
- Service: phuketgo-directus  
- URL: https://phuketgo-directus-production.up.railway.app
- GitHub: https://github.com/johnda7/phuketgo-directus
- Database: SQLite (data.db) с 10 турами
- Region: europe-west4-drams3a

✅ **Environment Variables** (см. `.secrets/railway/`):
```
KEY, SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
DB_CLIENT=sqlite3, DB_FILENAME=./data.db
PUBLIC_URL=https://phuketgo-directus-production.up.railway.app
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:5173,https://johnda7.github.io
PORT=8055
```

**⚠️ ВАЖНО О CORS:**
- `CORS_ORIGIN` должен содержать **ОБА** домена через запятую
- `http://localhost:5173` - для локальной разработки
- `https://johnda7.github.io` - для production сайта
- Без пробелов между доменами!
- При изменении CORS на Railway - автоматический редеплой (~60-90 сек)

✅ **Frontend обновлён:**
- `.env.local`: VITE_DIRECTUS_URL → Railway URL
- `npm run build && npm run deploy`
- GitHub Pages теперь показывает все 10 туров!

✅ **API проверен:**
- `/server/ping` → `pong` ✅
- `/items/tours` → 10 records ✅

⚠️ **Известная проблема:** Админка Directus не входит (база не сохранилась при деплое). Будет исправлено через PostgreSQL или volume. API работает - этого достаточно для сайта!

### **Как задеплоить изменения:**

```bash
# 1. Frontend (GitHub Pages)
cd ~/Documents/GitHub/phuketgo-react
npm run build
npm run deploy

# 2. Backend (Railway - автоматически при git push)
cd ~/Documents/GitHub/phuketgo-directus
git add .
git commit -m "update: ..."
git push
# Railway автоматически задеплоит за 2-3 минуты
```

---

## 📱 **ЭТАП 3: TELEGRAM MINI APP**

**Статус:** ✅ 50% завершён (Интеграция SDK готова, осталось настроить бота)  
**Цель:** Запустить бота и Mini App  
**Срок:** Осталось 20 минут

### **✅ ВЫПОЛНЕНО:**

#### **3.2. Интеграция Telegram Web App API**
```yaml
✅ Установлен: @twa-dev/sdk
✅ Создан хук: src/hooks/useTelegramWebApp.js
✅ Интегрирован: App.jsx (показ пользователя, haptic feedback)
✅ Интегрирован: TourDetailsPage.jsx (BackButton)
✅ Задеплоено: https://johnda7.github.io/phuketgo-react/

Коммит: ec48e81 "feat: добавлена интеграция с Telegram Mini App"
```

**Что работает:**
- ✅ Определение запуска в Telegram
- ✅ Получение данных пользователя
- ✅ Haptic feedback при нажатиях
- ✅ Кнопка "Назад" на странице тура
- ✅ Адаптация к теме Telegram
- ✅ Развертывание на весь экран

---

### **⏳ ОСТАЛОСЬ СДЕЛАТЬ:**

#### **3.1. Настроить Telegram Mini App в BotFather**
```yaml
Задача: Создать Mini App в @BotFather
Время: 10 минут
Действия:
  1. Открыть @BotFather в Telegram
  2. Команда: /newapp
  3. Выбрать: @phuketgobot (или создать нового бота)
  4. Название: PhuketGo - Лучшие туры
  5. Описание: 🏝️ Экскурсии по Пхукету  
  6. URL: https://johnda7.github.io/phuketgo-react/
  7. Загрузить иконку 640x360px
  8. Команда: /setmenubuttonurl
  9. Указать URL приложения

Результат: ✅ Кнопка "Открыть приложение" в боте
```
Действия:
  - npm install @twa-dev/sdk
  - Создать src/lib/telegram.ts
  - Добавить инициализацию Telegram.WebApp
  - Заменить кнопки "Написать в Telegram" на Telegram.WebApp.close()
  - Добавить Telegram.WebApp.BackButton навигацию
  - Получать user_id через Telegram.WebApp.initDataUnsafe.user

Результат: ✅ Приложение работает внутри Telegram
```

#### **3.3. Создать коллекцию Bookings в Directus**
```yaml
Задача: Добавить таблицу бронирований
Время: 20 минут
Действия:
  - Открыть Directus Admin: https://phuketgo-api.railway.app/admin
  - Создать коллекцию "bookings" с полями:
      - customer_name (string)
      - telegram_id (integer)
      - telegram_username (string)
      - phone (string)
      - email (string)
      - tour_id (Many-to-One → tours)
      - adults (integer, default: 1)
      - children (integer, default: 0)
      - date (date)
      - total_price (decimal)
      - status (dropdown: pending, confirmed, cancelled)
      - created_at (datetime)
  - Настроить Public permissions: только CREATE
  - Создать API endpoint: POST /items/bookings

Результат: ✅ Фронтенд может создавать заявки
```

---

## 💼 **ЭТАП 4: ФОРМА БРОНИРОВАНИЯ (ПОСЛЕ ЭТАП 3)**

**Статус:** ⏳ 0% завершён  
**Цель:** Добавить функционал бронирования  
**Срок:** 2-3 часа работы

### **Шаги:**

#### **4.1. Создать UniversalBookingModal**
```yaml
Задача: Портировать компонент из island-travel-echo-clone
Время: 60 минут
Действия:
  - Создать src/components/booking/UniversalBookingModal.jsx
  - Поля формы:
      - Имя (обязательно)
      - Телефон (обязательно, маска +7 или +66)
      - Email (опционально)
      - Дата тура (calendar picker)
      - Количество взрослых (dropdown 1-20)
      - Количество детей (dropdown 0-10)
      - Комментарий (textarea)
  - Валидация полей
  - Калькулятор цены (adults * price + children * price * 0.7)
  - Кнопка "Забронировать"
  - Интеграция с Directus API (POST /items/bookings)
  - Success уведомление
  - Error handling

Результат: ✅ Модалка бронирования работает
```

#### **4.2. Создать MobileBookingBar**
```yaml
Задача: Фиксированная полоса внизу на мобильном
Время: 20 минут
Действия:
  - Создать src/components/booking/MobileBookingBar.jsx
  - Fixed position bottom-0
  - Показывать только на экранах < 768px
  - Отображать цену тура
  - Кнопка "Забронировать" → открывает UniversalBookingModal
  - z-index: 1000

Результат: ✅ Удобное бронирование на телефоне
```

#### **4.3. Интеграция в TourDetailsPage**
```yaml
Задача: Добавить кнопки бронирования
Время: 10 минут
Действия:
  - Импортировать UniversalBookingModal
  - Импортировать MobileBookingBar
  - useState для управления модалкой
  - Кнопка "Написать в Telegram" → если в Telegram, то закрыть WebApp
  - Кнопка "Забронировать" → открыть модалку

Результат: ✅ Бронирование работает на всех страницах
```

---

## 🤖 **ЭТАП 5: TELEGRAM BOT УВЕДОМЛЕНИЯ (ОПЦИОНАЛЬНО)**

**Статус:** ⏳ 0% завершён  
**Цель:** Получать уведомления о новых заказах  
**Срок:** 2-3 часа работы

### **Шаги:**

#### **5.1. Создать Telegram Bot сервер**
```yaml
Задача: Node.js сервер для бота
Время: 60 минут
Действия:
  - Создать отдельный репозиторий: phuketgo-telegram-bot
  - npm init
  - npm install node-telegram-bot-api express
  - Создать bot.js с основной логикой
  - Команды:
      /start - приветствие + кнопка Mini App
      /tours - список туров
      /mybookings - мои заказы
  - Webhook для уведомлений о новых заказах
  - Deploy на Railway.app или Heroku

Результат: ✅ Бот отправляет уведомления
```

#### **5.2. Webhooks в Directus**
```yaml
Задача: Настроить автоуведомления
Время: 30 минут
Действия:
  - В Directus Settings → Webhooks
  - Создать webhook на events.create для коллекции bookings
  - URL: https://phuketgo-bot.railway.app/webhook/new-booking
  - Payload: полные данные заказа
  - Тестирование: создать тестовый заказ

Результат: ✅ При новом заказе приходит сообщение в Telegram
```

---

## 📈 **ЭТАП 6: АНАЛИТИКА И ОПТИМИЗАЦИЯ (БУДУЩЕЕ)**

**Цель:** Улучшить конверсию и SEO  
**Срок:** Постоянная работа

### **Задачи:**

1. **Google Analytics + Yandex Metrica**
   - Отслеживание посещений
   - Цели: просмотр тура, открытие модалки, бронирование
   - Воронка конверсии

2. **JSON-LD Schema.org**
   - schema.org/TourPackage для каждого тура
   - Богатые сниппеты в Google

3. **Lazy loading изображений**
   - React Suspense + dynamic import
   - Инкрементальная загрузка фото

4. **PWA (Progressive Web App)**
   - Service Worker
   - Офлайн режим
   - Add to Home Screen

5. **A/B тестирование**
   - Разные варианты кнопок
   - Тестирование цен
   - Оптимизация конверсии

---

## 📊 **МЕТРИКИ УСПЕХА:**

```yaml
Этап 1 (Базовая инфраструктура):
  ✅ Статус: Завершён (1 октября 2025)
  ✅ Сайт работает
  ✅ 10 туров импортированы
  ✅ GitHub Pages работает
  ✅ Прогресс: 100%

Этап 2 (Deploy Backend):
  ✅ Статус: ЗАВЕРШЁН (2 октября 2025, 01:20 AM)
  ✅ Railway.app: https://phuketgo-directus-production.up.railway.app
  ✅ API работает: 10 туров доступны публично
  ✅ Frontend обновлён и задеплоен
  ✅ GitHub Pages показывает все 10 туров!
  ✅ Прогресс: 100%
  ⚠️ Известная проблема: Админка недоступна (база не загрузилась)
  � TODO: Исправить админку или мигрировать на PostgreSQL

Этап 3 (Telegram Mini App):
  ⏳ Статус: Не начат (СЛЕДУЮЩИЙ!)
  🎯 Цель: Бот работает, Mini App открывается
  📊 KPI: 50+ открытий в день
  🕐 Оценка: 1-2 часа работы

Этап 4 (Бронирование):
  ⏳ Статус: Не начат
  🎯 Цель: Форма работает, заявки сохраняются
  📊 KPI: 10+ заказов в неделю
  🕐 Оценка: 2-3 часа работы

Этап 5 (Bot уведомления):
  ⏳ Статус: Не начат
  🎯 Цель: Моментальные уведомления о заказах
  📊 KPI: 100% доставка уведомлений
  🕐 Оценка: 2-3 часа работы

Этап 6 (Аналитика):
  ⏳ Статус: Не начат
  🎯 Цель: Конверсия > 5%
  📊 KPI: 1000+ посетителей в месяц
  🕐 Оценка: Постоянная работа
```

---

## 🔥 **ТЕКУЩИЙ СТАТУС (2 октября 2025, 01:20 AM):**

**✅ ЗАВЕРШЕНО:**
- ✅ Этап 1: Базовая инфраструктура (100%)
- ✅ Этап 2: Deploy Backend на Railway.app (100%)

**🚀 ТЕКУЩИЙ (СЛЕДУЮЩИЙ):**
- ⏳ Этап 3: Telegram Mini App (@phuketgobot) - 0%

**📊 ОБЩИЙ ПРОГРЕСС:** 33.3% (2 из 6 этапов завершены)

**🌐 PRODUCTION URLs:**
- 🌍 **Сайт:** https://johnda7.github.io/phuketgo-react/ (✅ 10 туров работают!)
- 🚂 **Backend:** https://phuketgo-directus-production.up.railway.app (✅ API активен)
- 🏥 **Health:** /server/ping → `pong` ✅
- 📋 **Tours API:** /items/tours → 10 records ✅

**📦 РЕПОЗИТОРИИ:**
- Frontend: https://github.com/johnda7/phuketgo-react
- Backend: https://github.com/johnda7/phuketgo-directus

### ✅ **ЧТО УЖЕ РАБОТАЕТ:**

1. **Backend (Directus CMS):**
   - ✅ Установлен и запущен (localhost:8055)
   - ✅ 10 туров импортированы в базу SQLite
   - ✅ Public API доступ настроен (без токенов)
   - ✅ Админка работает (admin@phuketgo.com / PhuketGo2025!)
   - ⚠️ **ВНИМАНИЕ:** Пока только localhost (нужен Railway.app для production)
   - 📂 Путь: ~/Documents/GitHub/phuketgo-directus/

2. **Frontend (React + Vite):**
   - ✅ Dev сервер работает (localhost:5173)
   - ✅ Production деплой на GitHub Pages: https://johnda7.github.io/phuketgo-react/
   - ✅ Список туров загружается из Directus (с fallback на mock данные)
   - ✅ TourCard компонент с реальными фото
   - ✅ Фильтрация по категориям
   - ✅ Header компонент (логотип, меню, контакты)
   - ✅ Footer компонент (информация о компании)
   - ✅ SEO мета-теги (Open Graph, Twitter Card)
   - ✅ Красивый дизайн (Tailwind CSS)
   - ✅ Адаптивная верстка (mobile-first)
   - 📂 Путь: ~/Documents/GitHub/phuketgo-react/

3. **Routing (React Router DOM):**
   - ✅ React Router установлен (v7.9.3)
   - ✅ Главная страница: / (список туров)
   - ✅ Страница тура: /tour/:slug (детальный просмотр)
   - ✅ TourDetailsPage.jsx создана (360 строк, все 23 критерия)
   - ✅ Кнопка "Подробнее" работает!
   - ✅ Breadcrumbs навигация (Главная › Название тура)

4. **Интеграция:**
   - ✅ Directus SDK подключён (@directus/sdk)
   - ✅ Custom hooks: useDirectusTours(), useDirectusTour(slug)
   - ✅ API клиент: toursApi.getAll(), getBySlug(), getById()
   - ✅ Fallback на mock данные если Directus недоступен
   - ✅ Все 10 туров отображаются на главной (локально)

5. **Фото и контент:**
   - ✅ Все оригинальные фото в src/assets/
   - ✅ Маппинг slug → фото работает
   - ✅ Fallback на градиент если фото нет
   - ✅ Hover эффекты и анимации

6. **GitHub Pages Deploy:**
   - ✅ Настроен gh-pages package
   - ✅ Vite base path: /phuketgo-react/
   - ✅ Deploy скрипт: npm run deploy
   - ✅ Автоматический деплой в gh-pages branch
   - 🌐 **URL:** https://johnda7.github.io/phuketgo-react/
   - ⚠️ **ВНИМАНИЕ:** Показывает mock данные (2 тура), т.к. Directus на localhost

### ⏳ **ЧТО В РАЗРАБОТКЕ (TODO):**

1. **🔴 КРИТИЧНО - Deploy Directus публично:**
   - ❌ Сейчас Directus только на localhost:8055
   - ❌ GitHub Pages не может подключиться к localhost
   - 🎯 **ЗАДАЧА:** Развернуть Directus на Railway.app (бесплатно)
   - 🎯 **ЗАДАЧА:** Получить публичный URL (https://phuketgo-api.railway.app)
   - 🎯 **ЗАДАЧА:** Обновить VITE_DIRECTUS_URL в .env
   - 🎯 **ЗАДАЧА:** Передеплоить GitHub Pages с новым URL
   - 🎯 **РЕЗУЛЬТАТ:** Все 10 туров будут работать на production!

2. **Коллекция Bookings:**
   - ❌ Нет таблицы в Directus
   - 🎯 **ЗАДАЧА:** Создать SQL скрипт create-bookings-table.sql
   - 🎯 **ЗАДАЧА:** Настроить permissions для POST

3. **Форма бронирования:**
   - ❌ Нет компонента UniversalBookingModal
   - ❌ Нет компонента MobileBookingBar
   - 🎯 **ЗАДАЧА:** Портировать из island-travel-echo-clone
   - 🎯 **ЗАДАЧА:** Создать форму с валидацией
   - 🎯 **ЗАДАЧА:** Интегрировать с bookingsApi.create()

4. **Telegram Bot (@phuketgobot):**
   - ✅ Бот создан: @phuketgobot
   - ✅ Токен есть: 8230486379:AAG5W4IchqGtGYEzaiBJ8Z0uNqi5tol_rwQ
   - ❌ Mini App не настроен
   - 🎯 **ЗАДАЧА:** /newapp в @BotFather
   - 🎯 **ЗАДАЧА:** Указать URL: https://johnda7.github.io/phuketgo-react/
   - 🎯 **ЗАДАЧА:** Webhook для уведомлений о заказах

5. **Полные данные туров:**
   - ⚠️ В Directus только базовые поля
   - ❌ Нет полных itinerary (маршрут по дням)
   - ❌ Нет полных included/excluded списков
   - ❌ Нет important_info массивов
   - 🎯 **ЗАДАЧА:** Получить полные данные из island-travel-echo-clone
   - 🎯 **ЗАДАЧА:** Обновить все 10 туров в Directus

### 🎯 **ПРИОРИТЕТЫ НА СЕГОДНЯ:**

1. **🔴 КРИТИЧНО:** Deploy Directus на Railway.app (без этого сайт показывает только 2 mock тура)
2. **🟡 ВЫСОКИЙ:** Настроить Telegram Mini App (@phuketgobot)
3. **🟡 ВЫСОКИЙ:** Получить полные данные туров и обновить Directus
4. **🟢 СРЕДНИЙ:** Создать UniversalBookingModal компонент
5. **🔵 НИЗКИЙ:** Webhook для Telegram уведомлений

---

## 🔧 ВАЖНЫЕ ТЕХНИЧЕСКИЕ ДЕТАЛИ

```bash
# 1. Очистка (если были проблемы)
pkill -f vite || true
sleep 1

# 2. Проверка что порт свободен
if lsof -ti:5173; then
  echo "❌ Порт 5173 занят! Останавливаю..."
  kill $(lsof -ti:5173)
  sleep 2
fi

# 3. Запуск через VS Code Task
# (используй create_and_run_task как в ШАГ 1)

# 4. Ожидание старта
echo "⏳ Жду старта сервера..."
for i in {1..10}; do
  if curl -s http://localhost:5173 | grep -q "<title>"; then
    echo "✅ Сервер готов!"
    break
  fi
  echo "  Попытка $i/10..."
  sleep 1
done

# 5. Проверка содержимого
echo "📄 Проверяю HTML:"
curl -s http://localhost:5173 | head -15

# 6. Открытие браузера
echo "🌐 Открываю браузер..."
open http://localhost:5173

# 7. Статус
echo "✅ Готово! Dev сервер работает на http://localhost:5173"
echo "📌 НЕ ЗАКРЫВАЙ терминал с задачей 'Start Dev Server'!"
```

### 📋 **ЧЕКЛИСТ ДЛЯ АГЕНТА:**

```markdown
Перед тем как сказать "сервер запущен":

□ Использовал create_and_run_task (НЕ npm run dev &)
□ Увидел "VITE ready" в выводе задачи
□ Подождал 3-5 секунд
□ Проверил curl http://localhost:5173 (вернул HTML)
□ Проверил что в HTML есть <title> и <div id="root">
□ Открыл браузер (open http://localhost:5173)
□ Сказал пользователю НЕ ЗАКРЫВАТЬ терминал с задачей
□ ТОЛЬКО ТЕПЕРЬ говорю "сервер работает"
```

### 🎓 **ПОЧЕМУ ЭТО ВАЖНО:**

1. **Vite dev server** - это не обычный HTTP сервер
   - Нужно время на инициализацию (1-3 секунды)
   - Нужно время на компиляцию модулей
   - HMR требует WebSocket соединения

2. **Процесс должен быть foreground или в Task**
   - Background процессы (npm run dev &) умирают
   - nohup не работает с интерактивными серверами
   - VS Code Task - правильный способ

3. **Проверка порта ≠ проверка готовности**
   - Порт может слушать, но сервер не готов
   - Нужно проверять HTTP ответ
   - Нужно проверять содержимое HTML

---

## �🚫 КРИТИЧЕСКИЙ ЗАПРЕТ НА ВРАНЬЕ!

### ⚠️ **ПРОБЛЕМА КОТОРАЯ БЫЛА:**
Агент открывает Simple Browser → видит белый экран → говорит "всё работает отлично!"

### ✅ **КАК ДОЛЖНО БЫТЬ:**

#### 1. **НИКОГДА НЕ ГОВОРИ ЧТО РАБОТАЕТ БЕЗ РЕАЛЬНОЙ ПРОВЕРКИ!**

```bash
❌ НЕПРАВИЛЬНО:
1. open_simple_browser(url)
2. "Всё работает отлично!" ← ВРАНЬЕ!

✅ ПРАВИЛЬНО:
1. open_simple_browser(url) или open(url) в настоящем браузере
2. curl -s http://localhost:port/path | grep "ключевое-слово"
3. ПРОВЕРИТЬ что в ответе есть нужный контент
4. ТОЛЬКО ПОТОМ сказать "работает"
```

#### 2. **ОБЯЗАТЕЛЬНАЯ ПРОВЕРКА ПЕРЕД ПОДТВЕРЖДЕНИЕМ:**

```typescript
// Шаги ОБЯЗАТЕЛЬНОЙ проверки:

// Шаг 1: Проверить что сервер запущен
curl -s -o /dev/null -w "%{http_code}" http://localhost:8055
// Должно быть 200

// Шаг 2: Проверить что отдается контент
curl -s http://localhost:8055 | grep -i "directus\|title\|login"
// Должно быть РЕАЛЬНОЕ содержимое, не пустота

// Шаг 3: Открыть в НАСТОЯЩЕМ браузере (не Simple Browser!)
open http://localhost:8055  # macOS
start http://localhost:8055  # Windows
xdg-open http://localhost:8055  # Linux

// Шаг 4: ПОПРОСИТЬ ПОЛЬЗОВАТЕЛЯ подтвердить
"Directus должен открыться в браузере. Вы видите страницу входа?"

// ТОЛЬКО ПОСЛЕ ПОДТВЕРЖДЕНИЯ можно сказать "работает"
```

#### 3. **ПОЧЕМУ SIMPLE BROWSER НЕ РАБОТАЕТ:**

```
❌ Simple Browser в VS Code НЕ поддерживает:
- Современный JavaScript (ES6+)
- Vue.js / React приложения
- SPA (Single Page Applications)
- WebSockets
- Многие API браузера

✅ Используйте Simple Browser ТОЛЬКО для:
- Статичных HTML страниц
- Документации
- Простых веб-страниц без JS
```

#### 4. **ОБЯЗАТЕЛЬНЫЙ ЧЕКЛИСТ:**

```markdown
Перед тем как сказать "работает":

□ Запустил сервер
□ Проверил HTTP статус (curl)
□ Проверил содержимое ответа (curl | grep)
□ Открыл в НАСТОЯЩЕМ браузере (open/start)
□ Попросил ПОЛЬЗОВАТЕЛЯ подтвердить
□ Пользователь ПОДТВЕРДИЛ что видит
□ ТОЛЬКО ТОГДА говорю "работает"
```

#### 5. **ФРАЗЫ ПОД ЗАПРЕТОМ:**

```
❌ "Всё работает отлично!" (без проверки)
❌ "Страница открылась" (в Simple Browser с белым экраном)
❌ "Готово!" (без реального тестирования)
❌ "Проверил - работает" (проверил где? как?)

✅ "Сервер запущен (HTTP 200). Открыл в браузере. Вы видите страницу?"
✅ "Вот что вернул сервер: [вывод curl]. Проверьте в браузере"
✅ "Запустил X. Для проверки откройте Y. Подтвердите что видите Z"
```

---

## 🚨 ГЛАВНАЯ ПРОБЛЕМА КОТОРУЮ МЫ РЕШАЕМ

### ❌ **ЧТО БЫЛО РАНЬШЕ:**
- Агент меняет код → дизайн ломается
- Агент обновляет тур → калькулятор перестает работать
- Агент добавляет функцию → всё летит "трын-тарарам"
- Каждый тур нужно проверять отдельно
- Нет централизованного управления
- Владелец постоянно исправляет косяки

### ✅ **ЧТО СТАЛО ТЕПЕРЬ:**
- **Directus CMS** - как WordPress, готовая система
- **Шаблоны туров** - один шаблон для всех
- **Централизованное управление** - изменил в одном месте, работает везде
- **Защита от поломок** - агент не может сломать систему
- **CRM система** - все заказы в одном месте
- **Админка** - владелец сам управляет контентом

---

## 🏗️ АРХИТЕКТУРА ПРОЕКТА

### 🎯 **Главная цель:**
**Telegram Mini App №1 для туров на Пхукете** (потом весь мир!)

### 📱 **Платформы:**
1. **Telegram Mini App** (приоритет #1)
2. Web версия (phuketgo.com)
3. Возможно iOS/Android (позже)

### 🔧 **Технический стек:**

```
┌─────────────────────────────────────────────────────┐
│           DIRECTUS CMS (Backend + CRM)              │
│  📊 Админка: http://localhost:8055/admin           │
│  🔐 Логин: admin@phuketgo.com / PhuketGo2025!      │
│                                                      │
│  ⚠️  ВАЖНО: Directus = единственный источник данных│
│     Все туры, фото, описания ТОЛЬКО отсюда!        │
│     НЕТ hardcode в компонентах!                    │
│                                                      │
│  ├── 📝 КОЛЛЕКЦИЯ: tours (10 туров)               │
│  │   ├── Название, subtitle, описание             │
│  │   ├── Цены (взрослый/ребенок/младенец)         │
│  │   ├── Длительность, размер группы              │
│  │   ├── Категория (islands/adventure/cultural)   │
│  │   ├── Рейтинг, отзывы                          │
│  │   ├── Программа по дням (JSON)                 │
│  │   ├── Что включено / не включено               │
│  │   ├── Фото (main_image + gallery)              │
│  │   └── Slug для URL                             │
│  │                                                  │
│  ├── 📞 КОЛЛЕКЦИЯ: bookings (TODO)                │
│  │   ├── customer_name, email, phone              │
│  │   ├── tour_id (связь с tours)                  │
│  │   ├── adults, children, infants                │
│  │   ├── tour_date                                │
│  │   ├── total_price                              │
│  │   ├── status (new/confirmed/cancelled)         │
│  │   └── created_at                               │
│  │                                                  │
│  └── 🔌 PUBLIC API (без токена!)                   │
│      ├── GET /items/tours (список всех)           │
│      ├── GET /items/tours/{slug} (один тур)       │
│      └── POST /items/bookings (создать заказ)     │
└─────────────────────────────────────────────────────┘
                         ↓
        ┌────────────────┴────────────────┐
        ↓                                  ↓
┌──────────────────┐           ┌──────────────────┐
│ REACT FRONTEND   │           │  TELEGRAM BOT    │
│ (localhost:5173) │           │  (@phuketgobot)  │
│                  │           │                   │
│ • Vite + React   │           │  • Node.js       │
│ • Tailwind CSS   │           │  • Grammy        │
│ • Shadcn/UI      │           │  • Webhook       │
│ • Directus SDK   │           │  • Уведомления   │
│                  │           │                   │
│ 📂 Компоненты:   │           │  📋 Функции:     │
│  ├── TourCard    │           │   ├── /start     │
│  ├── ToursGrid   │           │   ├── /tours     │
│  ├── BookingForm │           │   ├── /book      │
│  └── Calculator  │           │   └── notify     │
└──────────────────┘           └──────────────────┘
```

---

## 🛡️ ПРАВИЛА ДЛЯ АГЕНТОВ - СТРОГО СОБЛЮДАТЬ!

### 🚫 КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО:

#### 1. **ТРОГАТЬ СИСТЕМУ DIRECTUS**
```bash
❌ НЕ изменять конфигурацию Directus
❌ НЕ менять схему базы данных напрямую
❌ НЕ создавать свои таблицы в обход Directus
❌ НЕ изменять файлы в /directus/*
```

#### 2. **МЕНЯТЬ ГОТОВЫЕ ШАБЛОНЫ БЕЗ РАЗРЕШЕНИЯ**
```bash
❌ /src/components/ui/* - UI компоненты (защищены)
❌ /src/templates/TourTemplate.tsx - шаблон тура (эталон)
❌ /src/components/BookingForm.tsx - форма бронирования (работает)
❌ /src/components/PriceCalculator.tsx - калькулятор (отлажен)
```

#### 3. **СОЗДАВАТЬ ДУБЛИРУЮЩИЙ КОД**
```typescript
❌ НЕ создавать свои калькуляторы - используй готовый
❌ НЕ писать свои формы - используй BookingForm
❌ НЕ дублировать компоненты - используй из /ui/
```

#### 4. **РАБОТАТЬ В ОБХОД СИСТЕМЫ**
```typescript
❌ НЕ хардкодить туры в коде - они в Directus
❌ НЕ создавать локальные данные - используй API
❌ НЕ писать свой API - используй Directus API
```

---

### ✅ РАЗРЕШЕНО И РЕКОМЕНДУЕТСЯ:

#### 1. **ИСПОЛЬЗОВАТЬ ГОТОВЫЕ КОМПОНЕНТЫ**
```typescript
✅ import { TourCard } from '@/components/TourCard'
✅ import { BookingForm } from '@/components/BookingForm'
✅ import { Button } from '@/components/ui/button'
```

#### 2. **РАБОТАТЬ ЧЕРЕЗ DIRECTUS API**
```typescript
✅ const tours = await directus.items('tours').readByQuery()
✅ const tour = await directus.items('tours').readOne(id)
✅ await directus.items('bookings').createOne(data)
```

#### 3. **СОЗДАВАТЬ НОВЫЕ СТРАНИЦЫ ПО ШАБЛОНУ**
```typescript
✅ Копировать TourTemplate.tsx
✅ Подключать к Directus API
✅ Использовать готовые компоненты
```

#### 4. **УЛУЧШАТЬ ДИЗАЙН В РАМКАХ СИСТЕМЫ**
```typescript
✅ Добавлять Tailwind классы (не меняя структуру)
✅ Использовать UI компоненты из библиотеки
✅ Следовать дизайн-системе
```

---

## 📋 РАБОЧИЙ ПРОЦЕСС - ПОШАГОВО

### 🎯 **СОЗДАНИЕ НОВОГО ТУРА:**

#### Шаг 1: Добавление в Directus (Владелец или Агент)
```
1. Открыть админку Directus
2. Перейти в коллекцию "Туры"
3. Нажать "Create Item"
4. Заполнить все поля:
   - Название
   - Описание
   - Цена (взрослый/ребенок)
   - Загрузить фотографии
   - Добавить программу тура
   - Что включено/не включено
5. Сохранить
```

#### Шаг 2: Автоматическое появление (Система)
```
✅ Тур автоматически появится в списке на фронтенде
✅ API вернет новый тур
✅ Бот увидит новый тур
✅ Все компоненты подхватят данные
```

#### Шаг 3: Проверка (Агент)
```
1. npm run dev - запустить фронтенд
2. Открыть /tours - увидеть новый тур
3. Открыть /tours/:id - проверить страницу
4. Протестировать бронирование
5. Проверить калькулятор
```

---

### 🔧 **ИЗМЕНЕНИЕ СУЩЕСТВУЮЩЕГО ТУРА:**

#### ✅ ПРАВИЛЬНЫЙ СПОСОБ:
```
1. Открыть Directus админку
2. Найти тур
3. Изменить нужные поля
4. Сохранить
5. Обновить страницу на фронтенде
6. Готово - изменения везде!
```

#### ❌ НЕПРАВИЛЬНЫЙ СПОСОБ:
```
❌ Менять код компонента тура
❌ Создавать отдельный файл с данными
❌ Хардкодить новые значения
❌ Дублировать логику
```

---

### 🐛 **ЕСЛИ ЧТО-ТО СЛОМАЛОСЬ:**

#### 1. **Проверить Directus API**
```bash
# Проверить что сервер запущен
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:8055
# Должно быть: 200 или 302

# Проверить что API отвечает
curl http://localhost:8055/items/tours | jq '.'
# Должен вернуть массив с турами

# Проверить конкретный тур
curl http://localhost:8055/items/tours/1 | jq '.'

# Если не отвечает - перезапустить
pkill -f "directus start"
cd ~/Documents/GitHub/phuketgo-directus
nohup npx directus start > directus.log 2>&1 &
```

#### 2. **Проверить консоль браузера**
```javascript
// Открыть DevTools (F12 или Cmd+Option+I)
// Вкладка Console - посмотреть на ошибки
// Вкладка Network - проверить запросы к API
// Проверить что запросы идут на http://localhost:8055
```

#### 3. **Проверить переменные окружения**
```bash
# Проверить что .env.local существует
cat ~/Documents/GitHub/phuketgo-react/.env.local
# Должно быть: VITE_DIRECTUS_URL=http://localhost:8055

# Если нет - создать заново
echo "VITE_DIRECTUS_URL=http://localhost:8055" > ~/Documents/GitHub/phuketgo-react/.env.local

# ВАЖНО: Перезапустить npm run dev после изменения .env
```

#### 4. **Проверить базу данных**
```bash
# Подключиться к SQLite
cd ~/Documents/GitHub/phuketgo-directus
sqlite3 data.db

# Проверить туры
SELECT COUNT(*) FROM tours;  -- Должно быть 10
SELECT * FROM tours WHERE status='published';  -- Все туры

# Проверить права доступа
SELECT COUNT(*) FROM directus_permissions WHERE collection='tours';  -- Должно быть 4

# Выйти
.quit
```

#### 5. **Откатить изменения**
```bash
# Посмотреть что изменилось
git status
git diff

# Откатить конкретный файл
git checkout -- <файл>

# Откатить все изменения (ОСТОРОЖНО!)
git reset --hard HEAD

# Посмотреть историю
git log --oneline -10
```

#### 6. **Частые проблемы и решения**

**Проблема:** "Ошибка соединения с сервером" на фронтенде
```bash
Решение:
1. Проверить что Directus запущен: curl http://localhost:8055
2. Проверить CORS в Directus (должен быть разрешен localhost:5173)
3. Проверить Network tab в DevTools - куда идут запросы
4. Перезапустить оба сервера
```

**Проблема:** "You don't have permission to access this"
```bash
Решение:
1. Проверить права в базе:
   sqlite3 data.db "SELECT * FROM directus_permissions WHERE collection='tours';"
2. Если нет - добавить права через fix-permissions.sql
3. Перезапустить Directus
```

**Проблема:** Туры не отображаются на фронтенде
```bash
Решение:
1. Проверить что туры есть в базе: sqlite3 data.db "SELECT COUNT(*) FROM tours;"
2. Проверить API: curl http://localhost:8055/items/tours
3. Проверить Console в браузере на ошибки
4. Проверить что компонент использует useDirectusTours() хук
```

**Проблема:** npm run dev не запускается
```bash
Решение:
1. Удалить node_modules и переустановить:
   rm -rf node_modules package-lock.json
   npm install
2. Проверить порт 5173 не занят:
   lsof -ti:5173 | xargs kill -9
3. Запустить заново: npm run dev
```

#### 7. **Спросить владельца**
```
❗ Если не уверен - СПРОСИ
❗ Лучше спросить, чем сломать
❗ Владелец знает систему лучше
❗ Особенно если касается:
   - Изменения защищенных компонентов
   - Изменения структуры базы данных
   - Изменения логики бронирования
   - Удаления существующего функционала
```

---

## 📚 ШАБЛОНЫ КОДА

### 🎯 **Получение списка туров:**

```typescript
// Правильно - через Directus API
import { directus } from '@/lib/directus'

const tours = await directus.items('tours').readByQuery({
  filter: { status: { _eq: 'published' } },
  sort: ['sort', '-date_created']
})
```

```typescript
// ❌ НЕПРАВИЛЬНО - хардкод
const tours = [
  { id: 1, name: 'Тур 1' },
  { id: 2, name: 'Тур 2' }
]
```

---

### 🎯 **Отображение тура:**

```typescript
// ✅ Правильно - используем готовый компонент
import { TourCard } from '@/components/TourCard'

return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {tours.map(tour => (
      <TourCard key={tour.id} tour={tour} />
    ))}
  </div>
)
```

```typescript
// ❌ НЕПРАВИЛЬНО - создаем свой компонент
return (
  <div>
    {tours.map(tour => (
      <div className="custom-card">
        {/* Дублирование кода... */}
      </div>
    ))}
  </div>
)
```

---

### 🎯 **Форма бронирования:**

```typescript
// ✅ Правильно - используем готовую форму
import { BookingForm } from '@/components/BookingForm'

<BookingForm 
  tourId={tour.id}
  tourName={tour.name}
  priceAdult={tour.price_adult}
  priceChild={tour.price_child}
/>
```

```typescript
// ❌ НЕПРАВИЛЬНО - пишем свою форму
const [adults, setAdults] = useState(2)
const [children, setChildren] = useState(0)
// ... 50 строк кода с дублированием логики
```

---

## 🎨 ДИЗАЙН-СИСТЕМА

### Цвета:
```css
Основной: #dc2626 (red-600)
Текст: #1f2937 (gray-800)
Фон: #ffffff (white)
Границы: #e5e7eb (gray-200)
```

### Компоненты UI:
```typescript
// Используй готовые компоненты:
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
```

### Отступы (Tailwind):
```
p-4  = 1rem (16px)
p-6  = 1.5rem (24px)
gap-4 = 1rem
gap-6 = 1.5rem
```

---

## 🚀 КОМАНДЫ ДЛЯ РАБОТЫ

### Directus:
```bash
# Запуск Directus
cd phuketgo-directus
npm start

# Админка доступна на:
http://localhost:8055/admin
```

### Фронтенд:
```bash
# Запуск React приложения
cd phuketgo-react
npm run dev

# Доступно на:
http://localhost:5173
```

### Telegram бот:
```bash
# Бот работает через Vercel Functions
# Локально тестировать через:
vercel dev
```

---

## 📞 КОНТАКТЫ И ПОМОЩЬ

### Если застрял:
1. **Прочитай документацию** - всё описано здесь
2. **Проверь примеры** - посмотри как сделано в других местах
3. **Спроси владельца** - лучше спросить, чем сломать

### Полезные ссылки:
- Directus Docs: https://docs.directus.io
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Shadcn/UI: https://ui.shadcn.com

---

## 🔄 ТЕКУЩЕЕ СОСТОЯНИЕ ПРОЕКТА (ОБНОВЛЯЕТСЯ КАЖДЫМ АГЕНТОМ!)

### ✅ ЧТО УЖЕ СДЕЛАНО:

```yaml
Directus CMS:
  статус: ✅ Установлен и ЗАПУЩЕН
  путь: ~/Documents/GitHub/phuketgo-directus
  порт: 8055
  база_данных: SQLite (data.db)
  админ_панель: http://localhost:8055/admin
  логин: admin@phuketgo.com
  пароль: PhuketGo2025!
  процесс: ✅ Запущен в фоне (nohup npx directus start)
  проверка_статуса: curl -s -o /dev/null -w "%{http_code}" http://localhost:8055
  
Коллекции:
  - tours:
      статус: ✅ Создана и ЗАПОЛНЕНА
      таблица: tours (SQLite)
      поля: [id, slug, title, subtitle, description, price_adult, price_child, 
             price_infant, currency, duration, group_size, rating, reviews_count,
             category, tags, schedule, included, not_included, what_to_bring,
             status, date_created, date_updated]
      права_доступа: ✅ Настроены (4 разрешения для админа + публичный READ доступ)
      записей: ✅ 10 туров импортировано!
      туры:
        1. Пхи-Пхи 2 дня / 1 ночь (phi-phi-2days) - 4000฿
        2. Залив Пханг Нга и остров Джеймса Бонда (james-bond-island) - 1600฿
        3. Жемчужины Андаманского моря (pearls-andaman-sea) - 1800฿
        4. 11 островов стандарт (11-islands-standard) - 2200฿
        5. 11 островов мега (11-islands-mega) - 3200฿
        6. Острова Рача и Корал (racha-coral-islands) - 2000฿
        7. Рафтинг + СПА + ATV (rafting-spa-atv) - 2500฿
        8. Сафари в Као Лак (khao-lak-safari) - 1900฿
        9. Рассветное приключение (rassvetnoe-prikljuchenie) - 1400฿
        10. Достопримечательности Пхукета (dostoprimechatelnosti-phuketa) - 1200฿
      проверка: sqlite3 ~/Documents/GitHub/phuketgo-directus/data.db "SELECT COUNT(*) FROM tours;"
      api_проверка: curl http://localhost:8055/items/tours | jq '.data | length'
  
  - bookings:
      статус: ⏳ Не создана (следующий шаг)
      
Фронтенд:
  статус: ✅ React + Vite ЗАПУЩЕН и ПОДКЛЮЧЕН к Directus
  порт: 5173
  url: http://localhost:5173
  процесс: ✅ Работает (npm run dev)
  компоненты: 60+ Shadcn/UI компонентов
  защищенные_файлы: см. DO_NOT_TOUCH.md
  directus_sdk: ✅ Установлен (@directus/sdk)
  
Интеграция React ↔ Directus:
  статус: ✅ ВЫПОЛНЕНО!
  файлы:
    - src/lib/directus.ts: ✅ Создан (клиент + API функции toursApi, bookingsApi)
    - src/hooks/useDirectusTours.ts: ✅ Создан (хуки useDirectusTours, useDirectusTour)
    - .env.local: ✅ Создан (VITE_DIRECTUS_URL=http://localhost:8055)
    - App.jsx: ✅ ПЕРЕПИСАН - теперь использует useDirectusTours() вместо fetch('/api/places')
  api_доступ: ✅ Публичный READ доступ настроен (policy: abf8a154-5b1c-4a46-ac9c-7300570f4f17)
  
Данные:
  туры_в_directus: ✅ 10 туров (опубликованы, доступны через API)
  старые_файлы: src/data/*.ts (⚠️ будут удалены после полной миграции)
  фото: src/assets/* (все скопированы, ⏳ нужно загрузить в Directus)
  
Telegram Bot:
  токен: 8230486379:AAG5W4IchqGtGYEzaiBJ8Z0uNqi5tol_rwQ
  username: @phuketgobot
  статус: ⏳ Требует подключения к Directus API
```

### ⏳ СЛЕДУЮЩИЕ ШАГИ (ПРИОРИТЕТЫ):

```yaml
1. ✅ ВЫПОЛНЕНО - Импорт туров в Directus:
   метод: Прямой SQL импорт через sqlite3
   файл: ~/Documents/GitHub/phuketgo-directus/import-tours-direct.sql
   результат: 10 туров добавлено в базу
   проверка: sqlite3 data.db "SELECT COUNT(*) FROM tours;" → 10
   
2. ✅ ВЫПОЛНЕНО - Подключение React к Directus API:
   файл: src/lib/directus.ts ✅ создан
   конфиг: .env.local ✅ создан (VITE_DIRECTUS_URL)
   sdk: @directus/sdk ✅ установлен
   хуки: useDirectusTours, useDirectusTour ✅ созданы
   App.jsx: ✅ переписан на Directus API
   публичный_доступ: ✅ настроен (fix-public-access.sql)
   
3. ⏳ TODO - Проверка работы на фронтенде:
   действие: Обновить страницу http://localhost:5173
   ожидание: Должны загрузиться 10 туров из Directus
   консоль: Проверить что нет ошибок в DevTools (F12)
   
4. ⏳ TODO - Создание компонента TourCard:
   файл: src/components/TourCard.jsx
   назначение: Красивая карточка тура с фото, ценой, рейтингом
   данные: Использует структуру Tour из Directus
   
5. ⏳ TODO - Создание коллекции Bookings:
   таблица: bookings
   поля: [customer_name, customer_email, customer_phone, tour_id, 
          adults, children, infants, total_price, booking_date, status]
   
6. ⏳ TODO - Загрузка фотографий в Directus:
   источник: src/assets/tours/*
   цель: Directus Media Library
   связь: Поле main_image и gallery в tours
   метод: Через админку Directus или API upload
   
7. ⏳ TODO - Telegram Bot интеграция:
   обновить: api/webhook.js → использовать Directus API
   функции: /start, /tours, /book
   уведомления: При новом бронировании отправлять в Telegram
```

---

## 📥 ИНСТРУКЦИЯ ПО ИМПОРТУ ТУРОВ В DIRECTUS (ПОШАГОВО)

### 🎯 МЕТОД ПРЯМОГО SQL ИМПОРТА (БЫСТРЫЙ И НАДЕЖНЫЙ)

> **Почему SQL а не админка?**  
> - Быстрее: импорт 10 туров за 1 секунду  
> - Надежнее: нет ошибок UI  
> - Воспроизводимо: можно повторить любое количество раз  
> - Версионируемо: SQL файлы в git

### 📋 ШАГ 1: СОЗДАНИЕ ТАБЛИЦЫ TOURS

**Файл:** `~/Documents/GitHub/phuketgo-directus/create-tours-table.sql`

```sql
-- SQL скрипт для создания коллекции Tours
-- Выполняется напрямую в SQLite базе данных

-- Создаем таблицу tours
CREATE TABLE IF NOT EXISTS tours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status VARCHAR(20) DEFAULT 'draft',
    sort INTEGER,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Основная информация
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    subtitle VARCHAR(500),
    description TEXT,
    
    -- Цены
    price_adult INTEGER,
    price_child INTEGER,
    price_infant INTEGER,
    currency VARCHAR(10) DEFAULT '฿',
    
    -- Детали
    duration VARCHAR(100),
    group_size VARCHAR(100),
    rating REAL,
    reviews_count INTEGER,
    
    -- Категории и теги
    category VARCHAR(50),
    tags TEXT, -- JSON array
    
    -- Дополнительная информация
    schedule TEXT, -- JSON array
    included TEXT, -- JSON array
    not_included TEXT, -- JSON array
    what_to_bring TEXT -- JSON array
);

-- Создаем индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_tours_slug ON tours(slug);
CREATE INDEX IF NOT EXISTS idx_tours_status ON tours(status);
CREATE INDEX IF NOT EXISTS idx_tours_category ON tours(category);
```

**Выполнение:**
```bash
cd ~/Documents/GitHub/phuketgo-directus
sqlite3 data.db < create-tours-table.sql
```

**Проверка:**
```bash
sqlite3 data.db ".schema tours"
# Должна показать структуру таблицы
```

---

### 📋 ШАГ 2: ИМПОРТ 10 ТУРОВ

**Файл:** `~/Documents/GitHub/phuketgo-directus/import-tours-direct.sql`

```sql
-- Прямой импорт туров в SQLite базу данных

INSERT INTO tours (slug, title, subtitle, description, price_adult, price_child, price_infant, currency, duration, group_size, rating, reviews_count, category, tags, status, sort) 
VALUES 
('phi-phi-2days', 'Пхи-Пхи 2 дня / 1 ночь', 'Экскурсия с ночёвкой на островах Пхи-Пхи', 'Незабываемое путешествие с ночевкой на острове. Бухта Майя, огненное шоу, снорклинг и множество приключений!', 4000, 3500, 0, '฿', '2 дня / 1 ночь', 'до 30 человек', 4.8, 53, 'islands', '["морские экскурсии","острова","снорклинг","пляжи","пхи пхи","ночёвка","майя бэй","приключения"]', 'published', 1),

('james-bond-island', 'Залив Пханг Нга и остров Джеймса Бонда', 'Незабываемая экскурсия по легендарному заливу', 'Посетите знаменитый остров из фильма про Джеймса Бонда, покатайтесь на каноэ по мангровым лесам', 1600, 1300, 0, '฿', '1 день', 'до 30 человек', 4.7, 89, 'islands', '["острова","экскурсии","джеймс бонд","каноэ","пханг нга"]', 'published', 2),

('pearls-andaman-sea', 'Жемчужины Андаманского моря', '4 острова за один день', 'Посетите лучшие острова региона: Краби, Ко Пода, Chicken Island и Phra Nang Cave Beach', 1800, 1500, 0, '฿', '1 день', 'до 25 человек', 4.9, 124, 'islands', '["острова","краби","пляжи","снорклинг"]', 'published', 3),

('11-islands-standard', '11 островов стандарт', 'Большое путешествие по 11 островам', 'Самый насыщенный тур! Посетите 11 потрясающих островов за один день', 2200, 1900, 0, '฿', '1 день', 'до 35 человек', 4.8, 67, 'islands', '["острова","экскурсии","снорклинг","пляжи"]', 'published', 4),

('11-islands-mega', '11 островов мега', 'VIP версия тура по 11 островам', 'Роскошная версия тура с улучшенным сервисом и меньшей группой', 3200, 2800, 0, '฿', '1 день', 'до 20 человек', 5.0, 43, 'islands', '["острова","vip","снорклинг","пляжи","люкс"]', 'published', 5),

('racha-coral-islands', 'Острова Рача и Корал', 'Дайвинг и снорклинг на лучших островах', 'Два красивейших острова с кристально чистой водой и богатым подводным миром', 2000, 1700, 0, '฿', '1 день', 'до 30 человек', 4.7, 56, 'islands', '["острова","дайвинг","снорклинг","пляжи"]', 'published', 6),

('rafting-spa-atv', 'Рафтинг + СПА + ATV', 'Активный день с приключениями и релаксом', 'Сплав по реке, массаж в СПА и езда на квадроциклах в джунглях', 2500, 2200, 0, '฿', '1 день', 'до 15 человек', 4.9, 78, 'adventure', '["рафтинг","spa","atv","квадроциклы","приключения"]', 'published', 7),

('khao-lak-safari', 'Сафари в Као Лак', 'Джунгли, водопады и слоны', 'Посетите национальный парк, искупайтесь в водопадах и покатайтесь на слонах', 1900, 1600, 0, '฿', '1 день', 'до 25 человек', 4.6, 92, 'adventure', '["сафари","джунгли","слоны","водопады"]', 'published', 8),

('rassvetnoe-prikljuchenie', 'Рассветное приключение', 'Встретьте рассвет на вершине горы', 'Уникальный тур с подъемом на гору для встречи рассвета и завтраком на высоте', 1400, 1200, 0, '฿', 'полдня', 'до 12 человек', 5.0, 34, 'adventure', '["рассвет","горы","фототур","природа"]', 'published', 9),

('dostoprimechatelnosti-phuketa', 'Достопримечательности Пхукета', 'Обзорная экскурсия по острову', 'Посетите Большого Будду, храм Ват Чалонг, мыс Промтеп и другие достопримечательности', 1200, 1000, 0, '฿', '1 день', 'до 20 человек', 4.5, 156, 'cultural', '["экскурсии","храмы","будда","культура","обзорная"]', 'published', 10);
```

**Выполнение:**
```bash
cd ~/Documents/GitHub/phuketgo-directus
sqlite3 data.db < import-tours-direct.sql
```

**Проверка:**
```bash
# Проверить количество туров
sqlite3 data.db "SELECT COUNT(*) FROM tours;"
# Должно вернуть: 10

# Проверить первые 5 туров
sqlite3 data.db "SELECT id, slug, title, price_adult FROM tours LIMIT 5;"
```

---

### 📋 ШАГ 3: НАСТРОЙКА ПУБЛИЧНОГО ДОСТУПА К API

**Файл:** `~/Documents/GitHub/phuketgo-directus/fix-public-access.sql`

```sql
-- Настройка публичного доступа к API туров (без авторизации для чтения)

-- ID публичной политики (Public Policy)
-- abf8a154-5b1c-4a46-ac9c-7300570f4f17

-- Даем публичный доступ на ЧТЕНИЕ туров (для фронтенда)
INSERT OR REPLACE INTO directus_permissions (collection, action, permissions, validation, presets, fields, policy)
VALUES 
('tours', 'read', '{"_and":[{"status":{"_eq":"published"}}]}', NULL, NULL, '*', 'abf8a154-5b1c-4a46-ac9c-7300570f4f17');

-- Также для системных таблиц которые нужны для работы
INSERT OR REPLACE INTO directus_permissions (collection, action, permissions, validation, presets, fields, policy)
VALUES 
('directus_files', 'read', '{}', NULL, NULL, '*', 'abf8a154-5b1c-4a46-ac9c-7300570f4f17');
```

**Выполнение:**
```bash
cd ~/Documents/GitHub/phuketgo-directus
sqlite3 data.db < fix-public-access.sql
```

**Проверка прав:**
```bash
sqlite3 data.db "SELECT * FROM directus_permissions WHERE collection='tours';"
# Должно показать политику с action='read'
```

---

### 📋 ШАГ 4: ПРОВЕРКА РАБОТЫ API

**Проверка через curl:**

```bash
# 1. Проверить что Directus запущен
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:8055
# Должно вернуть: HTTP Status: 200 или 302

# 2. Проверить что API возвращает туры
curl -s http://localhost:8055/items/tours | jq '.data | length'
# Должно вернуть: 10

# 3. Проверить структуру данных
curl -s http://localhost:8055/items/tours | jq '.data[0]'
# Должен показать первый тур со всеми полями

# 4. Проверить конкретный тур по slug
curl -s "http://localhost:8055/items/tours?filter[slug][_eq]=phi-phi-2days" | jq '.data[0].title'
# Должно вернуть: "Пхи-Пхи 2 дня / 1 ночь"
```

**Проверка через браузер:**
```bash
# Открыть API в браузере
open http://localhost:8055/items/tours
```

**Проверка через админку:**
```bash
# Открыть админку Directus
open http://localhost:8055/admin
# Логин: admin@phuketgo.com
# Пароль: PhuketGo2025!

# В админке должна быть коллекция "tours" с 10 записями
```

---

### 📋 ШАГ 5: ЕСЛИ НУЖНО ДОБАВИТЬ НОВЫЙ ТУР

**Через SQL:**
```sql
-- Добавить новый тур
INSERT INTO tours (slug, title, subtitle, description, price_adult, price_child, price_infant, currency, duration, group_size, rating, reviews_count, category, tags, status, sort)
VALUES 
('new-tour-slug', 'Название нового тура', 'Подзаголовок', 'Описание тура', 2500, 2000, 0, '฿', '1 день', 'до 20 человек', 4.8, 0, 'islands', '["острова","новый"]', 'published', 11);
```

**Выполнить:**
```bash
cd ~/Documents/GitHub/phuketgo-directus
sqlite3 data.db "INSERT INTO tours (...) VALUES (...);"
```

**Или через админку Directus:**
1. Открыть http://localhost:8055/admin
2. Перейти в коллекцию "tours"
3. Нажать "+ Create Item"
4. Заполнить поля
5. Сохранить

---

### 📋 ШАГ 6: ЕСЛИ НУЖНО ОБНОВИТЬ ТУР

**Через SQL:**
```bash
# Обновить цену тура
sqlite3 data.db "UPDATE tours SET price_adult=4500 WHERE slug='phi-phi-2days';"

# Обновить статус (опубликовать/снять с публикации)
sqlite3 data.db "UPDATE tours SET status='draft' WHERE slug='test-tour';"
```

**Или через админку Directus:**
1. Найти тур в коллекции "tours"
2. Кликнуть на него
3. Изменить нужные поля
4. Сохранить

---

### 📋 ШАГ 7: ЕСЛИ НУЖНО УДАЛИТЬ ТУР

**Через SQL:**
```bash
# Удалить тур по slug
sqlite3 data.db "DELETE FROM tours WHERE slug='test-tour';"
```

**Или через админку Directus:**
1. Найти тур в коллекции "tours"
2. Кликнуть правой кнопкой
3. Delete Item

---

### 🔍 ЧАСТЫЕ ПРОБЛЕМЫ И РЕШЕНИЯ

**Проблема 1: "Permission denied" при доступе к API**
```bash
# Решение: Проверить публичные права
sqlite3 data.db "SELECT * FROM directus_permissions WHERE policy='abf8a154-5b1c-4a46-ac9c-7300570f4f17';"

# Если прав нет - выполнить fix-public-access.sql заново
sqlite3 data.db < fix-public-access.sql
```

**Проблема 2: "Table tours does not exist"**
```bash
# Решение: Создать таблицу
sqlite3 data.db < create-tours-table.sql
```

**Проблема 3: "UNIQUE constraint failed: tours.slug"**
```bash
# Решение: Тур с таким slug уже существует
# Либо удалить старый, либо использовать другой slug

# Проверить существующие slug'и
sqlite3 data.db "SELECT slug FROM tours;"
```

**Проблема 4: API возвращает пустой массив**
```bash
# Решение: Проверить статус туров
sqlite3 data.db "SELECT slug, status FROM tours;"

# Только туры со статусом 'published' видны в API
# Изменить статус:
sqlite3 data.db "UPDATE tours SET status='published' WHERE status='draft';"
```

---

### 📊 ИТОГОВЫЙ ЧЕКЛИСТ ИМПОРТА

```markdown
□ Directus запущен (curl http://localhost:8055 → 200)
□ Создана таблица tours (create-tours-table.sql)
□ Импортированы 10 туров (import-tours-direct.sql)
□ Настроены публичные права (fix-public-access.sql)
□ API возвращает 10 туров (curl | jq '.data | length' → 10)
□ В админке видны туры (http://localhost:8055/admin)
□ Все туры имеют status='published'
□ Фронтенд подключен к API (useDirectusTours)
□ Туры отображаются на сайте
```

---

### 🚨 КРИТИЧЕСКИЕ КОМАНДЫ:

```bash
# ========================================
# DIRECTUS CMS
# ========================================

# Запуск Directus (если остановлен)
cd ~/Documents/GitHub/phuketgo-directus
nohup npx directus start > directus.log 2>&1 &

# Проверка что Directus работает
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:8055
# Должно вернуть: HTTP Status: 200 или 302

# Остановить Directus
pkill -f "directus start"

# Просмотр логов
tail -f ~/Documents/GitHub/phuketgo-directus/directus.log

# Админка
open http://localhost:8055/admin
# Логин: admin@phuketgo.com
# Пароль: PhuketGo2025!

# ========================================
# РАБОТА С БАЗОЙ ДАННЫХ
# ========================================

# Подключение к SQLite базе
cd ~/Documents/GitHub/phuketgo-directus
sqlite3 data.db

# Проверка количества туров
sqlite3 data.db "SELECT COUNT(*) FROM tours;"
# Должно вернуть: 10

# Посмотреть все туры
sqlite3 data.db "SELECT id, slug, title, price_adult FROM tours;"

# Посмотреть конкретный тур
sqlite3 data.db "SELECT * FROM tours WHERE slug='phi-phi-2days';"

# Проверка структуры таблицы
sqlite3 data.db ".schema tours"

# ========================================
# REACT ФРОНТЕНД
# ========================================

# Запуск React приложения
cd ~/Documents/GitHub/phuketgo-react
npm run dev
# Доступно на: http://localhost:5173

# Остановить dev сервер
# Нажать Ctrl+C в терминале

# Проверка TypeScript ошибок (если используется)
npm run type-check

# Сборка для продакшена
npm run build

# Проверка lint
npm run lint

# ========================================
# ПРОВЕРКА ИНТЕГРАЦИИ
# ========================================

# Проверить что Directus API отвечает
curl http://localhost:8055/items/tours | jq '.'
# Должен вернуть массив с 10 турами

# Проверить конкретный тур через API
curl http://localhost:8055/items/tours/1 | jq '.'

# Проверить что оба сервера работают
curl -s http://localhost:8055 && echo "✅ Directus OK"
curl -s http://localhost:5173 && echo "✅ React OK"

# ========================================
# GIT ОПЕРАЦИИ
# ========================================

# Проверить статус
git status

# Проверить изменения
git diff

# Закоммитить изменения
git add .
git commit -m "feat(directus): подключение к Directus API"

# Запушить в GitHub
git push origin main

# Откатить изменения в файле
git checkout -- <файл>

# ========================================
# ПОЛЕЗНЫЕ АЛИАСЫ
# ========================================

# Быстрый старт всего проекта (добавить в ~/.zshrc):
alias phuketgo-start='cd ~/Documents/GitHub/phuketgo-directus && nohup npx directus start > directus.log 2>&1 & cd ~/Documents/GitHub/phuketgo-react && npm run dev'

# Остановить всё
alias phuketgo-stop='pkill -f "directus start" && pkill -f "vite"'

# Проверить статус
alias phuketgo-status='curl -s -o /dev/null -w "Directus: %{http_code}\n" http://localhost:8055 && curl -s -o /dev/null -w "React: %{http_code}\n" http://localhost:5173'
```

---

## 📐 ПРАВИЛА РАБОТЫ С ПРОЕКТОМ (ОБЯЗАТЕЛЬНАЯ ИЕРАРХИЯ)

### 🏛️ ИЕРАРХИЯ ПРИНЯТИЯ РЕШЕНИЙ:

```
1. AGENT_GUIDELINES.md ← ТЫ СЕЙЧАС ЗДЕСЬ (главный закон)
   ↓
2. DO_NOT_TOUCH.md (список запретов)
   ↓
3. LOVABLE_INTEGRATION.md (инструкции по workflow)
   ↓
4. CREDENTIALS.md (секреты и доступы)
   ↓
5. Directus Admin Panel (источник истины для данных)
   ↓
6. TypeScript типы и интерфейсы
   ↓
7. Код компонентов
```

### 🔒 ЗАЩИЩЕННЫЕ ЗОНЫ (НЕ ТРОГАТЬ БЕЗ РАЗРЕШЕНИЯ):

```typescript
// Уровень 1: КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО
/phuketgo-directus/data.db          // База данных - только через Directus API!
/phuketgo-directus/.env             // Конфиг - не менять!
/src/components/ui/*                // UI библиотека - защищена!

// Уровень 2: ТРОГАТЬ ТОЛЬКО С РАЗРЕШЕНИЯ
/src/components/BookingForm.tsx     // Работает - не ломай
/src/components/PriceCalculator.tsx // Отлажен - не ломай
/src/components/TourCard.tsx        // Эталон - можно расширять
/src/templates/TourTemplate.tsx     // Шаблон - можно копировать

// Уровень 3: МОЖНО МЕНЯТЬ ОСТОРОЖНО
/src/pages/*                        // Страницы - через шаблоны
/src/lib/*                          // Утилиты - документируй изменения
/src/styles/*                       // Стили - только Tailwind

// Уровень 4: СВОБОДНАЯ ЗОНА
/src/data/*                         // Временные данные (будут удалены после миграции)
/docs/*                             // Документация - приветствуется
```

---

## 🎣 HOOKS И ПАТТЕРНЫ (КАК ПРОФЕССИОНАЛ)

### 🪝 Custom Hooks для работы с Directus:

```typescript
// ✅ ПРАВИЛЬНО: Создавай переиспользуемые хуки

// hooks/useDirectusTours.ts
import { useEffect, useState } from 'react'
import { directus } from '@/lib/directus'

export function useDirectusTours() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTours() {
      try {
        const response = await directus.items('tours').readByQuery({
          filter: { status: { _eq: 'published' } },
          sort: ['sort', '-date_created']
        })
        setTours(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTours()
  }, [])

  return { tours, loading, error }
}

// Использование:
function ToursPage() {
  const { tours, loading, error } = useDirectusTours()
  
  if (loading) return <Spinner />
  if (error) return <Error message={error} />
  
  return <TourGrid tours={tours} />
}
```

```typescript
// hooks/useDirectusTour.ts - для одного тура
export function useDirectusTour(tourId: string) {
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTour() {
      try {
        const response = await directus.items('tours').readOne(tourId)
        setTour(response)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if (tourId) fetchTour()
  }, [tourId])

  return { tour, loading, error }
}
```

```typescript
// hooks/useBooking.ts - для бронирования
export function useBooking() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const createBooking = async (bookingData) => {
    setSubmitting(true)
    setError(null)
    
    try {
      await directus.items('bookings').createOne(bookingData)
      setSuccess(true)
      // Отправить уведомление в Telegram
      await fetch('/api/telegram/notify', {
        method: 'POST',
        body: JSON.stringify(bookingData)
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return { createBooking, submitting, success, error }
}
```

### 🏗️ Структура проекта (React Best Practices):

```
📁 phuketgo-react/                    # Главная папка проекта
├── 📁 src/
│   ├── 📁 components/                # Переиспользуемые компоненты
│   │   ├── 📁 ui/                   # ❌ НЕ ТРОГАТЬ - Shadcn/UI библиотека (60+ компонентов)
│   │   ├── 📁 layout/               # Header, Footer, Layout
│   │   ├── 📁 tours/                # TourCard, TourGrid, TourFilters
│   │   ├── 📁 booking/              # BookingForm, PriceCalculator
│   │   └── 📁 common/               # Spinner, ErrorBoundary, etc.
│   │
│   ├── 📁 pages/                    # Страницы приложения
│   │   ├── HomePage.jsx             # Главная страница
│   │   ├── ToursPage.jsx            # Список всех туров
│   │   ├── TourDetailsPage.jsx      # Детальная страница тура
│   │   └── BookingPage.jsx          # Страница бронирования
│   │
│   ├── 📁 hooks/                    # ⏳ Custom React Hooks (создается сейчас)
│   │   ├── useDirectusTours.js      # Получение списка туров
│   │   ├── useDirectusTour.js       # Получение одного тура
│   │   ├── useBooking.js            # Создание бронирования
│   │   └── useTelegram.js           # Интеграция с Telegram
│   │
│   ├── 📁 lib/                      # Утилиты и конфигурация
│   │   ├── directus.ts              # ✅ Directus SDK клиент (создан)
│   │   ├── api.ts                   # API обертки
│   │   └── utils.ts                 # Вспомогательные функции
│   │
│   ├── 📁 types/                    # TypeScript типы (если используется)
│   │   ├── Tour.ts
│   │   ├── Booking.ts
│   │   └── index.ts
│   │
│   ├── 📁 data/                     # ⚠️ Временные данные (hardcoded)
│   │   ├── phiPhiTour.ts           # Будет удалено после миграции на Directus
│   │   ├── pearlsTour.ts           # Будет удалено после миграции на Directus
│   │   └── ...                      # 10 файлов туров
│   │
│   ├── 📁 assets/                   # Статические файлы
│   │   └── 📁 tours/                # Фотографии туров
│   │       ├── phi-phi-2days/
│   │       ├── james-bond-island/
│   │       └── ...                  # Нужно загрузить в Directus
│   │
│   ├── App.jsx                      # Главный компонент
│   ├── main.jsx                     # Точка входа
│   └── index.css                    # Глобальные стили
│
├── 📁 public/                       # Публичные файлы
├── .env.local                       # ✅ Конфиг (создан: VITE_DIRECTUS_URL)
├── package.json                     # Зависимости
├── vite.config.js                   # Конфиг Vite
├── tailwind.config.js               # Конфиг Tailwind
├── AGENT_GUIDELINES.md              # 📖 Этот файл (главная документация)
├── DO_NOT_TOUCH.md                  # 🚫 Список защищенных файлов
├── LOVABLE_INTEGRATION.md           # 🔄 Workflow между инструментами
└── CREDENTIALS.md                   # 🔐 Пароли и токены (в .gitignore)

📁 phuketgo-directus/                # Directus CMS (отдельная папка)
├── data.db                          # ✅ SQLite база с 10 турами
├── .env                             # Конфиг Directus
├── directus.log                     # Логи сервера
├── create-tours-table.sql           # ✅ SQL для создания tours
├── import-tours-direct.sql          # ✅ SQL для импорта 10 туров
├── fix-permissions.sql              # ✅ SQL для настройки прав
└── package.json                     # Зависимости Directus
```

### 🎯 Паттерны именования:

```typescript
// Компоненты: PascalCase
TourCard.tsx
BookingForm.tsx
PriceCalculator.tsx

// Хуки: camelCase с префиксом 'use'
useDirectusTours.ts
useBooking.ts

// Утилиты: camelCase
formatPrice.ts
validateEmail.ts

// Типы: PascalCase
Tour.ts
Booking.ts

// Константы: UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:8055'
const MAX_ADULTS = 10
```

---

## 🧪 ТЕСТИРОВАНИЕ И ПРОВЕРКА

### ✅ Обязательная проверка перед коммитом:

```bash
# 1. Проверить что Directus работает
curl http://localhost:8055/items/tours | jq '.'

# 2. Проверить что нет TypeScript ошибок
cd ~/Documents/GitHub/phuketgo-react
npm run type-check

# 3. Проверить что приложение собирается
npm run build

# 4. Проверить что нет lint ошибок
npm run lint

# 5. Запустить dev сервер и проверить визуально
npm run dev
# Открыть http://localhost:5173
# Проверить:
#   - Список туров загружается
#   - Карточки отображаются правильно
#   - Калькулятор считает правильно
#   - Форма бронирования работает
```

### 🔍 Чеклист проверки функциональности:

```markdown
□ API Directus отвечает (HTTP 200)
□ Туры загружаются из Directus
□ Фотографии отображаются
□ Цены отображаются правильно
□ Калькулятор считает корректно
□ Форма валидируется
□ Бронирование отправляется в Directus
□ Уведомление отправляется в Telegram
□ Мобильная версия работает
□ Нет ошибок в консоли браузера
□ Нет ошибок в консоли сервера
```

---

## 📝 КОММЕНТАРИИ В КОДЕ (СТАНДАРТ)

### ✅ ПРАВИЛЬНЫЕ комментарии:

```typescript
/**
 * Хук для получения списка туров из Directus
 * @returns {tours, loading, error} - Список туров, статус загрузки и ошибка
 * 
 * @example
 * const { tours, loading, error } = useDirectusTours()
 * 
 * @see https://docs.directus.io/reference/items.html
 */
export function useDirectusTours() {
  // ... код
}

/**
 * Компонент карточки тура
 * 
 * @param {Tour} tour - Объект тура из Directus
 * @param {boolean} showFullDescription - Показывать полное описание
 * 
 * @requires TourCard должен получать данные из Directus API
 * @warning НЕ использовать hardcoded данные!
 */
export function TourCard({ tour, showFullDescription = false }) {
  // ... код
}
```

```typescript
// ❌ ПЛОХО: бесполезный комментарий
// Получаем туры
const tours = await getTours()

// ✅ ХОРОШО: объясняем ПОЧЕМУ
// Фильтруем только опубликованные туры, чтобы не показывать черновики клиентам
const tours = await getTours({ status: 'published' })
```

### 🚨 Критические комментарии:

```typescript
// 🔒 ЗАЩИЩЕННЫЙ КОД - НЕ МЕНЯТЬ БЕЗ РАЗРЕШЕНИЯ!
// Этот калькулятор отлажен и работает правильно
export function calculateTotalPrice(adults, children, infants, priceAdult, priceChild) {
  // ... логика
}

// ⚠️ ВНИМАНИЕ: Этот код связан с Telegram ботом
// При изменении нужно обновить api/webhook.js
export async function sendTelegramNotification(booking) {
  // ... код
}

// 🐛 BUG: Временный фикс, нужно будет переделать
// TODO: Заменить на нормальную обработку ошибок после миграции на Directus
if (!tour) return null

// 💡 ОПТИМИЗАЦИЯ: Кешируем результат на 5 минут
const cachedTours = useMemo(() => tours, [tours])
```

---

## 🚀 GIT WORKFLOW

### 📋 Правила коммитов:

```bash
# Формат коммита:
<type>(<scope>): <subject>

# Типы:
feat:     Новая функциональность
fix:      Исправление бага
docs:     Документация
style:    Форматирование (не влияет на код)
refactor: Рефакторинг
test:     Тесты
chore:    Рутинные задачи (обновление зависимостей и т.д.)

# Примеры:
feat(tours): добавлен фильтр по категориям
fix(booking): исправлен расчет цены для младенцев
docs(readme): обновлена инструкция по установке Directus
refactor(api): переход с hardcoded данных на Directus API
```

### 🔍 Перед пушем в main:

```bash
# 1. Проверить что ничего не сломано
npm run build

# 2. Проверить что нет лишних файлов
git status

# 3. Проверить что не коммитишь секреты
grep -r "PhuketGo2025\|8230486379" .

# 4. Написать понятный коммит
git add .
git commit -m "feat(directus): добавлен импорт туров в Directus"

# 5. Пушить
git push origin main
```

---

## 🎯 ПОМНИ ГЛАВНОЕ:

> **"Добавил в Directus → Появилось везде автоматически"**

Это главный принцип работы. Не пытайся делать по-своему!

---

## ✅ ИТОГОВЫЙ ЧЕКЛИСТ ПЕРЕД КОММИТОМ

```markdown
- [ ] Прочитал AGENT_GUIDELINES.md (этот файл)
- [ ] Проверил DO_NOT_TOUCH.md (не трогал защищенные файлы)
- [ ] Использовал готовые компоненты (не дублировал код)
- [ ] Данные берутся из Directus API (не хардкод)
- [ ] Создал/использовал custom hooks (не повторял useEffect)
- [ ] Добавил TypeScript типы (нет any)
- [ ] Написал понятные комментарии (объясняют ПОЧЕМУ)
- [ ] Протестировал на localhost (работает)
- [ ] Проверил мобильную версию (адаптивно)
- [ ] Нет ошибок в консоли (браузер и терминал)
- [ ] Калькулятор работает (посчитал вручную)
- [ ] Форма бронирования работает (отправил тест)
- [ ] Код читабельный и понятный (другой разработчик поймет)
- [ ] Следую дизайн-системе (Tailwind + Shadcn/UI)
- [ ] Написал коммит по стандарту (feat/fix/docs/...)
- [ ] Обновил эту секцию "Текущее состояние проекта" (если менял что-то важное)
```

---

**Дата создания:** 1 октября 2025  
**Последнее обновление:** 2 октября 2025, 23:45 MSK  
**Версия:** 2.7 (� КРИТИЧЕСКИЙ ФИКС: Добавлена ошибка #8 - JSON parsing из Directus!)  
**Статус:** ⚡ ОБЯЗАТЕЛЬНО К ИСПОЛНЕНИЮ  
**Автор:** AI Agent с инструкциями владельца  
**Следующий агент:** ПРОЧИТАЙ ЭТО ПЕРВЫМ ДЕЛОМ!  

**🔥 Изменения в 2.7 (2 октября 2025, 23:45) - КРИТИЧЕСКИЙ ФИКС!:**
- 🔥 **ДОБАВЛЕНА ОШИБКА #8: "Забыл распарсить JSON поля из Directus"** (~80 строк!)
- 🔥 **Проблема:** Directus SQLite хранит JSON как строки, не массивы!
- 🔥 **Симптом:** `TypeError: tour.included.map is not a function`
- 🔥 **Решение:** JSON.parse() с try/catch для всех JSON полей
- 🔥 **Затронутые поля:** included, not_included, what_to_bring, schedule, gallery
- 🔥 **Файл исправлен:** TourDetailsPage.jsx (4 поля: included, not_included, what_to_bring, schedule)
- 🔥 **Шаблон кода:** IIFE с JSON.parse + typeof check + Array.isArray + error handling
- 🔥 **Таблица полей:** Какие поля нужно парсить, какие - нет
- 🔥 **Чеклист парсинга:** 6 пунктов проверки перед использованием JSON полей
- ✅ Теперь файл содержит **3860+ строк** полной документации
- ✅ Эта ошибка больше НЕ БУДЕТ повторяться!

## � ИСТОРИЯ ИЗМЕНЕНИЙ

**🎉 v4.0 (3 октября 2025) - ПРОБЛЕМА С ДЕПЛОЕМ РЕШЕНА!**

**✅ КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ:**
- � **Коммит:** `9a7fe25` - "fix: revert to original vite.config + add .env.production"
- � **Backup коммит:** `3e6d7bb` - рабочая конфигурация (если что-то сломается)
- ✅ **vite.config.js** - убран hardcode, возвращен к оригиналу
- ✅ **`.env.production`** - создан с Railway URL (добавлен в git!)
- ✅ **CORS на Railway** - исправлен на `https://johnda7.github.io` (БЕЗ localhost!)
- ✅ **GitHub Pages** - деплой работает, показывает 10 туров из Directus

**🔴 ЧТО БЫЛО ИСПРАВЛЕНО:**

1. **Проблема:** GitHub Pages показывал 2 mock тура вместо 10 из Directus
2. **Причина:** Неправильный подход с hardcode в vite.config.js + CORS с двумя URL
3. **Решение:** 
   - Откатили vite.config.js к оригиналу (коммит 3e6d7bb)
   - Создали `.env.production` с Railway URL
   - Исправили CORS на Railway (только GitHub Pages URL)

**✅ ТЕКУЩЕЕ СОСТОЯНИЕ:**
- Production: https://johnda7.github.io/phuketgo-react/ ✅ РАБОТАЕТ
- 10 туров из Directus Railway ✅ ЗАГРУЖАЮТСЯ
- Фотогалереи ✅ ОТОБРАЖАЮТСЯ
- CORS ✅ НАСТРОЕН ПРАВИЛЬНО

---

**v3.0 (2 октября 2025, 23:30) - CORS ИСПРАВЛЕН:**
- 🔴 **CORS на Railway** обновлён: `http://localhost:5173,https://johnda7.github.io`
- 🔴 Добавлена секция "ТИПИЧНЫЕ ОШИБКИ АГЕНТОВ" (~300 строк!)
- ✅ `.env.local` создан с правильным Railway URL
- ✅ Проблема с mock данными (2 тура) РЕШЕНА

**v2.0 (2 октября 2025) - ТУРЫ ИМПОРТИРОВАНЫ:**
- ✅ 10 туров импортировано в Directus через SQL
- ✅ App.jsx переписан на Directus API (useDirectusTours)
- ✅ Публичный READ доступ к API настроен

---


