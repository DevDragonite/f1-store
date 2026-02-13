import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import useAuthStore from '../stores/useAuthStore'
import initialProducts from '../data/products' // For seeding

export default function DashboardPage() {
    const { user, signIn, signUp, signOut, loading: authLoading } = useAuthStore()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)
    const [authError, setAuthError] = useState('')
    const [activeTab, setActiveTab] = useState('pedidos')

    const handleAuth = async (e) => {
        e.preventDefault()
        setAuthError('')
        try {
            if (isSignUp) {
                await signUp(email, password, { role: 'admin' })
                alert('Cuenta creada. Revisa tu email para confirmar (si está activado) o inicia sesión.')
                setIsSignUp(false)
            } else {
                await signIn(email, password)
            }
        } catch (err) {
            setAuthError(err.message)
        }
    }

    if (authLoading) return <div className="min-h-screen bg-background-dark text-white flex items-center justify-center">Cargando...</div>

    if (!user) {
        return (
            <div className="min-h-screen bg-background-dark text-white flex items-center justify-center p-4">
                <div className="md:w-[400px] w-full bg-asphalt border border-white/10 p-8 relative">
                    <div className="hud-border absolute inset-0 pointer-events-none"></div>
                    <div className="text-center mb-8">
                        <span className="material-icons text-4xl text-primary mb-2">admin_panel_settings</span>
                        <h1 className="text-2xl font-bold uppercase tracking-widest">Acceso Admin</h1>
                        <p className="text-xs text-white/40 font-[family-name:var(--font-mono)] mt-2">Rennsport Internal System</p>
                    </div>
                    <form onSubmit={handleAuth} className="space-y-4">
                        <div>
                            <label className="block text-[10px] uppercase font-bold text-white/50 mb-1">Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 p-3 text-sm text-white focus:border-primary focus:outline-none" required />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase font-bold text-white/50 mb-1">Contraseña</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 p-3 text-sm text-white focus:border-primary focus:outline-none" required />
                        </div>
                        {authError && <p className="text-primary text-xs font-[family-name:var(--font-mono)]">{authError}</p>}
                        <button type="submit" className="w-full bg-primary hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest py-3 transition-colors">
                            {isSignUp ? 'Registrar Admin' : 'Iniciar Sesión'}
                        </button>
                    </form>
                    <button onClick={() => setIsSignUp(!isSignUp)} className="w-full text-center mt-4 text-[10px] text-white/30 hover:text-white transition-colors uppercase">
                        {isSignUp ? '¿Ya tienes cuenta? Inicia Sesión' : '¿Nueva cuenta? Crear Admin'}
                    </button>
                    <Link to="/" className="block text-center mt-6 text-[10px] text-white/30 hover:text-white transition-colors uppercase font-[family-name:var(--font-mono)]">
                        ← Volver a la tienda
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background-dark text-white font-sans">
            <header className="fixed top-0 left-0 w-full z-50 bg-carbon/95 backdrop-blur border-b border-white/10 h-16 flex items-center px-4 md:px-6 justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/" className="font-bold tracking-tighter text-lg md:text-xl italic">RENNSPORT<span className="text-primary">.SYS</span></Link>
                    <div className="hidden md:flex bg-white/5 rounded-full p-1 border border-white/10">
                        <button onClick={() => setActiveTab('pedidos')} className={`px-4 py-1 rounded-full text-xs font-bold uppercase transition-all ${activeTab === 'pedidos' ? 'bg-primary text-white' : 'text-white/50 hover:text-white'}`}>Pedidos</button>
                        <button onClick={() => setActiveTab('inventario')} className={`px-4 py-1 rounded-full text-xs font-bold uppercase transition-all ${activeTab === 'inventario' ? 'bg-primary text-white' : 'text-white/50 hover:text-white'}`}>Inventario</button>
                    </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="hidden md:block text-[10px] font-[family-name:var(--font-mono)] text-white/50">{user.email}</span>
                    <button onClick={signOut} className="text-[10px] bg-white/10 hover:bg-white/20 px-3 py-1.5 border border-white/10 transition-colors uppercase font-bold">Salir</button>
                </div>
            </header>

            {/* Mobile Tabs */}
            <div className="md:hidden fixed top-16 left-0 w-full z-40 bg-carbon/95 backdrop-blur border-b border-white/10 flex">
                <button onClick={() => setActiveTab('pedidos')} className={`flex-1 py-3 text-xs font-bold uppercase border-b-2 transition-colors ${activeTab === 'pedidos' ? 'border-primary text-white' : 'border-transparent text-white/40'}`}>Pedidos</button>
                <button onClick={() => setActiveTab('inventario')} className={`flex-1 py-3 text-xs font-bold uppercase border-b-2 transition-colors ${activeTab === 'inventario' ? 'border-primary text-white' : 'border-transparent text-white/40'}`}>Inventario</button>
            </div>

            <main className="pt-28 md:pt-24 pb-16 px-4 md:px-8 max-w-[1400px] mx-auto">
                {activeTab === 'pedidos' ? <OrdersTab /> : <InventoryTab />}
            </main>
        </div>
    )
}

