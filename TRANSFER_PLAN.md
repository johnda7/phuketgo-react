# 🚀 ПЛАН ПЕРЕНОСА ЭТАЛОНА ИЗ island-travel-echo-clone

**Дата:** 2 октября 2025, 15:03  
**Источник:** /Users/evgeniymikhelev/Downloads/island-travel-echo-clone-main  
**Цель:** /Users/evgeniymikhelev/phuketgo-react-1

---

## ✅ ЧТО УЖЕ СКОПИРОВАНО

### **Компоненты:**
- ✅ `Gallery.tsx` (5774 bytes) - мобильная галерея с точками и стрелками
- ✅ `UniversalBookingModal.tsx` (16728 bytes) - форма бронирования
- ✅ `MobileBookingBar.tsx` (1825 bytes) - фиксированная панель внизу
- ✅ `ModalPortal.tsx` (2701 bytes) - портал для модальных окон
- ✅ `TourTags.tsx` (991 bytes) - теги категорий
- ✅ `Header.jsx.new` (19313 bytes) - эталонный Header с меню и поиском

### **Страницы:**
- ✅ `DostoprimechatelnostiPhuketa.tsx` - эталонная страница тура (33332 bytes)

---

## 📋 ЧТО НУЖНО СДЕЛАТЬ

### **ШАГ 1: Установить недостающие зависимости**

```bash
cd /Users/evgeniymikhelev/phuketgo-react-1

# Проверить package.json эталона
cat /Users/evgeniymikhelev/Downloads/island-travel-echo-clone-main/package.json

# Установить недостающие пакеты
npm install @radix-ui/react-navigation-menu
npm install @radix-ui/react-dialog
npm install @radix-ui/react-slot
npm install class-variance-authority
npm install clsx
npm install tailwind-merge
```

---

### **ШАГ 2: Создать недостающие хуки**

#### **2.1. useTours.ts**
```typescript
// src/hooks/useTours.ts
import { useState, useEffect } from 'react';
import { TOURS_REGISTRY } from '@/data/toursRegistry';

export function useTours() {
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTours() {
      const tours = await Promise.all(
        TOURS_REGISTRY.map(async (tour) => {
          const data = await tour.data();
          return {
            ...tour,
            data
          };
        })
      );
      setAllTours(tours);
      setLoading(false);
    }
    loadTours();
  }, []);

  return { allTours, loading };
}
```

#### **2.2. useAutoMenu.ts**
```typescript
// src/hooks/useAutoMenu.ts
import { useMemo } from 'react';
import { useTours } from './useTours';

export function useAutoMenu() {
  const { allTours } = useTours();

  const categories = useMemo(() => {
    const cats = new Set();
    allTours.forEach(tour => {
      if (tour.category) cats.add(tour.category);
    });
    return Array.from(cats);
  }, [allTours]);

  const mainMenuItems = [
    { href: '/', label: 'Главная' },
    { href: '/tours', label: 'Все туры' },
    { href: '/about', label: 'О нас' },
    { href: '/contact', label: 'Контакты' }
  ];

  return { mainMenuItems, categories };
}
```

---

### **ШАГ 3: Создать UI компоненты (shadcn/ui style)**

#### **3.1. Button**
```bash
mkdir -p src/components/ui
```

```typescript
// src/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-gray-300 bg-white hover:bg-gray-50",
        ghost: "hover:bg-gray-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

#### **3.2. Card**
```typescript
// src/components/ui/card.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-white text-gray-800 shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardContent }
```

#### **3.3. Navigation Menu**
```typescript
// src/components/ui/navigation-menu.tsx
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex", className)}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("flex space-x-1", className)}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item
const NavigationMenuTrigger = NavigationMenuPrimitive.Trigger
const NavigationMenuContent = NavigationMenuPrimitive.Content
const NavigationMenuLink = NavigationMenuPrimitive.Link

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuTrigger,
}
```

#### **3.4. Utils для className**
```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

#### **3.5. Paths helper**
```typescript
// src/lib/paths.ts
export function getTourDetailPath(slug: string) {
  return `/tour/${slug}`;
}
```

---

### **ШАГ 4: Обновить роутинг**

```typescript
// src/App.jsx - добавить маршрут для новой страницы

import DostoprimechatelnostiPhuketa from './pages/DostoprimechatelnostiPhuketa';

// В роутере:
<Route path="/tour/dostoprimechatelnosti-phuketa" element={<DostoprimechatelnostiPhuketa />} />
```

---

### **ШАГ 5: Конвертировать TypeScript в JavaScript**

Эталонные файлы в `.tsx`, наш проект использует `.jsx`:

**Опции:**
1. **Оставить .tsx** - установить TypeScript в проект
2. **Конвертировать в .jsx** - удалить типы, оставить логику

**Рекомендация:** Оставить `.tsx`, установить TypeScript:

```bash
npm install --save-dev typescript @types/react @types/react-dom
```

Создать `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

### **ШАГ 6: Обновить vite.config.js для алиасов**

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/phuketgo-react/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

### **ШАГ 7: Проверить и запустить**

```bash
# 1. Установить зависимости
npm install

# 2. Проверить на ошибки
npm run build

# 3. Запустить dev сервер
npm run dev

# 4. Открыть в браузере
open http://localhost:5173/tour/dostoprimechatelnosti-phuketa

# 5. Проверить на мобильном (DevTools F12 → iPhone режим)
```

---

## 📊 ЧЕКЛИСТ ГОТОВНОСТИ

### **Критерий 3: Галерея фотографий**
- [ ] Мобильная: ОДНА фото + стрелки + точки ✅
- [ ] Desktop: Grid 2x3 + "Показать все" ✅
- [ ] Полноэкранное модальное окно ✅
- [ ] Свайпы работают ✅
- [ ] Keyboard navigation (стрелки) ✅

### **Критерий 12: Desktop sidebar**
- [ ] Sticky sidebar справа ✅
- [ ] Grid md:grid-cols-3 ✅
- [ ] Цена + кнопка бронирования ✅

### **Критерий 13: Mobile booking bar**
- [ ] Фиксированная панель внизу ✅
- [ ] Цена + кнопка Telegram ✅
- [ ] Показывается только на < 768px ✅

### **Критерий 14: Модальное окно бронирования**
- [ ] Открывается при клике ✅
- [ ] Форма с полями ✅
- [ ] Отправка работает ✅

### **Header с меню и поиском**
- [ ] Логотип слева ✅
- [ ] Меню навигации (Главная, Туры, О нас, Контакты) ✅
- [ ] Поиск с автодополнением ✅
- [ ] Мобильное меню (гамбургер) ✅

---

## 🎯 ОЖИДАЕМЫЙ РЕЗУЛЬТАТ

После переноса:
- ✅ Галерея как в эталоне (мобильная + desktop)
- ✅ Форма бронирования работает
- ✅ Desktop sidebar прилипает
- ✅ Header с меню и поиском
- ✅ Все 23 критерия выполнены
- ✅ 100% соответствие эталону

---

**НАЧИНАЕМ ПЕРЕНОС!** 🚀
