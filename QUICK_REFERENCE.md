# 🚀 БЫСТРАЯ ШПАРГАЛКА: Перенос из эталона

**Дата:** 2 октября 2025  
**Проект:** phuketgo-react-1

---

## 📂 ПУТИ К ЭТАЛОНУ

```bash
# Основной (GitHub clone)
/Users/evgeniymikhelev/Documents/GitHub/island-travel-echo-clone/

# Резервный (Downloads)
/Users/evgeniymikhelev/Downloads/island-travel-echo-clone-main/
```

---

## 🎯 ЧТО КОПИРОВАТЬ

### **1. UI Компоненты (СЕЙЧАС!)**
```bash
cp -r ~/Documents/GitHub/island-travel-echo-clone/src/components/ui/* \
      ~/phuketgo-react-1/src/components/ui/
```

### **2. Хуки (СЕЙЧАС!)**
```bash
cp ~/Documents/GitHub/island-travel-echo-clone/src/hooks/useTours.ts \
   ~/phuketgo-react-1/src/hooks/

cp ~/Documents/GitHub/island-travel-echo-clone/src/hooks/useAutoMenu.ts \
   ~/phuketgo-react-1/src/hooks/
```

### **3. Header с меню и поиском**
```bash
cp ~/Documents/GitHub/island-travel-echo-clone/src/components/Header.tsx \
   ~/phuketgo-react-1/src/components/Header.tsx
```

---

## ✅ УЖЕ СКОПИРОВАНО

- [x] Gallery.tsx (5774 bytes)
- [x] UniversalBookingModal.tsx (16728 bytes)
- [x] MobileBookingBar.tsx (1825 bytes)
- [x] TourTags.tsx (991 bytes)
- [x] ModalPortal.tsx (2701 bytes)
- [x] DostoprimechatelnostiPhuketa.tsx (33332 bytes)
- [x] utils.ts
- [x] paths.ts

---

## 📦 УЖЕ УСТАНОВЛЕНО

```bash
✅ @radix-ui/react-navigation-menu
✅ @radix-ui/react-dialog
✅ @radix-ui/react-slot
✅ class-variance-authority
✅ clsx
✅ tailwind-merge
✅ lucide-react
```

---

## 🎯 ПРИОРИТЕТНЫЕ ДЕЙСТВИЯ

1. ⚡ Скопировать UI компоненты (button, card, navigation-menu)
2. ⚡ Создать хуки useTours и useAutoMenu
3. ⚡ Обновить TourDetailsPage.jsx
4. ⚡ Добавить галерею (мобильная + desktop)
5. ⚡ Добавить desktop sidebar

---

## 📋 КРИТИЧНЫЕ ЭЛЕМЕНТЫ

### Галерея (Критерий 23):
```tsx
// Мобильная (< 768px):
- ОДНА фото + стрелки + точки
- Свайпы работают
- НЕТ горизонтальной прокрутки

// Desktop (≥ 768px):
- Grid 2x3
- Кнопка "Показать все"
- Полноэкранное модальное окно
```

### Desktop Sidebar (Критерий 12):
```tsx
<div className="grid md:grid-cols-3">
  <div className="md:col-span-2">{/* Контент */}</div>
  <div className="md:col-span-1">
    <div className="sticky top-24">{/* Sidebar */}</div>
  </div>
</div>
```

---

## 📊 ПРОГРЕСС

**Текущий:** 10/23 критериев (43%)  
**Цель:** 23/23 критериев (100%)

**Блокеры:**
- ❌ Нет галереи
- ❌ Нет desktop sidebar
- ❌ Нет модального окна бронирования

---

## 🔗 ПОЛНАЯ ДОКУМЕНТАЦИЯ

См. **AGENT_GUIDELINES.md** → раздел "ЭТАЛОННЫЙ ПРОЕКТ"

---

**Обновлено:** 2 октября 2025, 15:30
