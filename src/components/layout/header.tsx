'use client'

import { Heart, Menu, Search, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'

import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { Logo } from '@/components/layout/logo'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Container } from '@/components/ui/container'
import { CATEGORIES } from '@/data/products'
import { MEGA_MENU } from '@/data/site'
import { useHydrated } from '@/hooks/use-hydrated'
import { selectCartCount, useCartStore } from '@/store/cart-store'
import { useUIStore } from '@/store/ui-store'
import { selectWishlistCount, useWishlistStore } from '@/store/wishlist-store'
import { cn } from '@/lib/utils'

const PRIMARY_NAV = [
  { label: 'New in', href: '/shop?filter=new' },
  ...CATEGORIES.map((category) => ({
    label: category.name,
    href: `/shop/${category.slug}`,
  })),
  { label: 'Sale', href: '/shop?filter=sale' },
]

const iconButton =
  'relative flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white'

export function Header() {
  const hydrated = useHydrated()
  const openMenu = useUIStore((state) => state.openMenu)
  const openCart = useUIStore((state) => state.openCart)
  const cartCount = useCartStore(selectCartCount)
  const wishlistCount = useWishlistStore(selectWishlistCount)

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div className="border-b border-stone-200 bg-white/85 backdrop-blur-lg dark:border-stone-800 dark:bg-stone-950/85">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 lg:h-18">
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={openMenu}
                aria-label="Open menu"
                className={iconButton}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            <Logo />

            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 lg:flex"
            >
              {PRIMARY_NAV.map((item) => {
                const column = MEGA_MENU.find(
                  (menu) => menu.title.toLowerCase() === item.label.toLowerCase(),
                )
                return (
                  <div key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center rounded-full px-3.5 py-2 text-sm font-medium tracking-tight text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white',
                        item.label === 'Sale' && 'text-red-600 dark:text-red-400',
                      )}
                    >
                      {item.label}
                    </Link>
                    {column && (
                      <div className="invisible absolute top-full left-1/2 z-50 w-56 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        <div className="rounded-2xl border border-stone-200 bg-white p-2 shadow-raised dark:border-stone-800 dark:bg-stone-900">
                          {column.links.map((link) => (
                            <Link
                              key={link.label}
                              href={link.href}
                              className="block rounded-xl px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-white"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            <div className="flex items-center gap-0.5">
              <Link
                href="/search"
                aria-label="Search"
                className={cn(iconButton, 'hidden sm:flex')}
              >
                <Search className="h-5 w-5" />
              </Link>
              <Link href="/search" aria-label="Search" className={cn(iconButton, 'sm:hidden')}>
                <Search className="h-5 w-5" />
              </Link>
              <ThemeToggle className={cn(iconButton, 'hidden sm:flex')} />
              <Link
                href="/wishlist"
                aria-label={`Wishlist${hydrated && wishlistCount ? `, ${wishlistCount} items` : ''}`}
                className={cn(iconButton, 'hidden sm:flex')}
              >
                <Heart className="h-5 w-5" />
                {hydrated && wishlistCount > 0 && <CountBubble count={wishlistCount} />}
              </Link>
              <Link
                href="/account"
                aria-label="Account"
                className={cn(iconButton, 'hidden sm:flex')}
              >
                <User className="h-5 w-5" />
              </Link>
              <button
                type="button"
                onClick={openCart}
                aria-label={`Open cart${hydrated && cartCount ? `, ${cartCount} items` : ''}`}
                className={iconButton}
              >
                <ShoppingBag className="h-5 w-5" />
                {hydrated && cartCount > 0 && <CountBubble count={cartCount} />}
              </button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}

function CountBubble({ count }: { count: number }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-600 px-1 text-[10px] font-semibold text-white">
      {count > 99 ? '99+' : count}
    </span>
  )
}