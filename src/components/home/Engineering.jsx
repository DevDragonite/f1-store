import { memo } from 'react'

const Engineering = memo(function Engineering() {
    return (
        <section className="py-20 bg-carbon relative border-y border-white/5">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 items-center">
                {/* 1. Header (Mobile: Top, Desktop: Right Top) */}
                <div className="lg:col-start-2 flex flex-col gap-6">
                    <div className="flex items-center gap-2 text-electric-blue text-xs font-[family-name:var(--font-mono)] font-bold tracking-widest uppercase">
                        <span className="material-symbols-outlined text-sm">memory</span>
                        Especificaciones Técnicas
                    </div>
                    <h2 className="font-[family-name:var(--font-serif)] text-4xl lg:text-5xl text-white">
                        Precisión Artesanal. <br />
                        <span className="text-white/30 italic">Probado en pista.</span>
                    </h2>
                    <p className="text-white/60 leading-relaxed font-light">
                        Cada prenda Rennsport está confeccionada con algodón premium de 400 gramos, hilado en Italia con fibras de larga grapa que garantizan suavidad extrema y durabilidad excepcional. El interior afelpado proporciona una sensación de lujo artesanal, mientras que los acabados técnicos — costuras reforzadas, tintes de alta fijación y etiquetas tejidas — aseguran una pieza que mantiene su forma y color lavado tras lavado.
                    </p>
                </div>

                {/* 2. Image (Mobile: Middle, Desktop: Left Spanning) */}
                <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2 relative">
                    <div className="relative rounded-sm overflow-hidden border border-white/10 group">
                        <img
                            alt="Suéter Scuderia Ferrari — detalle de materiales premium"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 opacity-80"
                            src="/Images/Ferrari/Scuderia-Ferrari-Sweater-2.png"
                        />
                        <div className="absolute inset-0 border-[20px] border-transparent pointer-events-none">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
                        </div>
                    </div>
                </div>

                {/* 3. Specs (Mobile: Bottom, Desktop: Right Bottom) */}
                <div className="lg:col-start-2 border-t border-white/10 pt-8">
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { label: 'Material', value: 'Algodón Premium 400g' },
                            { label: 'Interior', value: 'Afelpado de Lujo' },
                            { label: 'Origen', value: 'Hilado en Italia' },
                            { label: 'Durabilidad', value: 'Grado A+ (Alta Fijación)' },
                        ].map((spec) => (
                            <div key={spec.label}>
                                <h4 className="text-white font-bold uppercase tracking-wider mb-2 text-sm">{spec.label}</h4>
                                <p className="text-white/50 text-xs">{spec.value}</p>
                            </div>
                        ))}
                    </div>
                    <button className="mt-8 self-start px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold uppercase tracking-[0.15em]">
                        Ver Ficha Técnica
                    </button>
                </div>
            </div>
        </section>
    )
})

export default Engineering
