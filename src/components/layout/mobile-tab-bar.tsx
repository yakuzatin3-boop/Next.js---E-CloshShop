'use client'

import { Heart, Home, Search, ShoppingBag, Store } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useHydrated } from '@/hooks/use-hydrated'
import { selectCartCount, useCartStore } from '@/store/cart-store'
import { useUIStore } from '@/store/ui-store'
import { cn } from '@/lib/utils'

const BASE_TABS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Shop', href: '/shop', icon: Store },
  { label: 'Search', href: '/search', icon: Search },
  { label: 'Saved', href: '/wishlist', icon: Heart },
]

export function MobileTabBar() {
  const pathname = usePathname()
  const hydrated = useHydrated()
  const openCart = useUIStore((state) => state.openCart)
  const cartCount = useCartStore(selectCartCount)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-stone-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden dark:border-stone-800 dark:bg-stone-950/95"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around">
        {BASE_TABS.slice(0, 2).map((tab) => (
          <Tab key={tab.href} {...tab} active={isActive(tab.href)} />
        ))}

        <li className="flex flex-1 justify-center">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart${hydrated && cartCount ? `, ${cartCount} items` : ''}`}
            className="relative -mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent-600 text-white shadow-raised shadow-accent-950/30 transition-transform active:scale-95"
          >
            <ShoppingBag className="h-6 w-6" />
            {hydrated && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-900 px-1 text-[10px] font-semibold text-white dark:bg-white dark:text-stone-900">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
        </li>

        {BASE_TABS.slice(2).map((tab) => (
          <Tab key={tab.href} {...tab} active={isActive(tab.href)} />
        ))}
      </ul>
    </nav>
  )
}

function Tab({
  label,
  href,
  icon: Icon,
  active,
}: {
  label: string
  href: string
  icon: typeof Home
  active: boolean
}) {
  return (
    <li className="flex-1">
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors',
          active
            ? 'text-accent-600 dark:text-accent-400'
            : 'text-stone-500 dark:text-stone-400',
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
        {label}
      </Link>
    </li>
  )
}