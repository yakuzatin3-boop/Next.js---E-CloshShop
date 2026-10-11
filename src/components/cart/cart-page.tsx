'use client'

import { ArrowRight, ShoppingBag, Tag } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { CartLine } from '@/components/cart/cart-line'
import { FreeShippingBar } from '@/components/cart/free-shipping-bar'
import { SectionHeading } from '@/components/ui/container'
import { Button, buttonStyles } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { Input } from '@/components/ui/input'
import { computeOrderTotals, PROMO_CODES } from '@/lib/checkout'
import { formatCurrency } from '@/lib/format'
import { SHIPPING } from '@/lib/constants'
import { selectCartSubtotal, useCartStore } from '@/store/cart-store'
import { useUIStore } from '@/store/ui-store'

export function CartPage() {
  const items = useCartStore((state) => state.items)
  const subtotal = useCartStore(selectCartSubtotal)
  const pushToast = useUIStore((state) => state.pushToast)
  const [promoCode, setPromoCode] = useState('')
  const [appliedCode, setAppliedCode] = useState<string | null>(null)
  const [promoError, setPromoError] = useState<string | null>(null)

  const totals = computeOrderTotals(subtotal, {
    shippingMethodId: 'standard',
    promoCode: appliedCode,
  })

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase()
    if (!code) return
    if (PROMO_CODES[code]) {
      setAppliedCode(code)
      setPromoError(null)
      pushToast({ title: 'Promo applied', description: PROMO_CODES[code].label, variant: 'success' })
    } else {
      setPromoError('That code is not valid.')
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionHeading eyebrow="Your bag" title="Shopping bag" />
          <div className="mt-10">
            <EmptyState
              icon={ShoppingBag}
              title="Your bag is empty"
              description="Add something you love — new arrivals drop every week."
              action={
                <Link href="/shop" className={buttonStyles({ variant: 'secondary' })}>
                  Start shopping
                </Link>
              }
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Your bag" title="Shopping bag" />

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <section>
          <div className="rounded-2xl border border-stone-200 p-5 dark:border-stone-800 sm:p-6">
            <FreeShippingBar subtotal={subtotal} className="mb-6" />
            <ul className="divide-y divide-stone-200 dark:divide-stone-800">
              {items.map((item) => (
                <li key={item.id} className="py-5 first:pt-0 last:pb-0">
                  <CartLine item={item} />
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 hover:underline dark:text-accent-400"
          >
            Continue shopping
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-stone-200 p-5 sm:p-6 dark:border-stone-800">
            <h2 className="text-base font-semibold tracking-tight">Order summary</h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatCurrency(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Promo ({appliedCode})</span>
                  <span className="tabular-nums">−{formatCurrency(totals.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Shipping</span>
                <span className="tabular-nums">
                  {totals.shipping === 0 ? 'Free' : formatCurrency(totals.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Estimated tax</span>
                <span className="tabular-nums">{formatCurrency(totals.tax)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-stone-200 pt-4 text-base font-semibold dark:border-stone-800">
                <span>Total</span>
                <span className="tabular-nums">{formatCurrency(totals.total)}</span>
              </div>
            </div>

            {subtotal < SHIPPING.freeThreshold && (
              <p className="mt-4 rounded-xl bg-stone-50 px-3 py-2.5 text-xs text-stone-600 dark:bg-stone-900 dark:text-stone-400">
                You’re {formatCurrency(SHIPPING.freeThreshold - subtotal)} away from free
                standard shipping.
              </p>
            )}

            <div className="mt-5">
              <Input
                label="Promo code"
                placeholder="WELCOME10"
                value={promoCode}
                onChange={(event) => setPromoCode(event.target.value)}
                leading={<Tag className="h-4 w-4" />}
                error={promoError ?? undefined}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    applyPromo()
                  }
                }}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={applyPromo}
                disabled={Boolean(appliedCode)}
              >
                {appliedCode ? `Applied (${appliedCode})` : 'Apply code'}
              </Button>
            </div>

            <Link
              href="/checkout"
              className={buttonStyles({ variant: 'secondary', size: 'lg' }) + ' mt-6 w-full'}
            >
              Proceed to checkout
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <p className="mt-3 text-center text-xs text-stone-500">
              Secure checkout · Visa, Mastercard, Amex, PayPal, Apple Pay
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}