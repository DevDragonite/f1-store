import { useState, useMemo, useCallback } from 'react'
import Navbar from '../components/layout/Navbar'
import SidebarFilters from '../components/catalog/SidebarFilters'
import ProductCard from '../components/catalog/ProductCard'
import useProducts from '../hooks/useProducts'
import useSEO from '../hooks/useSEO'

export default function CatalogPage() {
    useSEO('Catálogo', 'Explora nuestro catálogo de merchandising F1. Envío gratis a toda Venezuela.')
    const { products, loading, error } = useProducts()

    // ── Filter State ──
    const [selectedTeams, setSelectedTeams] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [priceRange, setPriceRange] = useState([0, 500])

    const handleTeamToggle = useCallback((team) => {
        setSelectedTeams(prev =>
            prev.includes(team) ? prev.filter(t => t !== team) : [...prev, team]
        )
    }, [])

    const handleCategorySelect = useCallback((cat) => {
        setSelectedCategory(cat)
    }, [])

    const handlePriceChange = useCallback((range) => {
        setPriceRange(range)
    }, [])

    // ── Compute product counts per team (from unfiltered list) ──
    const productCounts = useMemo(() => {
        const counts = {}
        products.forEach(p => {
            if (p.team) counts[p.team] = (counts[p.team] || 0) + 1
        })
        return counts
    }, [products])

    // ── Apply Filters ──
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            // Team filter
            if (selectedTeams.length > 0 && !selectedTeams.includes(p.team)) return false
            // Category filter
            if (selectedCategory && p.category !== selectedCategory) return false
            // Price filter
            const price = typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0
            if (price < priceRange[0] || price > priceRange[1]) return false
            return true
        })
    }, [products, selectedTeams, selectedCategory, priceRange])

    if (loading) {
        return (
            <div className="bg-background-dark min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest text-white/50">Cargando_Inventario...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-background-dark min-h-screen text-white flex items-center justify-center p-6 text-center">
                <div>
                    <span className="material-icons text-4xl text-primary mb-4">error_outline</span>
                    <h2 className="text-xl font-bold mb-2">Error de Conexión</h2>
                    <p className="text-white/50 text-sm mb-4">No pudimos cargar el inventario. Verifica tu conexión.</p>
                    <button onClick={() => window.location.reload()} className="bg-white/10 hover:bg-white/20 px-4 py-2 text-xs uppercase tracking-widest font-bold transition-colors">Reintentar</button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-background-dark min-h-screen text-white">
            <Navbar />

            <div className="flex min-h-screen pt-16">
                <SidebarFilters
                    selectedTeams={selectedTeams}
                    onTeamToggle={handleTeamToggle}
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategorySelect}
                    priceRange={priceRange}
                    onPriceChange={handlePriceChange}
                    productCounts={productCounts}
                />

                <main className="flex-1 lg:ml-80 min-h-screen relative">
                    <div className="absolute inset-0 bg-grid pointer-events-none z-0"></div>

                    <div className="relative z-10 p-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-2">
                                    Catálogo de Pista
                                </h1>
                                <p className="font-[family-name:var(--font-mono)] text-sm text-gray-400">SECTOR 3 // INVENTARIO DE ALTO RENDIMIENTO</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center gap-4">
                                <div className="text-xs font-[family-name:var(--font-mono)] text-primary">
                                    [{filteredProducts.length}] PRODUCTOS
                                </div>
                            </div>
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div className="py-20 text-center">
                                <p className="text-white/40 text-sm mb-4">
                                    {products.length === 0
                                        ? 'Inventario vacío o sin inicializar.'
                                        : 'No hay productos que coincidan con los filtros seleccionados.'}
                                </p>
                                {products.length === 0 && (
                                    <p className="text-[10px] font-[family-name:var(--font-mono)] text-primary">ADMIN: Ve al Dashboard para correr el Seed DB.</p>
                                )}
                                {products.length > 0 && (
                                    <button
                                        onClick={() => {
                                            setSelectedTeams([])
                                            setSelectedCategory(null)
                                            setPriceRange([0, 500])
                                        }}
                                        className="text-xs font-[family-name:var(--font-mono)] text-primary border border-primary/30 px-4 py-2 hover:bg-primary/10 transition-colors"
                                    >
                                        Limpiar Filtros
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}
