import { memo } from 'react'

const SidebarFilters = memo(function SidebarFilters() {
    const teams = [
        { name: 'SCUDERIA_FERRARI', count: 12 },
        { name: 'MERCEDES_AMG', count: 8 },
        { name: 'RED_BULL_RACING', count: 15 },
    ]

    const categories = [
        { label: '>> HOODIES', active: false },
        { label: '>> FRANELAS', active: true },
        { label: '>> GORRAS', active: false },
        { label: '>> FUNKOS', active: false },
        { label: '>> LEGOS', active: false },
        { label: '>> CHAQUETAS', active: false },
    ]

    return (
        <aside className="w-80 fixed left-0 top-16 bottom-0 z-30 bg-carbon border-r border-white/10 overflow-y-auto hidden lg:block custom-scrollbar">
            <div className="p-6 space-y-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h2 className="font-[family-name:var(--font-mono)] text-sm text-primary tracking-widest uppercase">Filtros</h2>
                    <span className="material-icons text-gray-500 text-sm">tune</span>
                </div>

                {/* Equipo Constructor */}
                <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-wider text-gray-400">Equipo Constructor</h3>
                    <div className="space-y-2">
                        {teams.map((team) => (
                            <label key={team.name} className="flex items-center justify-between group cursor-pointer p-2 hover:bg-white/5 rounded transition-colors border border-transparent hover:border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 border border-gray-500 group-hover:border-primary group-hover:bg-primary transition-colors"></div>
                                    <span className="font-[family-name:var(--font-mono)] text-xs text-gray-300">{team.name}</span>
                                </div>
                                <span className="text-[10px] text-gray-600 font-[family-name:var(--font-mono)]">[{String(team.count).padStart(2, '0')}]</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Categoría */}
                <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-wider text-gray-400">Categoría</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.label}
                                className={`border py-2 px-3 text-xs font-[family-name:var(--font-mono)] transition-all text-left ${cat.active
                                        ? 'border-primary bg-primary/20 text-white shadow-[0_0_10px_rgba(224,7,0,0.3)]'
                                        : 'border-white/10 bg-asphalt hover:bg-primary hover:border-primary hover:text-white text-gray-400'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Precio */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <h3 className="text-xs uppercase tracking-wider text-gray-400">Precio</h3>
                        <span className="font-[family-name:var(--font-mono)] text-xs text-technical-blue">$0 - $500</span>
                    </div>
                    <div className="relative w-full h-1 bg-gray-700 rounded">
                        <div className="absolute top-0 left-0 h-full w-2/3 bg-primary"></div>
                        <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-white border-2 border-primary -translate-y-1/2 transform shadow-[0_0_10px_rgba(224,7,0,0.5)] cursor-pointer hover:scale-110 transition-transform"></div>
                    </div>
                    <div className="flex justify-between font-[family-name:var(--font-mono)] text-[10px] text-gray-600">
                        <span>MÍN: $0</span>
                        <span>MÁX: $1K</span>
                    </div>
                </div>

                {/* Estado del sistema */}
                <div className="border-t border-white/10 pt-4 mt-8">
                    <div className="bg-black/40 p-3 border border-white/5 font-[family-name:var(--font-mono)] text-[10px] text-gray-500 space-y-1">
                        <div className="flex justify-between"><span>LATENCIA:</span> <span className="text-green-500">12ms</span></div>
                        <div className="flex justify-between"><span>CARGA:</span> <span>84%</span></div>
                        <div className="flex justify-between"><span>SESIÓN:</span> <span>ACTIVA</span></div>
                    </div>
                </div>
            </div>
        </aside>
    )
})

export default SidebarFilters
