# 🎨 LOVABLE: ИНСТРУКЦИЯ ПО СИНХРОНИЗАЦИИ С DIRECTUS

> **Для Lovable AI:** Прочитай этот файл ПЕРВЫМ! Здесь вся информация о текущем состоянии проекта.

---

## ✅ ЧТО УЖЕ СДЕЛАНО (В GITHUB)

### 1. Directus Backend ЗАПУЩЕН И РАБОТАЕТ

```yaml
URL: http://localhost:8055
Admin: http://localhost:8055/admin
Email: admin@phuketgo.com
Password: PhuketGo2025!
Статус: ✅ Запущен локально, 10 туров в базе
```

### 2. Файлы интеграции СОЗДАНЫ

```
✅ src/lib/directus.ts - Клиент Directus SDK + типы
✅ src/hooks/useDirectusTours.ts - React хуки для загрузки туров
✅ src/App.jsx - Обновлен для использования Directus API
✅ .env.local - VITE_DIRECTUS_URL=http://localhost:8055
✅ package.json - @directus/sdk установлен
```

### 3. API работает локально

```bash
# Проверка:
curl http://localhost:8055/items/tours | jq '.data | length'
# Возвращает: 10
```

---

## 🔴 ПРОБЛЕМА: LOVABLE НЕ ВИДИТ ФАЙЛЫ

### Почему Lovable не видит интеграцию:

1. **GitHub синхронизация** - нужно 1-2 минуты после push
2. **`.env.local` в .gitignore** - не пушится в GitHub (правильно!)
3. **Локальный Directus** - работает только на localhost:8055
4. **Lovable не имеет доступа к localhost** - нужен публичный URL

---

## 🎯 ЧТО НУЖНО СДЕЛАТЬ В LOVABLE

### ВАРИАНТ 1: Использовать существующий код (РЕКОМЕНДУЕТСЯ)

**Файлы УЖЕ в GitHub, просто обнови:**

1. **Обнови рабочую область** (GitHub sync может занять 1-2 минуты)
   ```
   Lovable → Обновить из GitHub
   ```

2. **Проверь что файлы появились:**
   ```
   src/lib/directus.ts ✅
   src/hooks/useDirectusTours.ts ✅
   src/App.jsx ✅ (обновлен)
   ```

3. **Создай Environment Variables в Lovable:**
   ```
   VITE_DIRECTUS_URL=https://твой-directus.app
   ```

4. **Directus нужно задеплоить публично** (см. ВАРИАНТ 2)

---

### ВАРИАНТ 2: Задеплоить Directus (для работы Lovable)

**Проблема:** Directus на localhost:8055 - Lovable не может к нему обратиться

**Решение:** Задеплоить Directus на публичный хостинг

#### Опция A: Directus Cloud (Официальный, Платный)
```
1. Зарегистрироваться на https://directus.cloud
2. Создать проект
3. Импортировать схему (из create-tours-table.sql)
4. Импортировать данные (из import-tours-direct.sql)
5. URL будет: https://твой-проект.directus.app
```

#### Опция B: Railway.app (Бесплатный Trial)
```
1. Railway.app → New Project
2. Deploy from GitHub (phuketgo-directus)
3. Add Environment Variables:
   - KEY, SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
4. URL будет: https://твой-проект.railway.app
```

#### Опция C: Render.com (Бесплатный)
```
1. Render.com → New Web Service
2. Connect GitHub (phuketgo-directus)
3. Environment: Node
4. Build: npm install
5. Start: npx directus start
6. URL будет: https://твой-проект.onrender.com
```

---

### ВАРИАНТ 3: Временное решение (API Proxy)

Если не хочешь деплоить Directus прямо сейчас:

**Создай Edge Function в Lovable:**

```typescript
// supabase/functions/tours/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  // Проксируем запросы к localhost Directus
  // ВНИМАНИЕ: Работает только если Directus публично доступен!
  
  const directusUrl = 'http://localhost:8055' // Замени на публичный URL
  
  const response = await fetch(`${directusUrl}/items/tours`)
  const data = await response.json()
  
  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } }
  )
})
```

Но **это не сработает с localhost!** Нужен публичный URL.

---

## 📋 ПОШАГОВЫЙ ПЛАН ДЛЯ LOVABLE

### Шаг 1: Проверь синхронизацию с GitHub

```
В Lovable:
1. Settings → GitHub → Refresh
2. Проверь что коммит 43170e5 появился
3. Проверь файлы:
   - src/lib/directus.ts (131 строка)
   - src/hooks/useDirectusTours.ts (53 строки)
   - src/App.jsx (обновлен, использует useDirectusTours)
```

### Шаг 2: Задеплой Directus (выбери способ)

