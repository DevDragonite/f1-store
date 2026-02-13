import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function ThePitPage() {
    return (
        <div className="bg-background-dark min-h-screen text-white">
            <Navbar />
            <main className="pt-28 pb-20 px-6 max-w-[1200px] mx-auto">
                <div className="mb-16">
                    <p className="font-[family-name:var(--font-mono)] text-xs text-primary tracking-widest mb-3">/// CENTRO_DE_SOPORTE</p>
                    <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-7xl text-white mb-4">
                        Soporte
                    </h1>
                    <p className="text-white/50 max-w-lg">Atención al cliente, devoluciones, preguntas frecuentes y todo lo que necesitas. Nuestro equipo está listo para ayudarte.</p>
                </div>

                {/* Grid de Soporte */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {[
                        { icon: 'local_shipping', title: 'Rastrear tu Pedido', desc: 'Seguimiento en tiempo real desde el almacén hasta tu puerta.', cta: 'Ingresar Código' },
                        { icon: 'sync', title: 'Devoluciones y Cambios', desc: '30 días para devoluciones sin complicaciones. Sin preguntas.', cta: 'Iniciar Devolución' },
                        { icon: 'help_outline', title: 'Preguntas Frecuentes', desc: 'Encuentra respuestas a las preguntas más comunes.', cta: 'Ver Preguntas' },
                        { icon: 'support_agent', title: 'Contactar Soporte', desc: 'Chat en vivo disponible de lunes a sábado 9AM-6PM.', cta: 'Abrir Chat' },
                        { icon: 'card_giftcard', title: 'Tarjetas de Regalo', desc: 'Regala velocidad. Disponible en formato digital y físico.', cta: 'Comprar Tarjeta' },
                        { icon: 'loyalty', title: 'Programa de Lealtad', desc: 'Acumula puntos con cada compra. Canjea por recompensas.', cta: 'Unirse al Programa' },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="bg-asphalt border border-white/10 p-6 hover:border-primary/30 transition-all group relative overflow-hidden"
                        >
                            <div className="hud-border absolute inset-0 pointer-events-none z-10"></div>
                            <span className="material-icons text-3xl text-primary/60 group-hover:text-primary transition-colors mb-4 block">{item.icon}</span>
                            <h3 className="text-lg font-bold uppercase tracking-wide mb-2">{item.title}</h3>
                            <p className="text-sm text-white/40 mb-4 leading-relaxed">{item.desc}</p>
                            <button className="text-xs font-[family-name:var(--font-mono)] text-primary hover:text-white hover:bg-primary px-3 py-1.5 border border-primary/50 hover:border-primary transition-all uppercase tracking-wider">
                                {item.cta} →
                            </button>
                        </div>
                    ))}
                </div>

                {/* Banner de Contacto */}
                <div className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">¿No encuentras lo que buscas?</h2>
                        <p className="text-white/50 text-sm">Nuestro equipo de soporte responde en menos de 2 horas en días hábiles.</p>
                    </div>
                    <button className="bg-primary hover:bg-red-600 text-white font-bold text-sm uppercase tracking-widest px-8 py-3 transition-colors flex items-center gap-2 shrink-0">
                        <span className="material-icons text-sm">email</span>
                        Contactar Soporte
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    )
}
