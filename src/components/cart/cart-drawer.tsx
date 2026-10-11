'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

import { CartLine } from '@/components/cart/cart-line'
import { FreeShippingBar } from '@/components/cart/free-shipping-bar'
import { buttonStyles } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { EmptyState } from '@/components/ui/empty-state'
import { formatCurrency } from '@/lib/format'
import { selectCartSubtotal, useCartStore } from '@/store/cart-store'
import { useUIStore } from '@/store/ui-store'

export function CartDrawer() {
  const open = useUIStore((state) => state.cartOpen)
  const close = useUIStore((state) => state.closeCart)
  const items = useCartStore((state) => state.items)
  const subtotal = useCartStore(selectCartSubtotal)

  return (
    <Drawer
      open={open}
      onClose={close}
      title={`Your bag${items.length ? ` (${items.length})` : ''}`}
      footer={
        items.length > 0 ? (
          <div className="space-y-4">
            <FreeShippingBar subtotal={subtotal} />
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-600 dark:text-stone-400">Subtotal</span>
              <span className="text-base font-semibold tabular-nums">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="grid gap-2">
              <Link
                href="/checkout"
                onClick={close}
                className={buttonStyles({ variant: 'secondary', size: 'lg' })}
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={close}
                className={buttonStyles({ variant: 'outline', size: 'lg' })}
              >
                View bag
              </Link>
            </div>
          </div>
        ) : null
      }
    >
      {items.length === 0 ? (
        <div className="p-5">
          <EmptyState
            icon={ShoppingBag}
            title="Your bag is empty"
            description="Once you add pieces to your bag they will show up here."
            action={
              <Link
                href="/shop"
                onClick={close}
                className={buttonStyles({ variant: 'primary' })}
              >
                Start shopping
              </Link>
            }
          />
        </div>
      ) : (
        <ul className="divide-y divide-stone-200 dark:divide-stone-800">
          {items.map((item) => (
            <li key={item.id} className="p-5">
              <CartLine item={item} onNavigate={close} />
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  )
}