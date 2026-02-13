import Navbar from '../components/layout/Navbar'
import SidebarFilters from '../components/catalog/SidebarFilters'
import ProductCard from '../components/catalog/ProductCard'
import useProducts from '../hooks/useProducts'
import useSEO from '../hooks/useSEO'

export default function CatalogPage() {
    useSEO('Catálogo', 'Explora nuestro catálogo de merchandising F1. Envío gratis a toda Venezuela.')
    const { products, loading, error } = useProducts()

    if (loading) {
        return (
            <div className="bg-background-dark min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest text-white/50">Cargando_Inventario...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-background-dark min-h-screen text-white flex items-center justify-center p-6 text-center">
                <div>
                    <span className="material-icons text-4xl text-primary mb-4">error_outline</span>
                    <h2 className="text-xl font-bold mb-2">Error de Conexión</h2>
                    <p className="text-white/50 text-sm mb-4">No pudimos cargar el inventario. Verifica tu conexión.</p>
                    <button onClick={() => window.location.reload()} className="bg-white/10 hover:bg-white/20 px-4 py-2 text-xs uppercase tracking-widest font-bold transition-colors">Reintentar</button>
                    <p className="text-[10px] text-white/20 mt-8 font-[family-name:var(--font-mono)]">CODE: VE-DB-CONN-ERR</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-background-dark min-h-screen text-white">
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.08]"
                style={{
                    backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))',
                    backgroundSize: '100% 4px',
                }}
            ></div>

            <Navbar />

            <div className="flex min-h-screen pt-16">
                <SidebarFilters />

                <main className="flex-1 lg:ml-80 min-h-screen relative">
                    <div className="absolute inset-0 bg-grid pointer-events-none z-0"></div>

                    <div className="relative z-10 p-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-2">
                                    Catálogo de Pista
                                </h1>
                                <p className="font-[family-name:var(--font-mono)] text-sm text-gray-400">SECTOR 3 // INVENTARIO DE ALTO RENDIMIENTO</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center gap-4">
                                <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-mono)] text-gray-500 border border-white/10 px-3 py-1 bg-black/20">
                                    <span>ORDENAR:</span>
                                    <select className="bg-transparent border-none text-white focus:ring-0 cursor-pointer p-0 text-xs">
                                        <option>MÁS_RECIENTE</option>
                                        <option>PRECIO_ASC</option>
                                        <option>PRECIO_DESC</option>
                                    </select>
                                </div>
                                <div className="text-xs font-[family-name:var(--font-mono)] text-primary">
                                    [{products.length}] PRODUCTOS
                                </div>
                            </div>
                        </div>

                        {products.length === 0 ? (
                            <div className="py-20 text-center">
                                <p className="text-white/40 text-sm mb-4">Inventario vacío o sin inicializar.</p>
                                <p className="text-[10px] font-[family-name:var(--font-mono)] text-primary">ADMIN: Ve al Dashboard para correr el Seed DB.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}

                        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs font-[family-name:var(--font-mono)] text-gray-500">
                            <div className="flex items-center gap-2 mb-4 md:mb-0">
                                <button className="w-8 h-8 flex items-center justify-center border border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-colors">&lt;</button>
                                <button className="w-8 h-8 flex items-center justify-center bg-primary text-white border border-primary">1</button>
                                <button className="w-8 h-8 flex items-center justify-center border border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-colors">2</button>
                                <button className="w-8 h-8 flex items-center justify-center border border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-colors">3</button>
                                <button className="w-8 h-8 flex items-center justify-center border border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-colors">&gt;</button>
                            </div>
                            <div className="flex gap-6 uppercase tracking-wider">
                                <span>Versión: 4.2.1</span>
                                <span>Latencia: 45ms</span>
                                <span>Servidor: VE-CCS-1</span>
                            </div>
                        </div>
                    </div>

                    <footer className="border-t border-white/10 bg-black/40 py-8 px-8 mt-12 relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1">Rennsport Engineering</h4>
                                <p className="text-xs text-gray-600 font-[family-name:var(--font-mono)]">SOCIO OFICIAL DE MERCHANDISING LICENCIADO</p>
                            </div>
                            <div className="flex gap-6 text-xs text-gray-500 font-[family-name:var(--font-mono)]">
                                <a href="#" className="hover:text-primary transition-colors">TÉRMINOS</a>
                                <a href="#" className="hover:text-primary transition-colors">PRIVACIDAD</a>
                                <a href="#" className="hover:text-primary transition-colors">DEVOLUCIONES</a>
                            </div>
                            <div className="text-[10px] text-gray-700 font-[family-name:var(--font-mono)]">
                                © 2024 RENNSPORT ENG. TODOS LOS DERECHOS RESERVADOS. <br />
                                DISEÑADO PARA ALTO RENDIMIENTO.
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    )
}
