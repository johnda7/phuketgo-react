# Эту секцию нужно добавить в AGENT_GUIDELINES.md после секции про DEV СЕРВЕР

---

## 🔄 СИНХРОНИЗАЦИЯ С LOVABLE (ОБЯЗАТЕЛЬНО ЗНАТЬ!)

### ⚠️ **ПРОБЛЕМА: LOVABLE НЕ ВИДИТ ФАЙЛЫ**

Пользователь спрашивает: "Почему Lovable не видит мои изменения из VS Code?"

**Причины:**

1. **GitHub синхронизация занимает время** (1-2 минуты после git push)
2. **Локальные файлы не автоматически в Lovable** (.env.local, node_modules)
3. **Directus на localhost** - Lovable не может обращаться к localhost:8055
4. **Lovable кеширует** - нужно явно обновить workspace

### ✅ **КАК РАБОТАЕТ СИНХРОНИЗАЦИЯ:**

```
VS Code (локально)
    ↓ git commit + push
GitHub (удаленно)
    ↓ 1-2 минуты синхронизации
Lovable (читает из GitHub)
```

**ВАЖНО:** Lovable читает код из GitHub, НЕ с твоего компьютера!

### 🎯 **ЧТО СДЕЛАТЬ КОГДА LOVABLE НЕ ВИДИТ ФАЙЛЫ:**

#### ШАГ 1: Проверь что код в GitHub

```bash
# 1. Проверь статус git
git status
# Должно быть: "nothing to commit, working tree clean"

# 2. Проверь что запушено
git log origin/main..HEAD
# Должно быть пусто (все коммиты запушены)

# 3. Если есть незапушенные коммиты
git push origin main
```

#### ШАГ 2: Дай Lovable время на синхронизацию

```
⏰ Подожди 1-2 минуты после git push
GitHub нужно время чтобы обработать изменения
Lovable автоматически подтянет их
```

#### ШАГ 3: Скажи Lovable обновить workspace

```
В Lovable напиши:
"Обнови workspace из GitHub. Проверь что файлы появились:
- src/lib/directus.ts
- src/hooks/useDirectusTours.ts
- LOVABLE_README.md"
```

#### ШАГ 4: Укажи на документацию

```
"Прочитай файл LOVABLE_README.md - там вся инструкция!"
```

### 🚨 **КРИТИЧЕСКИЕ ПРАВИЛА ДЛЯ LOVABLE ИНТЕГРАЦИИ:**

#### ❌ ОШИБКА 1: Ожидание мгновенной синхронизации
```bash
# НЕПРАВИЛЬНО:
git push
# Сразу в Lovable: "Используй новые файлы"
# Lovable: "Не вижу файлов" ← GitHub еще не синхронизировался!

# ПРАВИЛЬНО:
git push
sleep 120  # Подожди 2 минуты
# Теперь в Lovable: "Обнови workspace и используй файлы"
```

#### ❌ ОШИБКА 2: Локальные URL в коде
```typescript
// НЕПРАВИЛЬНО для Lovable:
const directusUrl = 'http://localhost:8055'
// Lovable не может обратиться к localhost!

// ПРАВИЛЬНО:
const directusUrl = import.meta.env.VITE_DIRECTUS_URL
// В Lovable Environment Variables: 
// VITE_DIRECTUS_URL=https://твой-directus.railway.app
```

#### ❌ ОШИБКА 3: .env.local не в GitHub
```bash
# .env.local в .gitignore - правильно!
# Но Lovable его не видит

# РЕШЕНИЕ:
# 1. Создай .env.example с шаблоном
# 2. В Lovable: Settings → Environment Variables
# 3. Добавь туда же переменные
```

#### ❌ ОШИБКА 4: Дублирование работы
```
# НЕПРАВИЛЬНО:
# VS Code создал src/lib/directus.ts
# Lovable тоже создает src/lib/directus.ts
# Конфликт! Две версии!

# ПРАВИЛЬНО:
# VS Code создал → git push → GitHub
# Lovable: "Используй существующий src/lib/directus.ts из GitHub"
# Один файл, одна версия
```

### 📋 **ЧЕКЛИСТ СИНХРОНИЗАЦИИ:**

