import { Link } from 'react-router-dom'
import useCartStore from '../../stores/useCartStore'

export default function Navbar() {
    const totalItems = useCartStore(s => s.items.reduce((sum, i) => sum + i.qty, 0))

    const navLinks = [
        { label: 'Tienda', to: '/catalog' },
        { label: 'Editorial', to: '/editorial' },
        { label: 'Soporte', to: '/the-pit' },
    ]

    return (
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
                            className="nav-link"
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
                    <button className="md:hidden p-2.5 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95">
                        <span className="material-symbols-outlined text-xl">menu</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}
