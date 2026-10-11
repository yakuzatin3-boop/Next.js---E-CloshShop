'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Drawer } from '@/components/ui/drawer'
import { CATEGORIES } from '@/data/products'
import { useUIStore } from '@/store/ui-store'
import { cn } from '@/lib/utils'

export function MobileMenu() {
  const open = useUIStore((state) => state.menuOpen)
  const close = useUIStore((state) => state.closeMenu)
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <Drawer open={open} onClose={close} side="left" title="Menu">
      <nav aria-label="Mobile" className="p-4">
        <ul className="space-y-1">
          <li>
            <Link
              href="/shop?filter=new"
              onClick={close}
              className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              New in
            </Link>
          </li>
          {CATEGORIES.map((category) => {
            const isOpen = expanded === category.slug
            return (
              <li key={category.slug}>
                <div className="flex items-center">
                  <Link
                    href={`/shop/${category.slug}`}
                    onClick={close}
                    className="flex-1 rounded-xl px-4 py-3 text-base font-medium hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    {category.name}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-label={`Toggle ${category.name} submenu`}
                    onClick={() => setExpanded(isOpen ? null : category.slug)}
                    className="rounded-full p-2.5 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    <ChevronRight
                      className={cn(
                        'h-4 w-4 transition-transform',
                        isOpen && 'rotate-90',
                      )}
                    />
                  </button>
                </div>
                {isOpen && (
                  <p className="px-4 pb-3 text-sm text-stone-500">
                    {category.description}
                  </p>
                )}
              </li>
            )
          })}
          <li>
            <Link
              href="/shop?filter=sale"
              onClick={close}
              className="block rounded-xl px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              Sale
            </Link>
          </li>
        </ul>

        <div className="mt-6 border-t border-stone-200 pt-6 dark:border-stone-800">
          <Link
            href="/wishlist"
            onClick={close}
            className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            Wishlist
          </Link>
          <Link
            href="/account"
            onClick={close}
            className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            Account
          </Link>
        </div>
      </nav>
    </Drawer>
  )
}