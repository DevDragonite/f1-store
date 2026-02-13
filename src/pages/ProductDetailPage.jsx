import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import useCartStore from '../stores/useCartStore'
import useProduct from '../hooks/useProduct'
import useSEO from '../hooks/useSEO'

export default function ProductDetailPage() {
    const { slug } = useParams()
    const { product, loading, error } = useProduct(slug)
    const addItem = useCartStore(s => s.addItem)
    const [selectedSize, setSelectedSize] = useState(null)
    const [added, setAdded] = useState(false)

    useSEO(product ? product.name : 'Cargando...', product ? product.description : '')

    if (loading) {
        return (
            <div className="bg-background-dark min-h-screen text-white">
                <Navbar />
                <div className="pt-32 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                        <span className="text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest text-white/50">Cargando_Datos...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="bg-background-dark min-h-screen text-white">
                <Navbar />
                <div className="pt-32 text-center px-6">
                    <span className="material-icons text-6xl text-white/10 mb-4 block">error_outline</span>
                    <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
                    <p className="text-white/50 mb-6 text-sm max-w-md mx-auto">
                        Es posible que el enlace sea incorrecto o que el producto haya sido retirado del catálogo.
                    </p>
                    <Link to="/catalog" className="text-primary hover:underline font-[family-name:var(--font-mono)] text-sm">← Volver al catálogo</Link>
                </div>
            </div>
        )
    }

    const handleAddToCart = () => {
        if (product.sizes && !selectedSize) return
        addItem(product, selectedSize)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <div className="bg-background-dark min-h-screen text-white">
            <Navbar />
            <main className="pt-28 pb-20 px-6 max-w-[1200px] mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-mono)] text-white/30 mb-8">
                    <Link to="/" className="hover:text-primary transition-colors">INICIO</Link>
                    <span>/</span>
                    <Link to="/catalog" className="hover:text-primary transition-colors">CATÁLOGO</Link>
                    <span>/</span>
                    <span className="text-white/60">{product.sku}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image */}
                    <div className="relative bg-asphalt border border-white/10 overflow-hidden group">
                        <div className="hud-border absolute inset-0 pointer-events-none z-10"></div>
                        {product.soldOut && (
                            <div className="absolute top-6 right-6 z-20 bg-primary text-white text-xs font-[family-name:var(--font-mono)] font-bold px-4 py-1.5 border border-black/30">
                                SIN_STOCK
                            </div>
                        )}
                        {product.tag && (
                            <div className={`absolute top-6 left-6 z-20 text-[10px] font-[family-name:var(--font-mono)] px-2.5 py-1 border backdrop-blur ${product.tagStyle}`}>
                                {product.tag}
                            </div>
                        )}
                        <img
                            src={product.imageLg}
                            alt={product.name}
                            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <p className="font-[family-name:var(--font-mono)] text-[10px] text-primary tracking-widest mb-2">{product.team}</p>
                        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-2">{product.name}</h1>
                        <p className="font-[family-name:var(--font-mono)] text-xs text-white/30 mb-6">{product.sku}</p>

                        <div className={`text-3xl font-bold mb-6 font-[family-name:var(--font-mono)] ${product.soldOut ? 'text-white/30 line-through' : 'text-primary'}`}>
                            ${product.price.toFixed(2)}
                        </div>

                        <p className="text-white/60 leading-relaxed mb-8 border-l-2 border-white/10 pl-4">{product.description}</p>

                        {/* Sizes */}
                        {product.sizes && (
                            <div className="mb-8">
                                <h3 className="text-xs uppercase tracking-widest text-white/40 mb-3 font-[family-name:var(--font-mono)]">Talla</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`min-w-[48px] h-10 px-3 border text-sm font-[family-name:var(--font-mono)] transition-all ${selectedSize === size
                                                ? 'border-primary bg-primary/20 text-white shadow-[0_0_10px_rgba(224,7,0,0.3)]'
                                                : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {product.sizes && !selectedSize && (
                                    <p className="text-[10px] font-[family-name:var(--font-mono)] text-white/20 mt-2">Selecciona una talla</p>
                                )}
                            </div>
                        )}

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            disabled={product.soldOut || (product.sizes && !selectedSize)}
                            className={`w-full md:w-auto px-10 py-4 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${product.soldOut
                                ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10'
                                : added
                                    ? 'bg-green-600 text-white border border-green-500'
                                    : 'bg-primary hover:bg-red-600 text-white border border-primary hover:shadow-[0_4px_20px_rgba(225,6,0,0.3)]'
                                }`}
                        >
                            <span className="material-icons text-sm">
                                {product.soldOut ? 'lock' : added ? 'check_circle' : 'shopping_bag'}
                            </span>
                            {product.soldOut ? 'No Disponible' : added ? '¡Agregado!' : 'Agregar al Carrito'}
                        </button>

                        {/* Specs Grid */}
                        <div className="mt-10 border-t border-white/10 pt-6">
                            <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-[family-name:var(--font-mono)]">Especificaciones</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {product.specs.map((spec, i) => (
                                    <div key={i} className="bg-black/30 border border-white/5 px-3 py-2 font-[family-name:var(--font-mono)] text-[11px] text-white/50">
                                        {spec}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
