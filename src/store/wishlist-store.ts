import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface WishlistState {
  slugs: string[]
  toggle: (slug: string) => void
  remove: (slug: string) => void
  clear: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      slugs: [],
      toggle: (slug) =>
        set((state) => ({
          slugs: state.slugs.includes(slug)
            ? state.slugs.filter((item) => item !== slug)
            : [...state.slugs, slug],
        })),
      remove: (slug) =>
        set((state) => ({ slugs: state.slugs.filter((item) => item !== slug) })),
      clear: () => set({ slugs: [] }),
    }),
    {
      name: 'eclosh-wishlist',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const selectWishlistCount = (state: WishlistState) => state.slugs.length