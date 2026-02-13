import { useState } from 'react'
import products from '../data/products'

/* ── Admin credentials ── */
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'rennsport2024'

/* ── Sample order data ── */
const initialOrders = [
    { id: 'PED-00201', date: '2024-02-08', client: 'Carlos M.', product: 'Hoodie Velocidad V2', qty: 1, status: 'entregado', total: 120 },
    { id: 'PED-00198', date: '2024-02-07', client: 'María G.', product: 'Gorra Scuderia ×2', qty: 2, status: 'en_camino', total: 90 },
    { id: 'PED-00195', date: '2024-02-06', client: 'Andrés P.', product: 'Bomber Aero Pro', qty: 1, status: 'reserva', total: 280 },
    { id: 'PED-00190', date: '2024-02-05', client: 'Laura R.', product: 'LEGO Paddock Set', qty: 1, status: 'pendiente', total: 199 },
    { id: 'PED-00188', date: '2024-02-04', client: 'José V.', product: 'Franela Grid Walk ×3', qty: 3, status: 'entregado', total: 165 },
    { id: 'PED-00185', date: '2024-02-03', client: 'Daniela S.', product: 'Funko Chrono LTD', qty: 1, status: 'pendiente', total: 35 },
    { id: 'PED-00180', date: '2024-02-02', client: 'Miguel Á.', product: 'Hoodie Velocidad V2', qty: 1, status: 'reserva', total: 120 },
    { id: 'PED-00175', date: '2024-02-01', client: 'Ana C.', product: 'Gorra Scuderia', qty: 1, status: 'entregado', total: 45 },
]

const STATUS_CONFIG = {
    entregado: { label: 'Entregado', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/30', icon: 'check_circle' },
    en_camino: { label: 'En Camino', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30', icon: 'local_shipping' },
    pendiente: { label: 'Pendiente', color: 'text-technical-blue', bg: 'bg-technical-blue/10 border-technical-blue/30', icon: 'schedule' },
    reserva: { label: 'Reserva', color: 'text-primary', bg: 'bg-primary/10 border-primary/30', icon: 'inventory_2' },
}

const STATUS_FLOW = ['pendiente', 'reserva', 'en_camino', 'entregado']

const FILTER_TABS = [
    { key: 'todos', label: 'Todos', icon: 'list' },
    { key: 'pendiente', label: 'Pendientes', icon: 'schedule' },
    { key: 'reserva', label: 'Reservas', icon: 'inventory_2' },
    { key: 'en_camino', label: 'En Camino', icon: 'local_shipping' },
    { key: 'entregado', label: 'Entregados', icon: 'check_circle' },
]

/* ── Login Gate ── */
function AdminLogin({ onLogin }) {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user === ADMIN_USER && pass === ADMIN_PASS) onLogin()
        else setError('Credenciales incorrectas')
    }

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 mx-auto mb-6 border border-primary/50 flex items-center justify-center bg-primary/10 shadow-[0_0_30px_rgba(225,6,0,0.2)]">
                        <span className="material-icons text-primary text-3xl">admin_panel_settings</span>
                    </div>
                    <h1 className="text-3xl font-bold uppercase tracking-widest text-white mb-2">El Garaje</h1>
                    <p className="font-[family-name:var(--font-mono)] text-xs text-white/30 tracking-widest">PANEL DE ADMINISTRACIÓN</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-asphalt border border-white/10 p-8 space-y-6 relative">
                    <div className="hud-border absolute inset-0 pointer-events-none z-10"></div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-[family-name:var(--font-mono)]">Usuario</label>
                        <input type="text" value={user} onChange={(e) => { setUser(e.target.value); setError('') }} placeholder="admin"
                            className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary transition-colors font-[family-name:var(--font-mono)]" />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-[family-name:var(--font-mono)]">Contraseña</label>
                        <input type="password" value={pass} onChange={(e) => { setPass(e.target.value); setError('') }} placeholder="••••••••"
                            className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary transition-colors font-[family-name:var(--font-mono)]" />
                    </div>
                    {error && (
                        <div className="text-primary text-xs font-[family-name:var(--font-mono)] flex items-center gap-2 bg-primary/10 border border-primary/30 p-3">
                            <span className="material-icons text-sm">error</span>{error}
                        </div>
                    )}
                    <button type="submit" className="w-full bg-primary hover:bg-red-600 text-white font-bold text-sm uppercase tracking-widest py-3 transition-colors flex items-center justify-center gap-2">
                        <span className="material-icons text-sm">lock_open</span>Acceder
                    </button>
                    <p className="text-center text-[10px] font-[family-name:var(--font-mono)] text-white/20 mt-4">ACCESO RESTRINGIDO — SOLO PERSONAL AUTORIZADO</p>
                </form>
            </div>
        </div>
    )
}

