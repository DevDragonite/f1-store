import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Custom hook to fetch all products from Supabase.
 * Maps DB columns (snake_case) to frontend model (camelCase).
 */
export default function useProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('name')

                if (error) throw error

                if (data) {
                    // Map DB columns to frontend camelCase
                    const mapped = data.map(p => ({
                        ...p,
                        imageLg: p.image_lg, // critical mapping
                        soldOut: p.sold_out,
                        tagStyle: p.tag_style,
                        discount: p.discount || 0,
                    }))
                    setProducts(mapped)
                }
            } catch (err) {
                console.error('Error fetching products:', err)
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    return { products, loading, error }
}