```markdown
Перед тем как жаловаться что Lovable не видит:

□ Сделал git commit всех изменений
□ Сделал git push origin main
□ Подождал 1-2 минуты
□ Проверил на GitHub что коммит там (github.com/johnda7/phuketgo-react/commits)
□ Сказал Lovable обновить workspace
□ Указал Lovable прочитать LOVABLE_README.md
□ Проверил Environment Variables в Lovable
□ ТОЛЬКО ТЕПЕРЬ говорю "Lovable не синхронизируется"
```

### 🎓 **АРХИТЕКТУРА ТРЕХ МЕСТ:**

```
┌──────────────────────────────────────────────┐
│         1. VS CODE (Локально)                │
│  - Полный доступ к файлам                    │
│  - Directus localhost:8055                   │
│  - React localhost:5173                      │
│  - Быстрая разработка                        │
└──────────┬───────────────────────────────────┘
           │ git push
           ↓
┌──────────────────────────────────────────────┐
│         2. GITHUB (Удаленно)                 │
│  - Единый источник истины                    │
│  - Все файлы кроме .gitignore                │
│  - История изменений                         │
│  - Доступен VS Code И Lovable               │
└──────────┬───────────────────────────────────┘
           │ sync 1-2 мин
           ↓
┌──────────────────────────────────────────────┐
│         3. LOVABLE (Облако)                  │
│  - Читает из GitHub                          │
│  - Может деплоить на Vercel                  │
│  - Нужен публичный Directus URL              │
│  - Environment Variables отдельно            │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│         4. DIRECTUS (Backend)                 │
│  Вариант A: Localhost (только VS Code)      │
│  Вариант B: Railway/Render (для Lovable)    │
│  - localhost:8055 (локально)                 │
│  - https://xxx.railway.app (публично)        │
└──────────────────────────────────────────────┘
```

### 💡 **ПРАВИЛА РАБОТЫ В ТРИ МЕСТА:**

1. **VS Code** - основная разработка
   - Создаешь новые файлы
   - Пишешь код
   - Тестируешь локально
   - Коммитишь → пушишь

2. **GitHub** - центральный репозиторий
   - Хранит всю историю
   - Синхронизирует VS Code ↔ Lovable
   - Всегда актуальный код

3. **Lovable** - визуальное редактирование
   - UI изменения
   - Деплой на продакшн
   - Читает из GitHub
   - Нужен публичный Directus URL

4. **Directus** - база данных и API
   - Локально: только VS Code видит
   - Публично (Railway): все видят
   - Туры, бронирования, контент

### 📝 **WORKFLOW ДЛЯ АГЕНТА:**

```bash
# Когда работаешь в VS Code:
1. Делай изменения
2. git commit -m "..."
3. git push origin main
4. Жди 2 минуты
5. Скажи пользователю: "Изменения в GitHub, Lovable подтянет через 1-2 минуты"

# Когда пользователь работает в Lovable:
1. Он делает изменения в Lovable
2. Lovable автоматически пушит в GitHub
3. git pull origin main (чтобы подтянуть локально)
4. Проверь что нет конфликтов

# Когда нужна синхронизация туров:
1. Туры в Directus (localhost:8055) - VS Code видит
2. Для Lovable: деплой Directus на Railway.app
3. В Lovable: VITE_DIRECTUS_URL=https://xxx.railway.app
4. Теперь оба работают с одной базой
```

### 🔧 **ЧТО СКАЗАТЬ LOVABLE КОГДА ОН НЕ ВИДИТ ФАЙЛЫ:**

```
Скопируй и отправь в Lovable:

"Привет! Прочитай файл LOVABLE_README.md в корне проекта.

Кратко:
1. Подожди 1-2 минуты синхронизации GitHub (я только что запушил)
2. Обнови workspace: Settings → Refresh from GitHub
3. Файлы УЖЕ там:
   - src/lib/directus.ts (Directus SDK клиент)
   - src/hooks/useDirectusTours.ts (React хуки)
   - src/App.jsx (обновлен для Directus)
4. НЕ СОЗДАВАЙ новые файлы - используй существующие!
5. Directus работает на localhost:8055 (10 туров)
6. Для работы в Lovable нужен публичный URL Directus

Подробности в LOVABLE_README.md"
```

---
