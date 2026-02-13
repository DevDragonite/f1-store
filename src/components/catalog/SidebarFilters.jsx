import { memo } from 'react'

const TEAMS = [
    { value: 'RED_BULL_RACING', label: 'RED_BULL_RACING' },
    { value: 'SCUDERIA_FERRARI', label: 'SCUDERIA_FERRARI' },
    { value: 'MERCEDES_AMG', label: 'MERCEDES_AMG' },
    { value: 'MCLAREN', label: 'MCLAREN' },
    { value: 'ASTON_MARTIN', label: 'ASTON_MARTIN' },
    { value: 'CADILLAC_F1', label: 'CADILLAC_F1' },
]

const CATEGORIES = [
    { value: 'franelas', label: '>> FRANELAS' },
    { value: 'hoodies', label: '>> HOODIES' },
    { value: 'gorras', label: '>> GORRAS' },
    { value: 'chaquetas', label: '>> CHAQUETAS' },
    { value: 'coleccionables', label: '>> COLECCIONABLES' },
]

const SidebarFilters = memo(function SidebarFilters({
    selectedTeams = [],
    onTeamToggle,
    selectedCategory = null,
    onCategorySelect,
    priceRange = [0, 500],
    onPriceChange,
    productCounts = {},
    isOpen = false, // New prop
    onClose = () => { } // New prop
}) {
    return (
        <>
            {/* Mobile Backdrop */}
            <div
                className={`fixed inset-0 bg-black/80 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Sidebar Container */}
            <aside className={`w-80 fixed left-0 top-0 lg:top-16 bottom-0 z-50 lg:z-30 bg-carbon border-r border-white/10 overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} custom-scrollbar`}>
                <div className="p-6 space-y-8">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <h2 className="font-[family-name:var(--font-mono)] text-sm text-primary tracking-widest uppercase">Filtros</h2>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => {
                                    onCategorySelect(null)
                                    onPriceChange([0, 500])
                                    selectedTeams.forEach(t => onTeamToggle(t))
                                }}
                                className="text-[10px] font-[family-name:var(--font-mono)] text-gray-500 hover:text-primary transition-colors uppercase tracking-wider"
                            >
                                Limpiar
                            </button>
                            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
                                <span className="material-icons">close</span>
                            </button>
                        </div>
                    </div>

                    {/* Equipo Constructor */}
                    <div className="space-y-4">
                        <h3 className="text-xs uppercase tracking-wider text-gray-400">Equipo Constructor</h3>
                        <div className="space-y-2">
                            {TEAMS.map((team) => {
                                const isActive = selectedTeams.includes(team.value)
                                const count = productCounts[team.value] || 0
                                return (
                                    <label
                                        key={team.value}
                                        onClick={() => onTeamToggle(team.value)}
                                        className={`flex items-center justify-between group cursor-pointer p-2 rounded transition-colors border ${isActive
                                            ? 'border-primary/40 bg-primary/10'
                                            : 'border-transparent hover:border-white/10 hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 border transition-colors ${isActive
                                                ? 'border-primary bg-primary'
                                                : 'border-gray-500 group-hover:border-primary'
                                                }`}></div>
                                            <span className="font-[family-name:var(--font-mono)] text-xs text-gray-300">{team.label}</span>
                                        </div>
                                        <span className="text-[10px] text-gray-600 font-[family-name:var(--font-mono)]">[{String(count).padStart(2, '0')}]</span>
                                    </label>
                                )
                            })}
                        </div>
                    </div>

                    {/* Categoría */}
                    <div className="space-y-4">
                        <h3 className="text-xs uppercase tracking-wider text-gray-400">Categoría</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {CATEGORIES.map((cat) => {
                                const isActive = selectedCategory === cat.value
                                return (
                                    <button
                                        key={cat.value}
                                        onClick={() => onCategorySelect(isActive ? null : cat.value)}
                                        className={`border py-2 px-3 text-xs font-[family-name:var(--font-mono)] transition-all text-left ${isActive
                                            ? 'border-primary bg-primary/20 text-white shadow-[0_0_10px_rgba(224,7,0,0.3)]'
                                            : 'border-white/10 bg-asphalt hover:bg-primary hover:border-primary hover:text-white text-gray-400'
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Precio */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <h3 className="text-xs uppercase tracking-wider text-gray-400">Precio</h3>
                            <span className="font-[family-name:var(--font-mono)] text-xs text-technical-blue">${priceRange[0]} - ${priceRange[1]}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="500"
                            step="10"
                            value={priceRange[1]}
                            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
                            className="w-full accent-primary cursor-pointer"
                        />
                        <div className="flex justify-between font-[family-name:var(--font-mono)] text-[10px] text-gray-600">
                            <span>MÍN: $0</span>
                            <span>MÁX: $500</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
})

export default SidebarFilters
