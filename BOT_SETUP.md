# Настройка Telegram бота для PhuketGo

## 1. Создание бота

1. Напишите [@BotFather](https://t.me/botfather) в Telegram
2. Отправьте команду `/newbot`
3. Укажите название бота (например: "PhuketGo Bot")
4. Укажите username бота (например: "phuketgo_bot")
5. Получите токен бота (сохраните его!)

## 2. Настройка команд бота

Отправьте BotFather команду `/setcommands` и выберите вашего бота, затем отправьте:

```
start - Начать работу с ботом
help - Помощь по использованию
places - Показать все места
hotels - Отели Пхукета
restaurants - Рестораны
beaches - Пляжи
activities - Активности и экскурсии
```

## 3. Настройка webhook

После деплоя на Vercel выполните запрос:

```bash
curl -X POST "https://api.telegram.org/bot{YOUR_BOT_TOKEN}/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://your-domain.vercel.app/api/webhook"}'
```

## 4. Переменные окружения в Vercel

В настройках проекта Vercel добавьте:
- `TELEGRAM_BOT_TOKEN` - токен вашего бота

## 5. Проверка работы

1. Найдите вашего бота в Telegram
2. Отправьте `/start`
3. Проверьте ответ бота

## Структура команд бота

- `/start` - Приветствие и главное меню
- Кнопки категорий - показ мест по категориям
- Inline-кнопки для навигации

## API endpoints

- `GET /api/places?category={category}` - получение мест
- `POST /api/webhook` - webhook для Telegram