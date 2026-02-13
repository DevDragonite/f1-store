import { memo } from 'react'
import { Link } from 'react-router-dom'
import useCartStore from '../../stores/useCartStore'
import { getProductById } from '../../data/products'
import { getAssetUrl } from '../../utils/assets'

const ProductCard = memo(function ProductCard({ product }) {
    const { name, price, sku, image, tag, tagStyle, soldOut, id, slug } = product
    const addItem = useCartStore(s => s.addItem)

    const handleQuickAdd = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (soldOut) return
        const fullProduct = getProductById(id) || product
        addItem(fullProduct, fullProduct.sizes ? fullProduct.sizes[0] : null)
    }

    return (
        <Link
            to={`/producto/${slug}`}
            className={`block group relative bg-asphalt border border-white/5 overflow-hidden transition-all duration-300 ${soldOut ? 'opacity-75 hover:opacity-100' : 'hover:scale-[1.02]'} hover:z-20`}
        >
            <div className="hud-border absolute inset-0 pointer-events-none z-30"></div>

            {soldOut && (
                <div className="absolute top-0 right-0 z-40 overflow-hidden w-32 h-32 pointer-events-none">
                    <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-[family-name:var(--font-mono)] font-bold px-8 py-1 transform rotate-45 translate-x-8 translate-y-6 shadow-lg border-y border-black">
                        SIN_STOCK
                    </div>
                </div>
            )}

            <div className={`relative aspect-[4/5] bg-[#1e1e1e] overflow-hidden ${soldOut ? 'grayscale group-hover:grayscale-0 transition-all duration-500' : ''}`}>
                <img
                    src={getAssetUrl(image)}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 ${soldOut ? '' : 'opacity-90 group-hover:opacity-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-transparent opacity-80"></div>

                {/* Tags & Badges */}
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    {tag && (
                        <div className={`text-[10px] font-[family-name:var(--font-mono)] px-2 py-1 border backdrop-blur ${tagStyle}`}>
                            {tag}
                        </div>
                    )}
                    {(product.discount || 0) > 0 && !soldOut && (
                        <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 shadow-lg">
                            -{product.discount}% OFF
                        </div>
                    )}
                </div>
            </div>

            <div className="p-5 relative">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wide group-hover:text-technical-blue transition-colors">
                        {name}
                    </h3>
                    <div className="text-right">
                        {(product.discount || 0) > 0 ? (
                            <>
                                <div className="text-xs text-gray-500 line-through font-[family-name:var(--font-mono)]">
                                    ${Number(price).toFixed(2)}
                                </div>
                                <div className="text-sm text-green-400 font-bold font-[family-name:var(--font-mono)]">
                                    ${(price * (1 - product.discount / 100)).toFixed(2)}
                                </div>
                            </>
                        ) : (
                            <div className={`font-[family-name:var(--font-mono)] text-sm ${soldOut ? 'text-gray-500 line-through' : 'text-primary'}`}>
                                ${typeof price === 'number' ? price.toFixed(2) : price}
                            </div>
                        )}
                    </div>
                </div>
                <p className="text-xs text-gray-500 font-[family-name:var(--font-mono)] mb-4">{sku}</p>

                <div className={`absolute inset-x-0 bottom-0 bg-asphalt/95 backdrop-blur-xl border-t ${soldOut ? 'border-primary/30' : 'border-technical-blue/30'} p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-3 ${soldOut ? 'shadow-[0_-5px_20px_rgba(224,7,0,0.1)]' : 'shadow-[0_-5px_20px_rgba(0,240,255,0.1)]'}`}>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-[family-name:var(--font-mono)] text-gray-400 border-b border-white/10 pb-2">
                        {(product.specs || []).map((spec, i) => (
                            <span key={i} className={i % 2 !== 0 ? 'text-right' : ''}>
                                {spec}
                            </span>
                        ))}
                        {soldOut && (
                            <span className="text-red-500 col-span-2 text-center uppercase font-bold mt-1">STOCK_AGOTADO</span>
                        )}
                    </div>
                    <button
                        onClick={handleQuickAdd}
                        className={`w-full ${soldOut ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-red-600 text-white'} font-[family-name:var(--font-display)] uppercase text-sm font-bold py-2 tracking-wider flex items-center justify-center gap-2 group/btn`}
                        disabled={soldOut}
                    >
                        <span>{soldOut ? 'No Disponible' : 'Agregar al Carrito'}</span>
                        <span className={`material-icons text-sm ${soldOut ? '' : 'group-hover/btn:translate-x-1 transition-transform'}`}>
                            {soldOut ? 'lock' : 'arrow_forward'}
                        </span>
                    </button>
                </div>
            </div>
        </Link>
    )
})

export default ProductCard
