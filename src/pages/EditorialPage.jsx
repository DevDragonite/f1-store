import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import useSEO from '../hooks/useSEO'

export default function EditorialPage() {
    useSEO('Editorial', 'Historias del paddock, entrevistas con pilotos y la cultura de velocidad que inspira cada colección Rennsport.')
    return (
        <div className="bg-background-dark min-h-screen text-white">
            <Navbar />
            <main className="pt-28 pb-20 px-6 max-w-[1200px] mx-auto">
                <div className="mb-16">
                    <p className="font-[family-name:var(--font-mono)] text-xs text-primary tracking-widest mb-3">/// EDITORIAL</p>
                    <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-7xl text-white mb-4">
                        Historias desde <br /><span className="text-white/30 italic">el Paddock</span>
                    </h1>
                    <p className="text-white/50 max-w-lg">Detrás de cámaras, entrevistas con pilotos y la cultura de la velocidad que inspira cada colección de Rennsport.</p>
                </div>

                {/* Artículo Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    <div className="aspect-[4/3] bg-asphalt border border-white/10 overflow-hidden relative group">
                        <img
                            src="https://images.unsplash.com/photo-1541889413-d0ae82e0daa6?w=800&q=80&auto=format"
                            alt="Auto F1 en pista"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8">
                            <span className="text-[10px] font-[family-name:var(--font-mono)] text-primary mb-2 block">DESTACADO // 08 FEB 2024</span>
                            <h2 className="text-2xl font-bold">El Arte del Pit Stop: Cómo 2 Segundos Cambiaron la Moda</h2>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-6">
                        <p className="text-white/60 leading-relaxed">
                            Pasamos tres semanas integrados con un equipo top de F1, estudiando la precisión de la coreografía del pit stop. Lo que aprendimos sobre velocidad, coordinación y decisiones en fracciones de segundo moldeó la filosofía de diseño de nuestra última colección.
                        </p>
                        <p className="text-white/40 leading-relaxed text-sm">
                            Desde cómo los mecánicos manejan las pistolas de neumáticos hasta la obsesión del aerodinamista con los milímetros — cada detalle alimenta el enfoque de ingeniería de Rennsport. Esto es moda a 300km/h.
                        </p>
                        <button className="self-start px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold uppercase tracking-[0.15em]">
                            Leer Artículo Completo →
                        </button>
                    </div>
                </div>

                {/* Grid de Artículos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: 'Fibra de Carbono: Del Monocasco al Guardarropa', date: 'ENE 2024', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80&auto=format', tag: 'MATERIALES' },
                        { title: 'Entrevista: El Diseñador que Corre los Domingos', date: 'DIC 2023', image: 'https://images.unsplash.com/photo-1504817343863-5092a923803e?w=600&q=80&auto=format', tag: 'PERSONAS' },
                        { title: 'GP de Mónaco: Estilo Callejero Meets Alta Costura', date: 'NOV 2023', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&auto=format', tag: 'CULTURA' },
                    ].map((article) => (
                        <div key={article.title} className="group cursor-pointer">
                            <div className="aspect-[3/2] bg-asphalt border border-white/5 overflow-hidden mb-4 relative">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                />
                                <span className="absolute top-3 left-3 text-[10px] font-[family-name:var(--font-mono)] bg-black/60 backdrop-blur text-white px-2 py-1 border border-white/10">
                                    {article.tag}
                                </span>
                            </div>
                            <p className="font-[family-name:var(--font-mono)] text-[10px] text-primary mb-2">{article.date}</p>
                            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{article.title}</h3>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}
