# 🤖 РУКОВОДСТВО ДЛЯ AI АГЕНТОВ - ЧИТАТЬ ПЕРВЫМ!

> **КРИТИЧЕСКИ ВАЖНО:** Это руководство ОБЯЗАТЕЛЬНО к прочтению перед любой работой с проектом!
> 
> **⚠️ ВАЖНОЕ ПРАВИЛО:** ВСЯ документация в ОДНОМ файле - AGENT_GUIDELINES.md
> 
> ❌ **НЕ СОЗДАВАЙ** новые файлы типа "TOUR_IMPORT_GUIDE.md", "DEV_SERVER_GUIDE.md" и т.п.
> ✅ **ДОБАВЛЯЙ** все в этот файл как новые разделы

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

## 📊 ТЕКУЩЕЕ СОСТОЯНИЕ ПРОЕКТА (на 1 октября 2025)

### ✅ **ЧТО УЖЕ РАБОТАЕТ:**

1. **Backend (Directus CMS):**
   - ✅ Установлен и запущен (localhost:8055)
   - ✅ 10 туров импортированы в базу SQLite
   - ✅ Public API доступ настроен (без токенов)
   - ✅ Админка работает (admin@phuketgo.com / PhuketGo2025!)
   - 📂 Путь: ~/Documents/GitHub/phuketgo-directus/

2. **Frontend (React + Vite):**
   - ✅ Dev сервер работает (localhost:5173)
   - ✅ Список туров загружается из Directus
   - ✅ TourCard компонент с реальными фото
   - ✅ Фильтрация по категориям
   - ✅ Красивый дизайн (Tailwind CSS)
   - ✅ Адаптивная верстка
   - 📂 Путь: ~/Documents/GitHub/phuketgo-react/

3. **Интеграция:**
   - ✅ Directus SDK подключён (@directus/sdk)
   - ✅ Custom hooks: useDirectusTours(), useDirectusTour(slug)
   - ✅ API клиент: toursApi.getAll(), getBySlug(), getById()
   - ✅ Все 10 туров отображаются на главной

4. **Фото и контент:**
   - ✅ Все оригинальные фото в src/assets/
   - ✅ Маппинг slug → фото работает
   - ✅ Fallback на градиент если фото нет
   - ✅ Hover эффекты и анимации

### ⏳ **ЧТО В РАЗРАБОТКЕ (TODO):**

1. **Кнопка "Подробнее" НЕ РАБОТАЕТ:**
   - ❌ Нет страницы детального просмотра тура
   - ❌ Нет роутинга (React Router)
   - 🎯 **ЗАДАЧА:** Создать TourDetailsPage.jsx
   - 🎯 **ЗАДАЧА:** Подключить React Router
   - 🎯 **ЗАДАЧА:** Сделать URL: /tours/{slug}

2. **Коллекция Bookings:**
   - ❌ Нет таблицы в Directus
   - 🎯 **ЗАДАЧА:** Создать SQL скрипт create-bookings-table.sql
   - 🎯 **ЗАДАЧА:** Настроить permissions для POST

3. **Форма бронирования:**
   - ❌ Нет компонента BookingForm
   - 🎯 **ЗАДАЧА:** Создать форму с валидацией
   - 🎯 **ЗАДАЧА:** Интегрировать с bookingsApi.create()

4. **Telegram Bot:**
   - ❌ Не запущен
   - 🎯 **ЗАДАЧА:** Настроить бота через BotFather
   - 🎯 **ЗАДАЧА:** Webhook для уведомлений о заказах

5. **Deploy Directus:**
   - ❌ Пока только localhost
   - 🎯 **ЗАДАЧА:** Задеплоить на Railway.app или Render.com
   - 🎯 **ЦЕЛЬ:** Чтобы Lovable AI мог подключиться

### 🎯 **ПРИОРИТЕТЫ НА СЕГОДНЯ:**

1. **🔴 ВЫСОКИЙ:** Исправить кнопку "Подробнее"
2. **🟡 СРЕДНИЙ:** Создать страницу детального просмотра
3. **🟢 НИЗКИЙ:** Форма бронирования
4. **🔵 ОПЦИОНАЛЬНО:** Telegram bot

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
**Последнее обновление:** 1 октября 2025, 21:10 MSK  
**Версия:** 2.4 (🔴 КРИТИЧЕСКАЯ: Добавлена инструкция по запуску dev сервера)  
**Статус:** ⚡ ОБЯЗАТЕЛЬНО К ИСПОЛНЕНИЮ  
**Автор:** AI Agent с инструкциями владельца  
**Следующий агент:** ПРОЧИТАЙ ЭТО ПЕРВЫМ ДЕЛОМ!  

**🔴 Изменения в 2.4 (КРИТИЧЕСКИЕ!):**
- 🔴 Добавлена секция "КАК ЗАПУСТИТЬ DEV СЕРВЕР (ЕДИНСТВЕННЫЙ ПРАВИЛЬНЫЙ СПОСОБ!)"
- 🔴 Описана проблема которая была 30 раз (npm run dev в background не работает)
- 🔴 Единственный рабочий способ: create_and_run_task с VS Code Task
- 🔴 Пошаговая инструкция с проверками (Task → Wait → Verify → Open Browser)
- 🔴 Список критических ошибок которые НЕ НАДО делать
- 🔴 Полный рабочий скрипт с проверками
- 🔴 Чеклист для агента перед тем как сказать "сервер запущен"
- 🔴 Объяснение ПОЧЕМУ это важно (Vite dev server особенности)
- ✅ Проблема РЕШЕНА: сервер запускается стабильно через VS Code Task

**Изменения в 2.3:**
- ✅ Добавлена детальная секция "ИНСТРУКЦИЯ ПО ИМПОРТУ ТУРОВ В DIRECTUS"
- ✅ Пошаговое руководство: создание таблицы → импорт данных → настройка прав → проверка
- ✅ Примеры SQL скриптов с полным кодом
- ✅ Команды для проверки через curl и sqlite3
- ✅ Решения частых проблем при импорте
- ✅ Итоговый чеклист импорта
- ✅ Инструкции по добавлению/обновлению/удалению туров

**Изменения в 2.2:**
- ✅ App.jsx полностью переписан на Directus API (useDirectusTours)
- ✅ Публичный READ доступ к API настроен (fix-public-access.sql)
- ✅ Проверено: API возвращает 10 туров (curl http://localhost:8055/items/tours)
- ✅ Custom Hooks созданы и подключены к компонентам
- ✅ Старый код с fetch('/api/places') заменен на toursApi.getAll()

**Изменения в 2.1:**
- ✅ Добавлено текущее состояние: 10 туров импортировано в Directus
- ✅ Детализированы пути и статусы всех компонентов
- ✅ Добавлены критические команды для работы с проектом
- ✅ Расширена структура проекта с описанием всех папок
- ✅ Добавлена секция решения проблем с частыми кейсами
- ✅ Обновлены следующие шаги с учетом выполненной работы


