import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import useCartStore from '../stores/useCartStore'
import { supabase } from '../lib/supabase'
import useSEO from '../hooks/useSEO'

const PAYMENT_METHODS = [
    { key: 'pago_movil', label: 'Pago Móvil', icon: 'phone_android', desc: 'Transferencia instantánea' },
    { key: 'transferencia', label: 'Transferencia Bancaria', icon: 'account_balance', desc: 'Depósito a cuenta Rennsport' },
    { key: 'zelle', label: 'Zelle', icon: 'currency_exchange', desc: 'Pago en USD' },
]

const VE_STATES = [
    'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar',
    'Carabobo', 'Cojedes', 'Delta Amacuro', 'Distrito Capital', 'Falcón',
    'Guárico', 'Lara', 'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta',
    'Portuguesa', 'Sucre', 'Táchira', 'Trujillo', 'Vargas', 'Yaracuy', 'Zulia',
]

export default function CheckoutPage() {
    useSEO('Checkout', 'Completa tu compra en Rennsport. Envío gratis a toda Venezuela.')
    const items = useCartStore(s => s.items)
    const clearCart = useCartStore(s => s.clearCart)
    const navigate = useNavigate()

    const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0)
    const iva = subtotal * 0.16
    const total = subtotal + iva

    const [form, setForm] = useState({
        name: '', email: '', phone: '',
        address: '', city: '', state: 'Distrito Capital',
        payment: 'pago_movil', reference: '', notes: '',
    })
    const [step, setStep] = useState(1) // 1=datos, 2=pago, 3=confirmado
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [orderId, setOrderId] = useState(null)

    const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

    const handleSubmitOrder = async () => {
        setSubmitting(true)
        setError('')
        try {
            const orderData = {
                customer_name: form.name,
                customer_email: form.email,
                customer_phone: form.phone,
                shipping_address: form.address,
                shipping_city: form.city,
                shipping_state: form.state,
                payment_method: form.payment,
                payment_reference: form.reference,
                notes: form.notes,
                items: items.map(i => ({
                    id: i.id, name: i.name, sku: i.sku,
                    size: i.size, qty: i.qty, price: i.price,
                    image: i.image,
                })),
                subtotal,
                tax: iva,
                total,
                status: 'pendiente',
            }

            const { data, error: dbError } = await supabase.from('orders').insert(orderData).select().single()
            if (dbError) throw dbError

            setOrderId(data.id.slice(0, 8).toUpperCase())
            clearCart()
            setStep(3)
        } catch (err) {
            setError(err.message || 'Error al procesar el pedido')
        } finally {
            setSubmitting(false)
        }
    }

    // Redirect if cart is empty and not on confirmation
    if (items.length === 0 && step !== 3) {
        return (
            <div className="bg-background-dark min-h-screen text-white">
                <Navbar />
                <div className="pt-32 text-center px-6">
                    <span className="material-icons text-6xl text-white/10 mb-4 block">shopping_cart</span>
                    <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
                    <Link to="/catalog" className="text-primary hover:underline font-[family-name:var(--font-mono)] text-sm">← Volver al catálogo</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-background-dark min-h-screen text-white">
            <Navbar />
            <main className="pt-28 pb-20 px-6 max-w-[900px] mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <p className="font-[family-name:var(--font-mono)] text-xs text-primary tracking-widest mb-3">/// CHECKOUT</p>
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Finalizar Compra</h1>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2 mb-10">
                    {['Datos de Envío', 'Método de Pago', 'Confirmación'].map((label, i) => (
                        <div key={label} className="flex items-center gap-2 flex-1">
                            <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold border transition-all ${step > i + 1 ? 'bg-green-500 border-green-500 text-white' :
                                    step === i + 1 ? 'bg-primary border-primary text-white' :
                                        'border-white/20 text-white/30'
                                }`}>
                                {step > i + 1 ? '✓' : i + 1}
                            </div>
                            <span className={`text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider hidden md:block ${step === i + 1 ? 'text-white' : 'text-white/30'
                                }`}>{label}</span>
                            {i < 2 && <div className={`flex-1 h-[1px] ${step > i + 1 ? 'bg-green-500' : 'bg-white/10'}`}></div>}
                        </div>
                    ))}
                </div>

                {/* Step 1: Shipping Data */}
                {step === 1 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-asphalt border border-white/10 p-6 relative">
                                <div className="hud-border absolute inset-0 pointer-events-none z-10"></div>
                                <h2 className="font-bold uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                                    <span className="material-icons text-primary text-sm">local_shipping</span>Datos de Envío
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-[family-name:var(--font-mono)] text-white/40 uppercase mb-1">Nombre Completo *</label>
                                        <input value={form.name} onChange={e => update('name', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary transition-colors font-[family-name:var(--font-mono)]"
                                            placeholder="Tu nombre" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-[family-name:var(--font-mono)] text-white/40 uppercase mb-1">Email *</label>
                                        <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary transition-colors font-[family-name:var(--font-mono)]"
                                            placeholder="tu@email.com" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-[family-name:var(--font-mono)] text-white/40 uppercase mb-1">Teléfono</label>
                                        <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary transition-colors font-[family-name:var(--font-mono)]"
                                            placeholder="+58 412 1234567" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-[family-name:var(--font-mono)] text-white/40 uppercase mb-1">Dirección *</label>
                                        <input value={form.address} onChange={e => update('address', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary transition-colors font-[family-name:var(--font-mono)]"
                                            placeholder="Calle, número, urbanización" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-[family-name:var(--font-mono)] text-white/40 uppercase mb-1">Ciudad *</label>
                                        <input value={form.city} onChange={e => update('city', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary transition-colors font-[family-name:var(--font-mono)]"
                                            placeholder="Caracas" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-[family-name:var(--font-mono)] text-white/40 uppercase mb-1">Estado</label>
                                        <select value={form.state} onChange={e => update('state', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors font-[family-name:var(--font-mono)]">
                                            {VE_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-[family-name:var(--font-mono)] text-white/40 uppercase mb-1">Notas (opcional)</label>
                                        <textarea value={form.notes} onChange={e => update('notes', e.target.value)} rows={2}
                                            className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary transition-colors font-[family-name:var(--font-mono)] resize-none"
                                            placeholder="Instrucciones especiales de envío..." />
                                    </div>
                                </div>
                                <button
                                    onClick={() => { if (form.name && form.email && form.address && form.city) setStep(2); else setError('Completa los campos obligatorios') }}
                                    className="mt-6 w-full bg-primary hover:bg-red-600 text-white font-bold text-sm uppercase tracking-widest py-3 transition-colors flex items-center justify-center gap-2">
                                    Continuar al Pago <span className="material-icons text-sm">arrow_forward</span>
                                </button>
                                {error && <p className="mt-3 text-primary text-xs font-[family-name:var(--font-mono)] flex items-center gap-1"><span className="material-icons text-sm">error</span>{error}</p>}
                            </div>
                        </div>

                        {/* Order Summary sidebar */}
                        <OrderSummary items={items} subtotal={subtotal} iva={iva} total={total} />
                    </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-asphalt border border-white/10 p-6 relative">
                                <div className="hud-border absolute inset-0 pointer-events-none z-10"></div>
                                <h2 className="font-bold uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                                    <span className="material-icons text-primary text-sm">payment</span>Método de Pago
                                </h2>
                                <div className="space-y-3 mb-6">
                                    {PAYMENT_METHODS.map(pm => (
                                        <button key={pm.key} onClick={() => update('payment', pm.key)}
                                            className={`w-full flex items-center gap-4 p-4 border transition-all text-left ${form.payment === pm.key ? 'border-primary bg-primary/10' : 'border-white/10 hover:border-white/20'
                                                }`}>
                                            <span className={`material-icons text-2xl ${form.payment === pm.key ? 'text-primary' : 'text-white/30'}`}>{pm.icon}</span>
                                            <div>
                                                <p className="font-bold text-sm">{pm.label}</p>
                                                <p className="text-[10px] font-[family-name:var(--font-mono)] text-white/40">{pm.desc}</p>
                                            </div>
                                            {form.payment === pm.key && <span className="material-icons text-primary ml-auto">check_circle</span>}
                                        </button>
                                    ))}
                                </div>

                                {/* Payment Details */}
                                <div className="bg-black/30 border border-white/5 p-4 mb-6">
                                    <p className="text-xs font-[family-name:var(--font-mono)] text-white/60 mb-3">
                                        {form.payment === 'pago_movil' && '📱 Envía tu pago a: 0412-XXXXXXX / CI: V-XXXXXXXX / Banco: Banesco'}
                                        {form.payment === 'transferencia' && '🏦 Cuenta: 0134-XXXX-XXXX-XXXXXX / Banco: Banesco / RIF: J-XXXXXXXX'}
                                        {form.payment === 'zelle' && '💵 Envía tu pago Zelle a: pagos@rennsport.ve'}
                                    </p>
                                    <label className="block text-[10px] font-[family-name:var(--font-mono)] text-white/40 uppercase mb-1">N° de Referencia</label>
                                    <input value={form.reference} onChange={e => update('reference', e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary transition-colors font-[family-name:var(--font-mono)]"
                                        placeholder="Ingresa el número de referencia del pago" />
                                </div>

                                <div className="flex gap-3">
                                    <button onClick={() => setStep(1)}
                                        className="flex-1 border border-white/20 text-white/60 hover:text-white hover:border-white/40 font-bold text-sm uppercase tracking-widest py-3 transition-colors flex items-center justify-center gap-2">
                                        <span className="material-icons text-sm">arrow_back</span>Volver
                                    </button>
                                    <button onClick={handleSubmitOrder} disabled={submitting}
                                        className="flex-[2] bg-primary hover:bg-red-600 text-white font-bold text-sm uppercase tracking-widest py-3 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                                        {submitting ? (
                                            <><span className="material-icons text-sm animate-spin">autorenew</span>Procesando...</>
                                        ) : (
                                            <><span className="material-icons text-sm">lock</span>Confirmar Pedido — ${total.toFixed(2)}</>
                                        )}
                                    </button>
                                </div>
                                {error && <p className="mt-3 text-primary text-xs font-[family-name:var(--font-mono)] flex items-center gap-1"><span className="material-icons text-sm">error</span>{error}</p>}
                            </div>
                        </div>
                        <OrderSummary items={items} subtotal={subtotal} iva={iva} total={total} />
                    </div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && (
                    <div className="text-center py-10">
                        <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                            <span className="material-icons text-green-400 text-4xl">check_circle</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-2">¡Pedido Confirmado!</h2>
                        <p className="text-white/50 mb-6 max-w-md mx-auto">
                            Tu pedido ha sido registrado. Te enviaremos actualizaciones por email a <span className="text-white">{form.email}</span>.
                        </p>
                        <div className="inline-block bg-asphalt border border-white/10 px-8 py-4 mb-8">
                            <p className="text-[10px] font-[family-name:var(--font-mono)] text-white/40 mb-1">NÚMERO DE PEDIDO</p>
                            <p className="text-2xl font-bold font-[family-name:var(--font-mono)] text-primary tracking-widest">PED-{orderId}</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 justify-center">
                            <Link to="/catalog" className="bg-primary hover:bg-red-600 text-white font-bold text-sm uppercase tracking-widest px-8 py-3 transition-colors inline-flex items-center justify-center gap-2">
                                Seguir Comprando <span className="material-icons text-sm">arrow_forward</span>
                            </Link>
                            <Link to="/" className="border border-white/20 text-white/60 hover:text-white hover:border-white/40 font-bold text-sm uppercase tracking-widest px-8 py-3 transition-colors inline-flex items-center justify-center gap-2">
                                Volver al Inicio
                            </Link>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    )
}

/* ── Reusable Order Summary ── */
function OrderSummary({ items, subtotal, iva, total }) {
    return (
        <div className="bg-asphalt border border-white/10 p-6 h-fit sticky top-28">
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4 flex items-center gap-2">
                <span className="material-icons text-primary text-sm">receipt</span>Resumen
            </h3>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map(item => (
                    <div key={item.key} className="flex gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover border border-white/5" />
                        <div className="flex-1">
                            <p className="text-xs font-bold text-white/80">{item.name}</p>
                            <p className="text-[10px] font-[family-name:var(--font-mono)] text-white/30">{item.size ? `${item.size} — ` : ''}×{item.qty}</p>
                        </div>
                        <span className="text-xs font-[family-name:var(--font-mono)] text-white/60">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="border-t border-white/10 pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-white/50">Subtotal</span><span className="font-[family-name:var(--font-mono)]">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Envío</span><span className="font-[family-name:var(--font-mono)] text-green-400">GRATIS</span></div>
                <div className="flex justify-between"><span className="text-white/50">IVA (16%)</span><span className="font-[family-name:var(--font-mono)]">${iva.toFixed(2)}</span></div>
            </div>
            <div className="border-t border-white/10 mt-3 pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary font-[family-name:var(--font-mono)]">${total.toFixed(2)}</span>
            </div>
        </div>
    )
}
