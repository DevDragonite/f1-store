import { memo } from 'react'

const products = [
    {
        name: 'Hoodie Racing Scuderia',
        description: 'Algodón Premium / Edición Roja',
        price: '$120',
        badge: 'Nueva Temporada',
        badgeStyle: 'bg-primary/90 text-white',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80&auto=format',
        offset: false,
    },
    {
        name: 'Gorra Paddock',
        description: 'Snapback Ajustable / Logo Bordado',
        price: '$45',
        badge: null,
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=800&q=80&auto=format',
        offset: true,
    },
    {
        name: 'Chaqueta Bomber Pit Crew',
        description: 'Nylon / Forro Térmico',
        price: '$280',
        badge: 'Más Vendido',
        badgeStyle: 'bg-white/10 backdrop-blur-md text-white border border-white/20',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80&auto=format',
        offset: false,
    },
    {
        name: 'Franela Grid Walk',
        description: 'Jersey Suave / Estampado Circuito',
        price: '$55',
        badge: null,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80&auto=format',
        offset: true,
    },
]

const ProductCard = memo(function ProductCard({ product }) {
    return (
        <div className={`min-w-[300px] md:min-w-[400px] snap-center group cursor-pointer ${product.offset ? 'mt-0 md:mt-12' : ''}`}>
            <div className="relative aspect-[3/4] overflow-hidden technical-border">
                {product.badge && (
                    <div className={`absolute top-4 left-4 z-10 text-[10px] font-bold px-2 py-1 uppercase tracking-widest ${product.badgeStyle}`}>
                        {product.badge}
                    </div>
                )}
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-3 uppercase text-xs font-bold tracking-widest hover:bg-primary hover:text-white transition-colors">
                        Vista Rápida
                    </span>
                </div>
            </div>
            <div className="mt-6 flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-medium text-white mb-1">{product.name}</h3>
                    <p className="text-white/40 text-sm">{product.description}</p>
                </div>
                <div className="text-right">
                    <p className="text-primary font-bold text-lg">{product.price}</p>
                </div>
            </div>
        </div>
    )
})

export default function NewArrivals() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl text-white mb-2">Nuevos Lanzamientos</h2>
                        <p className="text-white/50 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest">/// Temporada 24.1</p>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <button className="w-12 h-12 border border-white/10 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all rounded-full">
                            <span className="material-symbols-outlined text-white">west</span>
                        </button>
                        <button className="w-12 h-12 border border-white/10 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all rounded-full">
                            <span className="material-symbols-outlined text-white">east</span>
                        </button>
                    </div>
                </div>

                <div className="flex overflow-x-auto gap-8 pb-10 hide-scrollbar snap-x">
                    {products.map((product) => (
                        <ProductCard key={product.name} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
