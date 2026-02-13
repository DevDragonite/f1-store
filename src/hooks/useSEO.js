import { useEffect } from 'react'

/**
 * Sets the document title and meta description for SEO.
 * Usage: useSEO('Catálogo', 'Explora nuestro catálogo...')
 */
export default function useSEO(title, description) {
    useEffect(() => {
        const base = 'Rennsport'
        document.title = title ? `${title} — ${base}` : `${base} — Ropa F1 Venezuela`

        if (description) {
            let meta = document.querySelector('meta[name="description"]')
            if (meta) {
                meta.setAttribute('content', description)
            }
        }
    }, [title, description])
}
