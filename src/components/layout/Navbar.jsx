import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useCartStore from '../../stores/useCartStore'

export default function Navbar() {
    const totalItems = useCartStore(s => s.items.reduce((sum, i) => sum + i.qty, 0))
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()

    // Close mobile menu on route change
    useEffect(() => { setMobileOpen(false) }, [location.pathname])

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
                            src="/Logo F1 Proyecto.jpg"
                            alt="Rennsport Logo"
                            className="w-10 h-10 rounded-sm object-cover transition-transform group-hover:scale-110 duration-300"
                        />
                        <span className="font-bold text-xl tracking-widest uppercase font-[family-name:var(--font-display)]">
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
                            onClick={() => setMobileOpen(!mobileOpen)}
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
