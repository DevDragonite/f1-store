import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/*
 * Cart Store — Zustand + localStorage persistence.
 * Items are stored as { productId, name, price, image, qty, size }.
 */

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            /* Add item to cart (or increment qty if same product+size already in cart) */
            addItem: (product, size = null) => {
                const items = get().items
                const key = `${product.id}-${size || 'default'}`
                const existing = items.find(i => i.key === key)

                if (existing) {
                    set({
                        items: items.map(i =>
                            i.key === key ? { ...i, qty: i.qty + 1 } : i
                        ),
                    })
                } else {
                    set({
                        items: [
                            ...items,
                            {
                                key,
                                productId: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                sku: product.sku,
                                size,
                                qty: 1,
                            },
                        ],
                    })
                }
            },

            /* Remove item from cart by key */
            removeItem: (key) => {
                set({ items: get().items.filter(i => i.key !== key) })
            },

            /* Update quantity for a specific item */
            updateQty: (key, qty) => {
                if (qty <= 0) {
                    get().removeItem(key)
                    return
                }
                set({
                    items: get().items.map(i =>
                        i.key === key ? { ...i, qty } : i
                    ),
                })
            },

            /* Clear entire cart */
            clearCart: () => set({ items: [] }),

            /* Computed: total number of items */
            get totalItems() {
                return get().items.reduce((sum, i) => sum + i.qty, 0)
            },

            /* Computed: subtotal price */
            get subtotal() {
                return get().items.reduce((sum, i) => sum + i.price * i.qty, 0)
            },
        }),
        {
            name: 'rennsport-cart', // localStorage key
        }
    )
)

export default useCartStore
