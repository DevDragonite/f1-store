import { memo } from 'react'

const Engineering = memo(function Engineering() {
    return (
        <section className="py-20 bg-carbon relative border-y border-white/5">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Imagen */}
                <div className="order-2 lg:order-1 relative">
                    <div className="relative rounded-sm overflow-hidden border border-white/10 group">
                        <img
                            alt="Textura de fibra de carbono en primer plano"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 opacity-80"
                            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&auto=format"
                        />
                        <div className="absolute inset-0 border-[20px] border-transparent pointer-events-none">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/50 shadow-[0_0_15px_rgba(224,7,0,0.8)] animate-[scan_4s_ease-in-out_infinite]"></div>
                        </div>
                        <div className="absolute top-1/4 left-1/4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                            <span className="text-[10px] font-[family-name:var(--font-mono)] text-white bg-black/50 px-1 backdrop-blur-sm">ZONA DE IMPACTO</span>
                        </div>
                        <div className="absolute bottom-1/3 right-1/4 flex items-center gap-2">
                            <span className="text-[10px] font-[family-name:var(--font-mono)] text-white bg-black/50 px-1 backdrop-blur-sm">DISIPACIÓN TÉRMICA</span>
                            <div className="w-2 h-2 bg-primary rounded-full animate-ping delay-75"></div>
                        </div>
                    </div>
                </div>

                {/* Texto */}
                <div className="order-1 lg:order-2 flex flex-col gap-6">
                    <div className="flex items-center gap-2 text-electric-blue text-xs font-[family-name:var(--font-mono)] font-bold tracking-widest uppercase">
                        <span className="material-symbols-outlined text-sm">memory</span>
                        Especificaciones Técnicas
                    </div>
                    <h2 className="font-[family-name:var(--font-serif)] text-4xl lg:text-5xl text-white">
                        Precisión Artesanal. <br />
                        <span className="text-white/30 italic">Probado en pista.</span>
                    </h2>
                    <p className="text-white/60 leading-relaxed font-light">
                        Nuestros materiales provienen de los mismos proveedores que los principales constructores de F1. Fibras Nomex para resistencia al fuego, tejidos con infusión de carbono para durabilidad y cortes aerodinámicos que reducen la resistencia. Esto no es solo moda; es ingeniería de alto rendimiento para tu día a día.
                    </p>
                    <div className="grid grid-cols-2 gap-6 mt-6 border-t border-white/10 pt-8">
                        {[
                            { label: 'Material', value: 'Polímero con Infusión de Carbono' },
                            { label: 'Peso', value: 'Ultra-ligero (240g)' },
                            { label: 'Origen', value: 'Maranello, Italia' },
                            { label: 'Durabilidad', value: 'Grado A+ (Industrial)' },
                        ].map((spec) => (
                            <div key={spec.label}>
                                <h4 className="text-white font-bold uppercase tracking-wider mb-2 text-sm">{spec.label}</h4>
                                <p className="text-white/50 text-xs">{spec.value}</p>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 self-start px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold uppercase tracking-[0.15em]">
                        Ver Ficha Técnica
                    </button>
                </div>
            </div>
        </section>
    )
})

export default Engineering
