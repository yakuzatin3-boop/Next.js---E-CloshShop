import { create } from 'zustand'

export type ToastVariant = 'default' | 'success' | 'error'

export interface Toast {
  id: string
  title: string
  description?: string
  variant: ToastVariant
}

interface UIState {
  cartOpen: boolean
  menuOpen: boolean
  filtersOpen: boolean
  toasts: Toast[]
  openCart: () => void
  closeCart: () => void
  openMenu: () => void
  closeMenu: () => void
  openFilters: () => void
  closeFilters: () => void
  pushToast: (toast: Omit<Toast, 'id' | 'variant'> & { variant?: ToastVariant }) => void
  dismissToast: (id: string) => void
}

export const useUIStore = create<UIState>()((set) => ({
  cartOpen: false,
  menuOpen: false,
  filtersOpen: false,
  toasts: [],
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),
  openFilters: () => set({ filtersOpen: true }),
  closeFilters: () => set({ filtersOpen: false }),
  pushToast: ({ title, description, variant = 'default' }) => {
    const id = Math.random().toString(36).slice(2)
    set((state) => ({ toasts: [...state.toasts, { id, title, description, variant }] }))

    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }))
      }, 4000)
    }
  },
  dismissToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}))