/* ── Orders Tab ── */
function OrdersTab() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('todos')

    useEffect(() => {
        fetchOrders()
        const sub = supabase.channel('orders').on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrders).subscribe()
        return () => supabase.removeChannel(sub)
    }, [])

    const fetchOrders = async () => {
        const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
        if (data) setOrders(data)
        setLoading(false)
    }

    const advanceStatus = async (order) => {
        const flow = { 'pendiente': 'reserva', 'reserva': 'en_camino', 'en_camino': 'entregado' }
        const next = flow[order.status]
        if (!next) return
        await supabase.from('orders').update({ status: next }).eq('id', order.id)
        fetchOrders() // Optimistic update ideally, but fetch is safe
    }

    const filtered = filter === 'todos' ? orders : orders.filter(o => o.status === filter)
    const kpis = {
        total: orders.length,
        pendiente: orders.filter(o => o.status === 'pendiente').length,
        reserva: orders.filter(o => o.status === 'reserva').length,
        en_camino: orders.filter(o => o.status === 'en_camino').length,
        ingresos: orders.filter(o => o.status !== 'cancelado').reduce((acc, o) => acc + (o.total || 0), 0)
    }

    if (loading) return <div className="text-center py-20 text-white/30 text-xs font-[family-name:var(--font-mono)]">CARGANDO_PEDIDOS...</div>

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { label: 'Total Pedidos', val: kpis.total, color: 'text-white' },
                    { label: 'Pendientes', val: kpis.pendiente, color: 'text-yellow-400' },
                    { label: 'Reservas', val: kpis.reserva, color: 'text-blue-400' },
                    { label: 'En Camino', val: kpis.en_camino, color: 'text-purple-400' },
                    { label: 'Ingresos Totales', val: `$${kpis.ingresos.toFixed(2)}`, color: 'text-green-400' }
                ].map((k, i) => (
                    <div key={i} className="bg-asphalt border border-white/10 p-4">
                        <p className="text-[10px] text-white/40 uppercase mb-1">{k.label}</p>
                        <p className={`text-2xl font-bold font-[family-name:var(--font-mono)] ${k.color}`}>{k.val}</p>
                    </div>
                ))}
            </div>

            <div className="flex gap-2 border-b border-white/10 pb-4 overflow-x-auto">
                {['todos', 'pendiente', 'reserva', 'en_camino', 'entregado', 'cancelado'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 text-xs font-bold uppercase border ${filter === f ? 'bg-white text-black border-white' : 'text-white/40 border-transparent hover:text-white'}`}>
                        {f.replace('_', ' ')}
                    </button>
                ))}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[10px] uppercase text-white/40 border-b border-white/10">
                            <th className="p-3">ID / Fecha</th>
                            <th className="p-3">Cliente</th>
                            <th className="p-3">Items</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Estado</th>
                            <th className="p-3">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-[family-name:var(--font-mono)]">
                        {filtered.map(o => (
                            <tr key={o.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-3">
                                    <span className="text-primary block">#{o.id.slice(0, 8).toUpperCase()}</span>
                                    <span className="text-xs text-white/40">{new Date(o.created_at).toLocaleDateString()}</span>
                                </td>
                                <td className="p-3">
                                    <div className="font-bold">{o.customer_name}</div>
                                    <div className="text-xs text-white/40">{o.customer_email}</div>
                                </td>
                                <td className="p-3 text-xs text-white/60">
                                    {o.items?.map(i => `${i.name} (x${i.qty})`).join(', ') || 'Sin items'}
                                </td>
                                <td className="p-3">${o.total}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-[10px] uppercase font-bold border ${o.status === 'entregado' ? 'border-green-500 text-green-500 bg-green-500/10' :
                                            o.status === 'pendiente' ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' :
                                                'border-white/20 text-white/60'
                                        }`}>
                                        {o.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="p-3">
                                    {o.status !== 'entregado' && o.status !== 'cancelado' && (
                                        <button onClick={() => advanceStatus(o)} className="text-[10px] bg-primary hover:bg-red-600 text-white px-3 py-1 font-bold uppercase transition-colors">
                                            → Avanzar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && <div className="text-center py-10 text-white/30 text-xs text-[10px]">NO SE ENCONTRARON PEDIDOS</div>}
            </div>
        </div>
    )
}

/* ── Inventory Tab ── */
function InventoryTab() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const { data } = await supabase.from('products').select('*').order('name')
        if (data) setProducts(data)
        setLoading(false)
    }

    const updateStock = async (id, delta, current) => {
        const newStock = Math.max(0, current + delta)
        await supabase.from('products').update({ stock: newStock }).eq('id', id)
        fetchProducts()
    }

    const toggleStatus = async (id, currentSoldOut) => {
        await supabase.from('products').update({ sold_out: !currentSoldOut }).eq('id', id)
        fetchProducts()
    }

    const seedDatabase = async () => {
        if (!confirm('¿Seguro quieres resetear la base de datos con los productos iniciales? Esto podría duplicar si no está limpia.')) return
        try {
            setLoading(true)
            const mapped = initialProducts.map(p => ({
                id: p.id,
                name: p.name,
                slug: p.slug,
                price: p.price,
                sku: p.sku,
                team: p.team,
                category: p.category,
                image: p.image,
                image_lg: p.imageLg,
                description: p.description,
                specs: p.specs,
                sizes: p.sizes,
                stock: 50,
                sold_out: p.soldOut,
                tag: p.tag,
                tag_style: p.tagStyle
            }))

            const { error } = await supabase.from('products').upsert(mapped)
            if (error) throw error
            alert('Base de datos poblada con éxito!')
            fetchProducts()
        } catch (e) {
            alert('Error al poblar DB: ' + e.message)
            setLoading(false)
        }
    }

    if (loading) return <div className="text-center py-20 text-white/30 text-xs font-[family-name:var(--font-mono)]">CARGANDO_INVENTARIO...</div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-asphalt border border-white/10 p-4">
                <div>
                    <h2 className="text-lg font-bold">Gestión de Inventario</h2>
                    <p className="text-xs text-white/40">Control de stock y visibilidad de productos</p>
                </div>
                {products.length === 0 && (
                    <button onClick={seedDatabase} className="bg-primary hover:bg-green-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                        <span className="material-icons text-sm">database</span> Inicializar DB (Seed)
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(p => (
                    <div key={p.id} className={`bg-asphalt border p-4 relative group ${p.sold_out ? 'border-red-500/30' : 'border-white/10'}`}>
                        <div className="flex gap-4">
                            <img src={p.image} alt={p.name} className={`w-16 h-16 object-cover ${p.sold_out ? 'grayscale' : ''}`} />
                            <div className="flex-1">
                                <h3 className="font-bold text-sm truncate">{p.name}</h3>
                                <p className="text-[10px] text-white/40 font-[family-name:var(--font-mono)] mb-2">{p.sku}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-primary font-bold">${p.price}</span>
                                    <span className={`text-[10px] uppercase px-2 py-0.5 border ${p.sold_out ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}>
                                        {p.sold_out ? 'Agotado' : 'Activo'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase text-white/40">Stock:</span>
                                <button onClick={() => updateStock(p.id, -1, p.stock)} className="w-6 h-6 bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10">-</button>
                                <span className="w-8 text-center font-[family-name:var(--font-mono)] text-sm">{p.stock}</span>
                                <button onClick={() => updateStock(p.id, 1, p.stock)} className="w-6 h-6 bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10">+</button>
                            </div>
                            <button onClick={() => toggleStatus(p.id, p.sold_out)} className="text-[10px] underline text-white/30 hover:text-white">
                                {p.sold_out ? 'Activar Producto' : 'Marcar Agotado'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {products.length === 0 && <div className="text-center py-20 text-white/30">No hay productos. Usa el botón de Seed para comenzar.</div>}
        </div>
    )
}
