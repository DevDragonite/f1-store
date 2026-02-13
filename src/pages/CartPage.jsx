import { Link } from 'react-router-dom'
import useCartStore from '../stores/useCartStore'
import Navbar from '../components/layout/Navbar'
import useSEO from '../hooks/useSEO'

export default function CartPage() {
    useSEO('Carrito', 'Tu carrito de compras Rennsport. Revisa tus productos y procede al pago.')
    const items = useCartStore(s => s.items)
    const updateQty = useCartStore(s => s.updateQty)
    const removeItem = useCartStore(s => s.removeItem)

    const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0)
    const iva = subtotal * 0.16
    const total = subtotal + iva

    return (
        <div className="bg-background-dark min-h-screen text-white">
            <Navbar />
            <main className="pt-28 pb-20 px-6 max-w-[1000px] mx-auto">
                <div className="mb-10">
                    <p className="font-[family-name:var(--font-mono)] text-xs text-primary tracking-widest mb-3">/// TU_GARAJE</p>
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Carrito de Compras</h1>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="material-icons text-6xl text-white/10 mb-4 block">shopping_bag</span>
                        <p className="text-white/40 mb-6">Tu garaje está vacío</p>
                        <Link to="/catalog" className="bg-primary text-white px-6 py-3 text-sm uppercase tracking-widest font-bold hover:bg-red-600 transition-colors inline-block">
                            Ver Catálogo →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Lista de productos */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div key={item.key} className="flex gap-4 bg-asphalt border border-white/10 p-4 relative group">
                                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover border border-white/5" loading="lazy" />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-white uppercase tracking-wide">{item.name}</h3>
                                            <p className="font-[family-name:var(--font-mono)] text-[10px] text-white/30">
                                                {item.sku}{item.size ? ` / Talla: ${item.size}` : ''}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQty(item.key, item.qty - 1)}
                                                    className="w-7 h-7 border border-white/20 text-white/50 hover:border-primary hover:text-primary text-sm flex items-center justify-center"
                                                >−</button>
                                                <span className="font-[family-name:var(--font-mono)] text-sm w-6 text-center">{item.qty}</span>
                                                <button
                                                    onClick={() => updateQty(item.key, item.qty + 1)}
                                                    className="w-7 h-7 border border-white/20 text-white/50 hover:border-primary hover:text-primary text-sm flex items-center justify-center"
                                                >+</button>
                                            </div>
                                            <span className="font-[family-name:var(--font-mono)] text-primary font-bold">${(item.price * item.qty).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.key)}
                                        className="absolute top-2 right-2 text-white/20 hover:text-primary transition-colors"
                                    >
                                        <span className="material-icons text-sm">close</span>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Resumen del Pedido */}
                        <div className="bg-asphalt border border-white/10 p-6 h-fit sticky top-28">
                            <h3 className="font-bold uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                                <span className="material-icons text-primary text-sm">receipt</span>
                                Resumen del Pedido
                            </h3>
                            <div className="space-y-3 text-sm border-b border-white/10 pb-4 mb-4">
                                <div className="flex justify-between"><span className="text-white/50">Subtotal</span><span className="font-[family-name:var(--font-mono)]">${subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span className="text-white/50">Envío</span><span className="font-[family-name:var(--font-mono)] text-accent-green">GRATIS</span></div>
                                <div className="flex justify-between"><span className="text-white/50">IVA (16%)</span><span className="font-[family-name:var(--font-mono)]">${iva.toFixed(2)}</span></div>
                            </div>
                            <div className="flex justify-between font-bold text-lg mb-6">
                                <span>Total</span>
                                <span className="text-primary font-[family-name:var(--font-mono)]">${total.toFixed(2)}</span>
                            </div>
                            <Link to="/checkout" className="w-full bg-primary hover:bg-red-600 text-white font-bold text-sm uppercase tracking-wider py-3 transition-colors flex items-center justify-center gap-2">
                                Proceder al Pago
                                <span className="material-icons text-sm">arrow_forward</span>
                            </Link>
                            <Link to="/catalog" className="block text-center mt-3 text-xs font-[family-name:var(--font-mono)] text-white/40 hover:text-primary transition-colors">
                                ← Seguir Comprando
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
