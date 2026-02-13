import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import useCartStore from '../../stores/useCartStore'
import useAuthStore from '../../stores/useAuthStore'
import { getAssetUrl } from '../../utils/assets'

export default function Navbar() {
    const totalItems = useCartStore(s => s.items.reduce((sum, i) => sum + i.qty, 0))
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()

    /* ── Auth state ── */
    const { user, signIn, signUp, signOut } = useAuthStore()
    const [accountOpen, setAccountOpen] = useState(false)
    const [authMode, setAuthMode] = useState('login') // 'login' | 'register'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authError, setAuthError] = useState('')
    const [authLoading, setAuthLoading] = useState(false)
    const [authSuccess, setAuthSuccess] = useState('')
    const dropdownRef = useRef(null)

    // Close mobile menu on route change
    useEffect(() => { setMobileOpen(false) }, [location.pathname])

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setAccountOpen(false)
            }
        }
        if (accountOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [accountOpen])

    // Close on Escape
    useEffect(() => {
        function handleEscape(e) {
            if (e.key === 'Escape') setAccountOpen(false)
        }
        if (accountOpen) {
            document.addEventListener('keydown', handleEscape)
            return () => document.removeEventListener('keydown', handleEscape)
        }
    }, [accountOpen])

    const handleAuth = async (e) => {
        e.preventDefault()
        setAuthError('')
        setAuthSuccess('')
        setAuthLoading(true)
        try {
            if (authMode === 'login') {
                await signIn(email, password)
                setAccountOpen(false)
                setEmail('')
                setPassword('')
            } else {
                await signUp(email, password, { role: 'customer' })
                setAuthSuccess('¡Cuenta creada! Revisa tu correo para confirmar.')
                setEmail('')
                setPassword('')
            }
        } catch (err) {
            setAuthError(err.message === 'Invalid login credentials'
                ? 'Credenciales inválidas'
                : err.message || 'Error al autenticar')
        } finally {
            setAuthLoading(false)
        }
    }

    const handleSignOut = async () => {
        await signOut()
        setAccountOpen(false)
    }

    const navLinks = [
        { label: 'Tienda', to: '/catalog' },
        { label: 'Editorial', to: '/editorial' },
        { label: 'Soporte', to: '/the-pit' },
    ]

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 glass-nav transition-all duration-300">
                <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src={getAssetUrl("/Logo F1 Proyecto.jpg")}
                            alt="Rennsport Logo"
                            className="w-10 h-10 rounded-sm object-cover transition-transform group-hover:scale-110 duration-300"
                        />
                        <span className="hidden md:block font-bold md:text-xl tracking-widest uppercase font-[family-name:var(--font-display)]">
                            Rennsport
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                to={item.to}
                                className={`nav-link ${location.pathname === item.to ? 'text-white after:w-full' : ''}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-2">
                        <Link to="/catalog" className="p-2.5 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95">
                            <span className="material-symbols-outlined text-xl">search</span>
                        </Link>

                        {/* Mi Cuenta Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => {
                                    setAccountOpen(!accountOpen);
                                    setMobileOpen(false); // Close mobile menu
                                    setAuthError('');
                                    setAuthSuccess('')
                                }}
                                className={`p-2.5 rounded-full transition-all hover:scale-110 active:scale-95 ${accountOpen || user ? 'bg-primary/20 text-primary' : 'hover:bg-white/10 text-white'}`}
                                aria-label="Mi Cuenta"
                            >
                                <span className="material-symbols-outlined text-xl">
                                    {user ? 'person' : 'person_outline'}
                                </span>
                            </button>

                            {/* Dropdown Panel */}
                            {accountOpen && (
                                <div className="fixed left-4 right-4 top-20 sm:absolute sm:right-0 sm:left-auto sm:top-full sm:mt-3 sm:w-72 bg-carbon/98 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 z-50" style={{ animation: 'fadeInDown 0.2s ease-out' }}>
                                    {/* Decorative top bar */}
                                    <div className="h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent" />

                                    {user ? (
                                        /* ── Logged In State ── */
                                        <div className="p-4 sm:p-5">
                                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                                                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-primary">person</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-[family-name:var(--font-mono)] text-primary tracking-widest uppercase">Mi Cuenta</p>
                                                    <p className="text-white/60 text-xs truncate">{user.email}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full text-left px-3 py-2.5 text-sm text-white/60 hover:text-primary hover:bg-white/5 transition-colors flex items-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-sm">logout</span>
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    ) : (
                                        /* ── Auth Form ── */
                                        <div className="p-4 sm:p-5">
                                            <p className="text-xs font-[family-name:var(--font-mono)] text-primary tracking-widest uppercase mb-4">
                                                {authMode === 'login' ? '/// Iniciar Sesión' : '/// Crear Cuenta'}
                                            </p>

                                            <form onSubmit={handleAuth} className="space-y-3">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    placeholder="tu@correo.com"
                                                    required
                                                    className="w-full bg-asphalt border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors"
                                                />
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    placeholder="Contraseña"
                                                    required
                                                    minLength={6}
                                                    className="w-full bg-asphalt border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors"
                                                />

                                                {authError && (
                                                    <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-2">{authError}</p>
                                                )}
                                                {authSuccess && (
                                                    <p className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-2">{authSuccess}</p>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={authLoading}
                                                    className="w-full bg-primary text-white py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors disabled:opacity-50"
                                                >
                                                    {authLoading ? 'Cargando...' : authMode === 'login' ? 'Entrar' : 'Registrarse'}
                                                </button>
                                            </form>

                                            <div className="mt-4 pt-3 border-t border-white/10 text-center">
                                                <button
                                                    onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthError(''); setAuthSuccess('') }}
                                                    className="text-xs text-white/40 hover:text-primary transition-colors"
                                                >
                                                    {authMode === 'login'
                                                        ? '¿No tienes cuenta? Regístrate'
                                                        : '¿Ya tienes cuenta? Inicia sesión'
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <Link to="/cart" className="p-2.5 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95 relative">
                            <span className="material-symbols-outlined text-xl">shopping_bag</span>
                            {totalItems > 0 ? (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full font-[family-name:var(--font-mono)] px-1">
                                    {totalItems}
                                </span>
                            ) : (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            )}
                        </Link>
                        {/* Hamburger */}
                        <button
                            onClick={() => {
                                setMobileOpen(!mobileOpen)
                                setAccountOpen(false) // Close account dropdown
                            }}
                            className="md:hidden p-2.5 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95 relative w-10 h-10 flex items-center justify-center"
                            aria-label="Menú"
                        >
                            <div className="flex flex-col gap-1.5 w-5">
                                <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4px]' : ''}`}></span>
                                <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${mobileOpen ? 'visible' : 'invisible'}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setMobileOpen(false)}
                ></div>

                {/* Panel */}
                <div className={`absolute top-20 left-0 w-full bg-carbon/98 backdrop-blur-xl border-b border-white/10 transition-all duration-500 ${mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                    <div className="px-6 py-8 space-y-1">
                        {navLinks.map((item, i) => (
                            <Link
                                key={item.label}
                                to={item.to}
                                className={`block py-4 border-b border-white/5 text-lg uppercase tracking-widest font-bold transition-all hover:text-primary hover:pl-2 ${location.pathname === item.to ? 'text-primary' : 'text-white/80'
                                    }`}
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                <span className="font-[family-name:var(--font-mono)] text-xs text-white/20 mr-3">0{i + 1}</span>
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="px-6 pb-6 pt-2 border-t border-white/5">
                        <div className="flex justify-between items-center text-[10px] font-[family-name:var(--font-mono)] text-white/20">
                            <span>RENNSPORT V4.2</span>
                            <span>VE-CCS-1</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
