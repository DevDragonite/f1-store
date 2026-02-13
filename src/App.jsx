import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import CustomCursor from './components/TireTrackCursor'
import HomePage from './pages/HomePage'
import useAuthStore from './stores/useAuthStore'

/* Lazy-load all secondary pages for fast initial load */
const CatalogPage = lazy(() => import('./pages/CatalogPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const EditorialPage = lazy(() => import('./pages/EditorialPage'))
const ThePitPage = lazy(() => import('./pages/ThePitPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background-dark">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      <span className="font-[family-name:var(--font-mono)] text-xs text-white/40 uppercase tracking-widest">Cargando_Módulo...</span>
    </div>
  </div>
)

function App() {
  const initAuth = useAuthStore(s => s.initialize)
  useEffect(() => { initAuth() }, [initAuth])

  return (
    <BrowserRouter>
      <CustomCursor />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/producto/:slug" element={<ProductDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/editorial" element={<EditorialPage />} />
          <Route path="/the-pit" element={<ThePitPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
