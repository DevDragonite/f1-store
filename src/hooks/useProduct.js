import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Custom hook to fetch a single product by slug.
 */
export default function useProduct(slug) {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!slug) return

        async function fetchProduct() {
            setLoading(true)
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('slug', slug)
                    .single()

                if (error) throw error

                if (data) {
                    setProduct({
                        ...data,
                        imageLg: data.image_lg,
                        soldOut: data.sold_out,
                        tagStyle: data.tag_style,
                    })
                }
            } catch (err) {
                console.error('Error fetching product:', err)
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [slug])

    return { product, loading, error }
}
