import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface CartItem {
  /** Stable line id: one product + size + colour is one line. */
  id: string
  slug: string
  name: string
  brand: string
  price: number
  compareAtPrice?: number
  image: string
  size: string
  color: string
  quantity: number
}

export interface CartInput {
  slug: string
  name: string
  brand: string
  price: number
  compareAtPrice?: number
  image: string
  size: string
  color: string
}

interface CartState {
  items: CartItem[]
  lastAdded?: string
  addItem: (input: CartInput, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clear: () => void
}

const lineId = (input: CartInput) => `${input.slug}::${input.size}::${input.color}`

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (input, quantity = 1) =>
        set((state) => {
          const id = lineId(input)
          const existing = state.items.find((item) => item.id === id)

          const items = existing
            ? state.items.map((item) =>
                item.id === id
                  ? { ...item, quantity: Math.min(item.quantity + quantity, 99) }
                  : item,
              )
            : [...state.items, { ...input, id, quantity }]

          return { items, lastAdded: id }
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.id !== id)
              : state.items.map((item) =>
                  item.id === id ? { ...item, quantity: Math.min(quantity, 99) } : item,
                ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'eclosh-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

export const selectCartCount = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0)

export const selectCartSubtotal = (state: CartState) =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0)