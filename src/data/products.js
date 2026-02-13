/*
 * Centralized product data for the entire store.
 * When Supabase is integrated this will be replaced by DB queries.
 */

const products = [
    {
        id: 'rb-77-x',
        name: 'Hoodie Velocidad V2',
        slug: 'hoodie-velocidad-v2',
        price: 120,
        sku: 'RB-77-X',
        team: 'RED_BULL_RACING',
        category: 'hoodies',
        tag: 'T.2024',
        tagStyle: 'bg-black/60 text-white border-white/10',
        soldOut: false,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80&auto=format',
        imageLg: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=85&auto=format',
        description: 'Hoodie premium de algodón pesado con estampado técnico de telemetría. Corte regular, capucha ajustable y bolsillo canguro. Inspirado en los colores del equipo Red Bull Racing.',
        specs: ['MATERIAL: ALGODÓN_PREMIUM', 'PESO: 380g', 'CORTE: REGULAR', 'TEMPORADA: 2024'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
        id: 'mb-01-z',
        name: 'Bomber Aero Pro',
        slug: 'bomber-aero-pro',
        price: 280,
        sku: 'MB-01-Z',
        team: 'MERCEDES_AMG',
        category: 'chaquetas',
        tag: null,
        tagStyle: '',
        soldOut: true,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80&auto=format',
        imageLg: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&q=85&auto=format',
        description: 'Chaqueta bomber de nylon con forro térmico. Diseño aerodinámico inspirado en el equipo Mercedes AMG. Cremallera YKK y acabados reflectivos.',
        specs: ['MATERIAL: NYLON_RIPSTOP', 'FORRO: TÉRMICO', 'AERO: RESISTENTE_VIENTO', 'TEMPORADA: 2024'],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: 'fer-99-t',
        name: 'Funko Chrono LTD',
        slug: 'funko-chrono-ltd',
        price: 35,
        sku: 'FER-99-T',
        team: 'SCUDERIA_FERRARI',
        category: 'funkos',
        tag: 'RECIÉN_LLEGADO',
        tagStyle: 'bg-technical-blue/10 text-technical-blue border-technical-blue/30',
        soldOut: false,
        image: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&q=80&auto=format',
        imageLg: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=1200&q=85&auto=format',
        description: 'Figura Funko Pop! edición limitada del piloto Scuderia Ferrari. Solo 500 unidades producidas a nivel mundial. Caja coleccionable numerada.',
        specs: ['TIPO: FIGURA_VINILO', 'ESCALA: 4_PULG', 'EDICIÓN: LIMITADA', 'TIRADA: 500_UNID'],
        sizes: null,
    },
    {
        id: 'fer-05-h',
        name: 'Gorra Scuderia',
        slug: 'gorra-scuderia',
        price: 45,
        sku: 'FER-05-H',
        team: 'SCUDERIA_FERRARI',
        category: 'gorras',
        tag: null,
        tagStyle: '',
        soldOut: false,
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600&q=80&auto=format',
        imageLg: 'https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=1200&q=85&auto=format',
        description: 'Gorra snapback oficial con logo bordado de Scuderia Ferrari. Ajuste trasero de plástico, visera curvada y paneles de malla transpirable.',
        specs: ['TELA: POLIÉSTER', 'AJUSTE: SNAPBACK', 'TEMPORADA: 2024', 'EQUIPO: FERRARI'],
        sizes: ['Única'],
    },
    {
        id: 'mcl-33-e',
        name: 'Franela Grid Walk',
        slug: 'franela-grid-walk',
        price: 55,
        sku: 'MCL-33-E',
        team: 'RED_BULL_RACING',
        category: 'franelas',
        tag: null,
        tagStyle: '',
        soldOut: false,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&auto=format',
        imageLg: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=85&auto=format',
        description: 'Franela de jersey suave con estampado de circuito en la espalda. Corte slim, cuello redondo reforzado y etiqueta tejida interna.',
        specs: ['TELA: JERSEY_ALGODÓN', 'CORTE: SLIM', 'ESTAMPADO: CIRCUITO', 'PESO: 180g'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
        id: 'rbr-11-a',
        name: 'LEGO Paddock Set',
        slug: 'lego-paddock-set',
        price: 199,
        sku: 'RBR-11-A',
        team: 'RED_BULL_RACING',
        category: 'legos',
        tag: 'LO_MÁS_HOT',
        tagStyle: 'bg-primary text-white border-black/30',
        soldOut: false,
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=600&q=80&auto=format',
        imageLg: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=1200&q=85&auto=format',
        description: 'Set LEGO Technic del paddock de Red Bull Racing con 1.432 piezas. Incluye modelo a escala 1:8 del monoplaza RB20, garaje y mini figuras del equipo.',
        specs: ['TIPO: SET_ARMABLE', 'PIEZAS: 1.432', 'ESCALA: 1:8', 'EDAD: 18+'],
        sizes: null,
    },
]

export default products

export function getProductBySlug(slug) {
    return products.find(p => p.slug === slug) || null
}

export function getProductById(id) {
    return products.find(p => p.id === id) || null
}
