# 🏎️ Rennsport — F1 E-Commerce

Tienda online de merchandising premium inspirado en la Fórmula 1, diseñada para el mercado venezolano. Construida con React, Vite, Tailwind CSS y una estética de telemetría F1.

## ⚡ Tech Stack

- **Frontend:** React 19 + Vite
- **Estilos:** Tailwind CSS v4 + CSS custom (glassmorphism, HUD borders, scanlines)
- **Estado:** Zustand (carrito con persistencia en localStorage)
- **Routing:** React Router v7 (lazy loading por página)
- **Animaciones:** Framer Motion
- **Cursor:** Custom SVG cursor con detección de hover

## 📦 Estructura del Proyecto

```
src/
├── components/
│   ├── catalog/        # ProductCard, SidebarFilters
│   ├── home/           # HeroSection, NewArrivals, Engineering
│   └── layout/         # Navbar, Footer
├── data/
│   └── products.js     # Datos centralizados de productos
├── pages/
│   ├── HomePage.jsx         # Landing con video hero
│   ├── CatalogPage.jsx      # Catálogo con filtros y grid
│   ├── ProductDetailPage.jsx # Detalle con selector de talla
│   ├── CartPage.jsx          # Carrito funcional (Zustand)
│   ├── EditorialPage.jsx     # Artículos del paddock
│   ├── ThePitPage.jsx        # Centro de soporte
│   └── DashboardPage.jsx     # Admin (login requerido)
├── stores/
│   └── useCartStore.js  # Estado global del carrito
└── index.css            # Design system completo
```

## 🚀 Iniciar Proyecto

```bash
npm install
npm run dev
```

## 🔒 Panel Admin

Accede a `/dashboard` con:
- **Usuario:** `admin`
- **Contraseña:** `rennsport2024`

Gestión de pedidos: pendientes, reservas (sin stock), en camino, entregados.

## 📋 Funcionalidades

- ✅ Home page con video hero loop + fade transitions
- ✅ Catálogo con 6 productos F1, filtros por equipo/categoría/precio
- ✅ Detalle de producto con selector de talla
- ✅ Carrito persistente (localStorage) con IVA 16%
- ✅ Editorial — artículos del paddock
- ✅ Soporte — 6 categorías de ayuda
- ✅ Dashboard admin con gestión de pedidos
- ✅ Custom cursor con hover detection
- ✅ Code splitting (todas las páginas lazy-loaded)
- ✅ Todo el contenido en español 🇻🇪

---

Desarrollado con 🔴 por **Rennsport Engineering**
