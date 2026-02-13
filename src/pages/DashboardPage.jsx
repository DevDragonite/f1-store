import { useState } from 'react'

/* ── Admin credentials (temporary — will move to Supabase Auth later) ── */
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'rennsport2024'

/* ── Sample order data ── */
const allOrders = [
    { id: 'PED-00201', date: '2024-02-08', client: 'Carlos M.', product: 'Hoodie_Velocidad_V2', qty: 1, status: 'entregado', total: '$120,00' },
    { id: 'PED-00198', date: '2024-02-07', client: 'María G.', product: 'Gorra_Scuderia ×2', qty: 2, status: 'en_camino', total: '$90,00' },
    { id: 'PED-00195', date: '2024-02-06', client: 'Andrés P.', product: 'Bomber_Aero_Pro', qty: 1, status: 'reserva', total: '$280,00' },
    { id: 'PED-00190', date: '2024-02-05', client: 'Laura R.', product: 'LEGO_Paddock_Set', qty: 1, status: 'pendiente', total: '$199,00' },
    { id: 'PED-00188', date: '2024-02-04', client: 'José V.', product: 'Franela_Grid_Walk ×3', qty: 3, status: 'entregado', total: '$165,00' },
    { id: 'PED-00185', date: '2024-02-03', client: 'Daniela S.', product: 'Funko_Chrono_LTD', qty: 1, status: 'pendiente', total: '$35,00' },
    { id: 'PED-00180', date: '2024-02-02', client: 'Miguel Á.', product: 'Hoodie_Velocidad_V2', qty: 1, status: 'reserva', total: '$120,00' },
    { id: 'PED-00175', date: '2024-02-01', client: 'Ana C.', product: 'Gorra_Scuderia', qty: 1, status: 'entregado', total: '$45,00' },
]

const STATUS_CONFIG = {
    entregado: { label: 'Entregado', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/30', icon: 'check_circle' },
    en_camino: { label: 'En Camino', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30', icon: 'local_shipping' },
    pendiente: { label: 'Pendiente', color: 'text-technical-blue', bg: 'bg-technical-blue/10 border-technical-blue/30', icon: 'schedule' },
    reserva: { label: 'Reserva (Sin Stock)', color: 'text-primary', bg: 'bg-primary/10 border-primary/30', icon: 'inventory_2' },
}

const FILTER_TABS = [
    { key: 'todos', label: 'Todos', icon: 'list' },
    { key: 'pendiente', label: 'Pendientes', icon: 'schedule' },
    { key: 'reserva', label: 'Reservas (Sin Stock)', icon: 'inventory_2' },
    { key: 'en_camino', label: 'En Camino', icon: 'local_shipping' },
    { key: 'entregado', label: 'Entregados', icon: 'check_circle' },
]

/* ── Login Gate Component ── */
function AdminLogin({ onLogin }) {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user === ADMIN_USER && pass === ADMIN_PASS) {
            onLogin()
        } else {
            setError('Credenciales incorrectas')
        }
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
                        <input
                            type="text"
                            value={user}
                            onChange={(e) => { setUser(e.target.value); setError('') }}
                            placeholder="admin"
                            className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary transition-colors font-[family-name:var(--font-mono)]"
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-[family-name:var(--font-mono)]">Contraseña</label>
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => { setPass(e.target.value); setError('') }}
                            placeholder="••••••••"
                            className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary transition-colors font-[family-name:var(--font-mono)]"
                        />
                    </div>

                    {error && (
                        <div className="text-primary text-xs font-[family-name:var(--font-mono)] flex items-center gap-2 bg-primary/10 border border-primary/30 p-3">
                            <span className="material-icons text-sm">error</span>
                            {error}
                        </div>
                    )}

                    <button type="submit" className="w-full bg-primary hover:bg-red-600 text-white font-bold text-sm uppercase tracking-widest py-3 transition-colors flex items-center justify-center gap-2">
                        <span className="material-icons text-sm">lock_open</span>
                        Acceder
                    </button>

                    <p className="text-center text-[10px] font-[family-name:var(--font-mono)] text-white/20 mt-4">
                        ACCESO RESTRINGIDO — SOLO PERSONAL AUTORIZADO
                    </p>
                </form>
            </div>
        </div>
    )
}