```
Рекомендую Railway.app (бесплатный trial):
1. Railway.app → Deploy
2. Получи URL: https://xxx.railway.app
3. Проверь: curl https://xxx.railway.app/items/tours
```

### Шаг 3: Обнови переменные окружения в Lovable

```
В Lovable:
1. Settings → Environment Variables
2. Добавь:
   VITE_DIRECTUS_URL=https://твой-directus.railway.app
3. Redeploy приложение
```

### Шаг 4: Проверь что работает

```
В Lovable Preview:
1. Открой приложение
2. Консоль браузера (F12)
3. Должны загрузиться 10 туров из Directus
4. Нет ошибок CORS или 404
```

---

## 🔍 КАК ПРОВЕРИТЬ ЧТО ВСЕ РАБОТАЕТ

### 1. Локально (если запущен Directus)

```bash
# Проверка API
curl http://localhost:8055/items/tours | jq '.data | length'
# → 10

# Проверка фронтенда
npm run dev
# Открыть http://localhost:5173
# DevTools → Network → tours запрос → Status 200
```

### 2. В Lovable (после деплоя Directus)

```
Lovable Preview:
1. DevTools (F12) → Console
2. Не должно быть ошибок "Failed to fetch"
3. Network → tours → Status 200
4. Туры должны отображаться на странице
```

---

## 📁 СТРУКТУРА ФАЙЛОВ (УЖЕ В GITHUB)

```
phuketgo-react/
├── src/
│   ├── lib/
│   │   └── directus.ts ✅ Клиент SDK + типы Tour, Booking
│   ├── hooks/
│   │   └── useDirectusTours.ts ✅ useDirectusTours(), useDirectusTour()
│   ├── App.jsx ✅ Использует useDirectusTours
│   └── components/
│       └── tours/
│           └── TourCard.jsx ✅ Отображение карточек туров
├── .env.local ❌ НЕ в git (локальный)
├── .env.example ✅ Шаблон переменных
├── package.json ✅ @directus/sdk: ^20.1.0
└── AGENT_GUIDELINES.md ✅ Полная документация
```

---

## 🚨 ВАЖНО ДЛЯ LOVABLE AI

### Что УЖЕ сделано (НЕ делай заново):

- ✅ @directus/sdk установлен
- ✅ Клиент создан (src/lib/directus.ts)
- ✅ Хуки созданы (src/hooks/useDirectusTours.ts)
- ✅ App.jsx обновлен
- ✅ 10 туров в Directus базе
- ✅ API работает (локально)

### Что НУЖНО сделать:

1. ⏳ Дождаться синхронизации GitHub (1-2 минуты)
2. 🚀 Задеплоить Directus публично
3. 🔧 Добавить VITE_DIRECTUS_URL в Lovable Environment Variables
4. ✅ Проверить что туры загружаются

### Что НЕ НУЖНО делать:

- ❌ Переписывать src/lib/directus.ts
- ❌ Создавать новые API endpoints
- ❌ Менять структуру компонентов
- ❌ Удалять существующие файлы

---

## 💡 БЫСТРЫЙ СТАРТ

**Если хочешь сразу увидеть результат:**

```bash
# 1. Локально запусти оба сервера
Terminal 1: cd phuketgo-directus && npx directus start
Terminal 2: cd phuketgo-react && npm run dev

# 2. Открой http://localhost:5173
# 3. DevTools → Network → видишь запрос к /items/tours
# 4. Туры загружаются из Directus ✅
```

**Для работы в Lovable:**
- Нужен публичный URL Directus
- Используй Railway.app или Render.com (бесплатно)

---

## 📞 ЕСЛИ ЧТО-ТО НЕ РАБОТАЕТ

### Ошибка: "Cannot find module '@directus/sdk'"
```bash
Решение: npm install
```

### Ошибка: "VITE_DIRECTUS_URL is not defined"
```bash
Решение: Создай .env.local с VITE_DIRECTUS_URL=http://localhost:8055
Или добавь в Lovable Environment Variables
```

### Ошибка: "Failed to fetch" / CORS
```bash
Решение: 
1. Directus должен разрешить CORS для Lovable домена
2. Или используй Edge Function как прокси
```

### Ошибка: "You don't have permission"
```bash
Решение: Проверь публичные права в Directus:
sqlite3 data.db "SELECT * FROM directus_permissions WHERE collection='tours';"
Должна быть политика с action='read'
```

---

**Дата создания:** 1 октября 2025, 21:30 MSK  
**Версия:** 1.0  
**Статус:** ✅ Готово к использованию  
**Следующий шаг:** Задеплоить Directus → Обновить VITE_DIRECTUS_URL → Радоваться! 🎉