/* ── Orders Tab ── */
function OrdersTab() {
    const [orders, setOrders] = useState(initialOrders)
    const [filter, setFilter] = useState('todos')

    const filtered = filter === 'todos' ? orders : orders.filter(o => o.status === filter)
    const counts = {
        todos: orders.length,
        pendiente: orders.filter(o => o.status === 'pendiente').length,
        reserva: orders.filter(o => o.status === 'reserva').length,
        en_camino: orders.filter(o => o.status === 'en_camino').length,
        entregado: orders.filter(o => o.status === 'entregado').length,
    }

    const advanceStatus = (orderId) => {
        setOrders(prev => prev.map(o => {
            if (o.id !== orderId) return o
            const idx = STATUS_FLOW.indexOf(o.status)
            if (idx < STATUS_FLOW.length - 1) return { ...o, status: STATUS_FLOW[idx + 1] }
            return o
        }))
    }

    const revenue = orders.filter(o => o.status === 'entregado').reduce((s, o) => s + o.total, 0)

    return (
        <>
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                {[
                    { label: 'Total', value: counts.todos, icon: 'shopping_bag', color: 'text-white' },
                    { label: 'Pendientes', value: counts.pendiente, icon: 'schedule', color: 'text-technical-blue' },
                    { label: 'Reservas', value: counts.reserva, icon: 'inventory_2', color: 'text-primary' },
                    { label: 'En Camino', value: counts.en_camino, icon: 'local_shipping', color: 'text-yellow-400' },
                    { label: 'Ingresos', value: `$${revenue}`, icon: 'attach_money', color: 'text-green-400' },
                ].map((kpi) => (
                    <div key={kpi.label} className="bg-asphalt border border-white/5 p-4 hover:border-white/20 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`material-icons text-base ${kpi.color}`}>{kpi.icon}</span>
                            <span className="font-[family-name:var(--font-mono)] text-[10px] text-white/40 uppercase">{kpi.label}</span>
                        </div>
                        <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
                {FILTER_TABS.map((tab) => (
                    <button key={tab.key} onClick={() => setFilter(tab.key)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider border transition-all ${filter === tab.key ? 'border-primary bg-primary/10 text-white' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                            }`}>
                        <span className="material-icons text-sm">{tab.icon}</span>
                        {tab.label}<span className="text-[10px] opacity-60">[{counts[tab.key]}]</span>
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <div className="bg-asphalt border border-white/10 relative">
                <div className="hud-border absolute inset-0 pointer-events-none z-10"></div>
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                        <span className="material-icons text-primary text-sm">receipt_long</span>Registro de Pedidos
                    </h3>
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-white/30">
                        {filtered.length} de {orders.length}
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-[10px] font-[family-name:var(--font-mono)] text-white/30 uppercase">
                                <th className="p-4 border-b border-white/5">ID</th>
                                <th className="p-4 border-b border-white/5">FECHA</th>
                                <th className="p-4 border-b border-white/5">CLIENTE</th>
                                <th className="p-4 border-b border-white/5">PRODUCTO</th>
                                <th className="p-4 border-b border-white/5 text-center">CANT.</th>
                                <th className="p-4 border-b border-white/5 text-right">TOTAL</th>
                                <th className="p-4 border-b border-white/5 text-center">ESTADO</th>
                                <th className="p-4 border-b border-white/5 text-center">AVANZAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((order) => {
                                const cfg = STATUS_CONFIG[order.status]
                                const canAdvance = STATUS_FLOW.indexOf(order.status) < STATUS_FLOW.length - 1
                                const nextStatus = canAdvance ? STATUS_CONFIG[STATUS_FLOW[STATUS_FLOW.indexOf(order.status) + 1]] : null
                                return (
                                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-b-0">
                                        <td className="p-4 font-[family-name:var(--font-mono)] text-xs text-technical-blue">{order.id}</td>
                                        <td className="p-4 font-[family-name:var(--font-mono)] text-xs text-white/40">{order.date}</td>
                                        <td className="p-4 text-white/80">{order.client}</td>
                                        <td className="p-4 font-[family-name:var(--font-mono)] text-xs text-white/70">{order.product}</td>
                                        <td className="p-4 font-[family-name:var(--font-mono)] text-xs text-white/50 text-center">{order.qty}</td>
                                        <td className="p-4 font-[family-name:var(--font-mono)] text-xs text-white font-bold text-right">${order.total.toFixed(2)}</td>
                                        <td className="p-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-[family-name:var(--font-mono)] px-2.5 py-1 border ${cfg.bg} ${cfg.color}`}>
                                                <span className="material-icons text-xs">{cfg.icon}</span>{cfg.label}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            {canAdvance ? (
                                                <button onClick={() => advanceStatus(order.id)}
                                                    className={`text-[10px] font-[family-name:var(--font-mono)] border px-2 py-1 transition-all hover:scale-105 ${nextStatus.bg} ${nextStatus.color}`}>
                                                    → {nextStatus.label}
                                                </button>
                                            ) : (
                                                <span className="text-[10px] font-[family-name:var(--font-mono)] text-white/20">FINAL</span>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

/* ── Inventory Tab ── */
function InventoryTab() {
    const [inventory, setInventory] = useState(
        products.map(p => ({ ...p, stock: p.soldOut ? 0 : Math.floor(Math.random() * 50) + 5 }))
    )
    const [editingId, setEditingId] = useState(null)

    const updateStock = (id, newStock) => {
        setInventory(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, newStock), soldOut: newStock <= 0 } : p))
    }

    const toggleSoldOut = (id) => {
        setInventory(prev => prev.map(p => p.id === id ? { ...p, soldOut: !p.soldOut, stock: !p.soldOut ? 0 : 10 } : p))
    }

    const totalValue = inventory.reduce((s, p) => s + p.price * p.stock, 0)
    const lowStock = inventory.filter(p => p.stock > 0 && p.stock <= 5).length
    const outOfStock = inventory.filter(p => p.stock === 0).length

    return (
        <>
            {/* Inventory KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {[
                    { label: 'Total SKUs', value: inventory.length, icon: 'category', color: 'text-white' },
                    { label: 'Valor Inventario', value: `$${totalValue.toLocaleString()}`, icon: 'account_balance', color: 'text-technical-blue' },
                    { label: 'Stock Bajo (≤5)', value: lowStock, icon: 'warning', color: 'text-yellow-400' },
                    { label: 'Agotados', value: outOfStock, icon: 'block', color: 'text-primary' },
                ].map((kpi) => (
                    <div key={kpi.label} className="bg-asphalt border border-white/5 p-4 hover:border-white/20 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`material-icons text-base ${kpi.color}`}>{kpi.icon}</span>
                            <span className="font-[family-name:var(--font-mono)] text-[10px] text-white/40 uppercase">{kpi.label}</span>
                        </div>
                        <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
                    </div>
                ))}
            </div>

            {/* Inventory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {inventory.map((item) => (
                    <div key={item.id} className={`bg-asphalt border p-4 transition-all ${item.soldOut ? 'border-primary/30 opacity-75' : item.stock <= 5 ? 'border-yellow-400/30' : 'border-white/10'}`}>
                        <div className="flex gap-4">
                            <img src={item.image} alt={item.name} className={`w-20 h-20 object-cover border border-white/5 ${item.soldOut ? 'grayscale' : ''}`} />
                            <div className="flex-1">
                                <h4 className="font-bold text-white uppercase text-sm tracking-wide">{item.name}</h4>
                                <p className="font-[family-name:var(--font-mono)] text-[10px] text-white/30 mb-2">{item.sku}</p>
                                <div className="flex items-center gap-3">
                                    <span className="font-[family-name:var(--font-mono)] text-sm text-primary font-bold">${item.price.toFixed(2)}</span>
                                    <span className={`font-[family-name:var(--font-mono)] text-[10px] px-2 py-0.5 border ${item.soldOut ? 'border-primary/30 text-primary bg-primary/10' :
                                            item.stock <= 5 ? 'border-yellow-400/30 text-yellow-400 bg-yellow-400/10' :
                                                'border-green-400/30 text-green-400 bg-green-400/10'
                                        }`}>
                                        {item.soldOut ? 'AGOTADO' : `${item.stock} uds`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                            {editingId === item.id ? (
                                <div className="flex items-center gap-2">
                                    <button onClick={() => updateStock(item.id, item.stock - 1)}
                                        className="w-7 h-7 border border-white/20 text-white/50 hover:border-primary hover:text-primary text-sm flex items-center justify-center">−</button>
                                    <span className="font-[family-name:var(--font-mono)] text-sm w-8 text-center text-white">{item.stock}</span>
                                    <button onClick={() => updateStock(item.id, item.stock + 1)}
                                        className="w-7 h-7 border border-white/20 text-white/50 hover:border-primary hover:text-primary text-sm flex items-center justify-center">+</button>
                                    <button onClick={() => setEditingId(null)}
                                        className="text-[10px] font-[family-name:var(--font-mono)] text-green-400 border border-green-400/30 px-2 py-1 ml-2 hover:bg-green-400/10">OK</button>
                                </div>
                            ) : (
                                <button onClick={() => setEditingId(item.id)}
                                    className="text-[10px] font-[family-name:var(--font-mono)] text-white/40 border border-white/10 px-2 py-1 hover:border-primary hover:text-primary transition-all">
                                    <span className="material-icons text-xs align-middle mr-1">edit</span>STOCK
                                </button>
                            )}
                            <button onClick={() => toggleSoldOut(item.id)}
                                className={`text-[10px] font-[family-name:var(--font-mono)] border px-2 py-1 transition-all ${item.soldOut ? 'border-green-400/30 text-green-400 hover:bg-green-400/10' : 'border-primary/30 text-primary hover:bg-primary/10'
                                    }`}>
                                {item.soldOut ? 'ACTIVAR' : 'AGOTAR'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

/* ── Admin Dashboard (Tabbed) ── */
function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('pedidos')

    const tabs = [
        { key: 'pedidos', label: 'Pedidos', icon: 'receipt_long' },
        { key: 'inventario', label: 'Inventario', icon: 'inventory' },
    ]

    return (
        <div className="min-h-screen bg-background-dark text-white">
            <header className="fixed top-0 left-0 w-full z-50 bg-carbon/95 backdrop-blur border-b border-white/10 h-16 flex items-center px-6 justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary/20 border border-primary/50 flex items-center justify-center">
                        <span className="material-icons text-primary text-sm">admin_panel_settings</span>
                    </div>
                    <div>
                        <h1 className="text-sm font-bold uppercase tracking-widest">El Garaje — Admin</h1>
                        <p className="font-[family-name:var(--font-mono)] text-[10px] text-white/30">
                            {activeTab === 'pedidos' ? 'GESTIÓN DE PEDIDOS' : 'GESTIÓN DE INVENTARIO'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {/* Tab Switcher in Header */}
                    <div className="hidden md:flex border border-white/10 overflow-hidden">
                        {tabs.map(tab => (
                            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-1.5 px-4 py-2 text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider transition-all ${activeTab === tab.key ? 'bg-primary/20 text-white border-primary' : 'text-white/40 hover:text-white hover:bg-white/5'
                                    }`}>
                                <span className="material-icons text-sm">{tab.icon}</span>{tab.label}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => window.location.reload()}
                        className="text-xs font-[family-name:var(--font-mono)] text-white/40 hover:text-primary border border-white/10 hover:border-primary px-3 py-1.5 transition-all">
                        SALIR
                    </button>
                </div>
            </header>

            {/* Mobile Tab Switcher */}
            <div className="md:hidden fixed top-16 left-0 w-full z-40 bg-carbon/95 backdrop-blur border-b border-white/10 flex">
                {tabs.map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider transition-all ${activeTab === tab.key ? 'bg-primary/10 text-white border-b-2 border-primary' : 'text-white/40'
                            }`}>
                        <span className="material-icons text-sm">{tab.icon}</span>{tab.label}
                    </button>
                ))}
            </div>

            <main className="pt-24 md:pt-24 pb-16 px-4 md:px-12 max-w-[1400px] mx-auto">
                <div className="md:hidden h-12"></div>
                {activeTab === 'pedidos' ? <OrdersTab /> : <InventoryTab />}
            </main>

            <footer className="border-t border-white/10 px-6 py-4 flex flex-col md:flex-row justify-between items-center text-[10px] font-[family-name:var(--font-mono)] text-white/20 gap-2">
                <div className="flex gap-6">
                    <span>SISTEMA: <span className="text-green-400">OPERATIVO</span></span>
                    <span>API: v4.2.1</span>
                    <span>REGIÓN: VE-CCS-1</span>
                </div>
                <span>© 2024 RENNSPORT ENGINEERING — PANEL ADMINISTRATIVO</span>
            </footer>
        </div>
    )
}

/* ── Main Export ── */
export default function DashboardPage() {
    const [authed, setAuthed] = useState(false)
    if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />
    return <AdminDashboard />
}
