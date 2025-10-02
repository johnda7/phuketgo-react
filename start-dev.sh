#!/bin/bash
# 🚀 Скрипт для запуска PhuketGo в режиме разработки
# Автор: AI Agent
# Дата: 2 октября 2025

echo "🏝️  PhuketGo - Запуск локальной разработки"
echo "=========================================="
echo ""

# Проверка что мы в правильной папке
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: запустите скрипт из папки phuketgo-react-1"
    exit 1
fi

# Путь к Directus
DIRECTUS_PATH="/Users/evgeniymikhelev/Documents/GitHub/phuketgo-directus"

# Проверка наличия Directus
if [ ! -d "$DIRECTUS_PATH" ]; then
    echo "❌ Ошибка: папка $DIRECTUS_PATH не найдена"
    exit 1
fi

echo "📦 ШАГ 1: Запуск Directus CMS..."
echo "   Папка: $DIRECTUS_PATH"
echo "   Порт: 8055"
echo ""

# Запуск Directus в фоне
cd "$DIRECTUS_PATH"
DB_CLIENT=sqlite3 DB_FILENAME=./data.db PORT=8055 npx directus start > /tmp/directus.log 2>&1 &
DIRECTUS_PID=$!
echo "   ✅ Directus запущен (PID: $DIRECTUS_PID)"
echo "   📄 Логи: /tmp/directus.log"
echo ""

# Ждём 3 секунды пока Directus запустится
sleep 3

# Проверка что Directus запустился
if ! curl -s http://localhost:8055/server/ping > /dev/null 2>&1; then
    echo "❌ Directus не запустился. Смотрите логи: tail -f /tmp/directus.log"
    kill $DIRECTUS_PID 2>/dev/null
    exit 1
fi

echo "⚛️  ШАГ 2: Запуск React приложения..."
echo "   Папка: $(pwd)"
echo "   Порт: 5173"
echo ""

# Возвращаемся в папку React
cd -

# Запуск Vite
npm run dev &
VITE_PID=$!
echo "   ✅ Vite запущен (PID: $VITE_PID)"
echo ""

echo "=========================================="
echo "🎉 ВСЁ ГОТОВО!"
echo ""
echo "   🌐 Frontend:  http://localhost:5173/"
echo "   🗄️  Directus: http://localhost:8055/admin"
echo ""
echo "   📝 Логи Directus: tail -f /tmp/directus.log"
echo ""
echo "   ⛔ Остановить: Ctrl+C или:"
echo "      kill $DIRECTUS_PID $VITE_PID"
echo ""
echo "=========================================="

# Ждём пока пользователь не нажмёт Ctrl+C
wait