/* ── Admin Dashboard Component ── */
function AdminDashboard() {
    const [filter, setFilter] = useState('todos')

    const filtered = filter === 'todos' ? allOrders : allOrders.filter(o => o.status === filter)

    const counts = {
        todos: allOrders.length,
        pendiente: allOrders.filter(o => o.status === 'pendiente').length,
        reserva: allOrders.filter(o => o.status === 'reserva').length,
        en_camino: allOrders.filter(o => o.status === 'en_camino').length,
        entregado: allOrders.filter(o => o.status === 'entregado').length,
    }

    return (
        <div className="min-h-screen bg-background-dark text-white">
            {/* Top Bar */}
            <header className="fixed top-0 left-0 w-full z-50 bg-carbon/95 backdrop-blur border-b border-white/10 h-16 flex items-center px-6 justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary/20 border border-primary/50 flex items-center justify-center">
                        <span className="material-icons text-primary text-sm">admin_panel_settings</span>
                    </div>
                    <div>
                        <h1 className="text-sm font-bold uppercase tracking-widest">El Garaje — Admin</h1>
                        <p className="font-[family-name:var(--font-mono)] text-[10px] text-white/30">GESTIÓN DE PEDIDOS</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="font-[family-name:var(--font-mono)] text-[10px] text-white/30 text-right hidden md:block">
                        <p>SESIÓN: <span className="text-green-400">ACTIVA</span></p>
                        <p>ROL: ADMINISTRADOR</p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-xs font-[family-name:var(--font-mono)] text-white/40 hover:text-primary border border-white/10 hover:border-primary px-3 py-1.5 transition-all"
                    >
                        CERRAR_SESIÓN
                    </button>
                </div>
            </header>

            <main className="pt-24 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto">
                {/* KPI Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Pedidos', value: counts.todos, icon: 'shopping_bag', color: 'text-white' },
                        { label: 'Pendientes', value: counts.pendiente, icon: 'schedule', color: 'text-technical-blue' },
                        { label: 'Reservas', value: counts.reserva, icon: 'inventory_2', color: 'text-primary' },
                        { label: 'Entregados', value: counts.entregado, icon: 'check_circle', color: 'text-green-400' },
                    ].map((kpi) => (
                        <div key={kpi.label} className="bg-asphalt border border-white/5 p-5 hover:border-white/20 transition-colors">
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`material-icons text-lg ${kpi.color}`}>{kpi.icon}</span>
                                <span className="font-[family-name:var(--font-mono)] text-[10px] text-white/40 uppercase">{kpi.label}</span>
                            </div>
                            <div className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</div>
                        </div>
                    ))}
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
                    {FILTER_TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={`flex items-center gap-2 px-4 py-2 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider border transition-all ${filter === tab.key
                                    ? 'border-primary bg-primary/10 text-white shadow-[0_0_10px_rgba(224,7,0,0.2)]'
                                    : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                                }`}
                        >
                            <span className="material-icons text-sm">{tab.icon}</span>
                            {tab.label}
                            <span className="text-[10px] opacity-60">[{counts[tab.key]}]</span>
                        </button>
                    ))}
                </div>

                {/* Orders Table */}
                <div className="bg-asphalt border border-white/10 relative">
                    <div className="hud-border absolute inset-0 pointer-events-none z-10"></div>

                    <div className="p-4 border-b border-white/10 flex justify-between items-center">
                        <h3 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                            <span className="material-icons text-primary text-sm">receipt_long</span>
                            Registro de Pedidos
                        </h3>
                        <span className="font-[family-name:var(--font-mono)] text-[10px] text-white/30">
                            Mostrando {filtered.length} de {allOrders.length}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-[10px] font-[family-name:var(--font-mono)] text-white/30 uppercase">
                                    <th className="p-4 border-b border-white/5">ID_PEDIDO</th>
                                    <th className="p-4 border-b border-white/5">FECHA</th>
                                    <th className="p-4 border-b border-white/5">CLIENTE</th>
                                    <th className="p-4 border-b border-white/5">PRODUCTO</th>
                                    <th className="p-4 border-b border-white/5 text-center">CANT.</th>
                                    <th className="p-4 border-b border-white/5 text-right">TOTAL</th>
                                    <th className="p-4 border-b border-white/5 text-center">ESTADO</th>
                                    <th className="p-4 border-b border-white/5 text-center">ACCIÓN</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((order) => {
                                    const cfg = STATUS_CONFIG[order.status]
                                    return (
                                        <tr key={order.id} className="hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-b-0">
                                            <td className="p-4 font-[family-name:var(--font-mono)] text-xs text-technical-blue">{order.id}</td>
                                            <td className="p-4 font-[family-name:var(--font-mono)] text-xs text-white/40">{order.date}</td>
                                            <td className="p-4 text-white/80">{order.client}</td>
                                            <td className="p-4 font-[family-name:var(--font-mono)] text-xs text-white/70">{order.product}</td>
                                            <td className="p-4 font-[family-name:var(--font-mono)] text-xs text-white/50 text-center">{order.qty}</td>
                                            <td className="p-4 font-[family-name:var(--font-mono)] text-xs text-white font-bold text-right">{order.total}</td>
                                            <td className="p-4 text-center">
                                                <span className={`inline-flex items-center gap-1.5 text-[10px] font-[family-name:var(--font-mono)] px-2.5 py-1 border ${cfg.bg} ${cfg.color}`}>
                                                    <span className="material-icons text-xs">{cfg.icon}</span>
                                                    {cfg.label}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <button className="text-xs font-[family-name:var(--font-mono)] text-white/30 hover:text-primary border border-white/10 hover:border-primary px-2 py-1 transition-all">
                                                    EDITAR
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-[family-name:var(--font-mono)] text-white/20 gap-4">
                    <div className="flex gap-6">
                        <span>SISTEMA: <span className="text-green-400">OPERATIVO</span></span>
                        <span>API: v4.2.1</span>
                        <span>REGIÓN: VE-CCS-1</span>
                    </div>
                    <span>© 2024 RENNSPORT ENGINEERING — PANEL ADMINISTRATIVO</span>
                </div>
            </main>
        </div>
    )
}

/* ── Main Export — Login Gate wraps Dashboard ── */
export default function DashboardPage() {
    const [authed, setAuthed] = useState(false)

    if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />
    return <AdminDashboard />
}
