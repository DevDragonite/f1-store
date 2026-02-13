import { memo, useState, useCallback } from 'react'

const products = [
    {
        name: 'Suéter Scuderia Ferrari',
        description: 'Algodón 400g / Rojo Racing',
        price: '$120',
        badge: 'Lo Más Hot',
        badgeStyle: 'bg-primary/90 text-white',
        image: '/Images/Ferrari/Scuderia-Ferrari-Sweater-2.png',
    },
    {
        name: 'Gorra McLaren',
        description: 'Snapback / Papaya Oficial',
        price: '$45',
        badge: null,
        image: '/Images/McLaren/Gorra-McLaren.png',
    },
    {
        name: 'Chaqueta Red Bull Racing',
        description: 'Nylon Ripstop / Forro Térmico',
        price: '$180',
        badge: 'Más Vendido',
        badgeStyle: 'bg-white/10 backdrop-blur-md text-white border border-white/20',
        image: '/Images/Red-Bull-Racing-Team/Chaqueta-Red-Bull.png',
    },
    {
        name: 'Polo Checo Pérez Cadillac',
        description: 'Piqué Técnico / Edición Piloto',
        price: '$75',
        badge: 'Nuevo Equipo',
        badgeStyle: 'bg-technical-blue/10 text-technical-blue border border-technical-blue/30',
        image: '/Images/Cadillac-F1-Team/Checo-Perez-Polo-Cadillac.png',
    },
    {
        name: 'Suéter Aston Martin',
        description: 'Algodón Premium / Verde Racing',
        price: '$110',
        badge: 'Recién Llegado',
        badgeStyle: 'bg-green-500/20 text-green-400 border border-green-500/30',
        image: '/Images/Aston-Martin/Sueter-Aston-Martin.png',
    },
]

/* Slot config: position index → visual properties */
const SLOT_STYLES = [
    // Far left (hidden behind left flanking)
    { x: '-60%', scale: 0.55, z: -200, opacity: 0, blur: 8 },
    // Left flanking
    { x: '-42%', scale: 0.72, z: -100, opacity: 0.5, blur: 2 },
    // Center (active)
    { x: '0%', scale: 1, z: 0, opacity: 1, blur: 0 },
    // Right flanking
    { x: '42%', scale: 0.72, z: -100, opacity: 0.5, blur: 2 },
    // Far right (hidden behind right flanking)
    { x: '60%', scale: 0.55, z: -200, opacity: 0, blur: 8 },
]

function getSlotIndex(productIndex, activeIndex, total) {
    // Map product index to a slot (0-4) relative to activeIndex
    let diff = productIndex - activeIndex
    // Wrap around for infinite feel
    if (diff > Math.floor(total / 2)) diff -= total
    if (diff < -Math.floor(total / 2)) diff += total
    // diff: -2 → slot 0, -1 → slot 1, 0 → slot 2, 1 → slot 3, 2 → slot 4
    return diff + 2
}

const CarouselCard = memo(function CarouselCard({ product, slot }) {
    const style = SLOT_STYLES[slot]
    if (!style) return null

    return (
        <div
            className="absolute top-0 left-1/2 w-[280px] sm:w-[320px] md:w-[380px] cursor-pointer"
            style={{
                transform: `translateX(calc(-50% + ${style.x})) scale(${style.scale})`,
                zIndex: style.z + 200,
                opacity: style.opacity,
                filter: style.blur ? `blur(${style.blur}px)` : 'none',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: slot === 2 ? 'auto' : 'none',
            }}
        >
            <div className="relative aspect-[3/4] overflow-hidden technical-border bg-asphalt">
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
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <div className="mt-5 flex justify-between items-start px-1">
                <div>
                    <h3 className="text-lg font-medium text-white mb-1">{product.name}</h3>
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
    const [active, setActive] = useState(0)
    const total = products.length

    const goLeft = useCallback(() => {
        setActive(prev => (prev - 1 + total) % total)
    }, [total])

    const goRight = useCallback(() => {
        setActive(prev => (prev + 1) % total)
    }, [total])

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex items-end justify-between mb-16">
                    <div>
                        <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl text-white mb-2">Nuevos Lanzamientos</h2>
                        <p className="text-white/50 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest">/// Temporada 25.1</p>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative" style={{ perspective: '1200px' }}>
                    {/* Cards area */}
                    <div className="relative h-[480px] sm:h-[520px] md:h-[580px] w-full">
                        {products.map((product, i) => {
                            const slot = getSlotIndex(i, active, total)
                            if (slot < 0 || slot > 4) return null
                            return <CarouselCard key={product.name} product={product} slot={slot} />
                        })}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={goLeft}
                        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 border border-white/10 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all rounded-full backdrop-blur-sm bg-black/30 active:scale-90"
                        aria-label="Anterior"
                    >
                        <span className="material-symbols-outlined text-white">west</span>
                    </button>
                    <button
                        onClick={goRight}
                        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 border border-white/10 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all rounded-full backdrop-blur-sm bg-black/30 active:scale-90"
                        aria-label="Siguiente"
                    >
                        <span className="material-symbols-outlined text-white">east</span>
                    </button>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2 mt-6">
                        {products.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-primary' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                                aria-label={`Producto ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
