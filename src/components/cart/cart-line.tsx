'use client'

import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Price } from '@/components/ui/price'
import { QuantityStepper } from '@/components/ui/quantity-stepper'
import { useCartStore, type CartItem } from '@/store/cart-store'

export function CartLine({
  item,
  onNavigate,
  compact = false,
}: {
  item: CartItem
  onNavigate?: () => void
  compact?: boolean
}) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  return (
    <div className="flex gap-4">
      <Link
        href={`/product/${item.slug}`}
        onClick={onNavigate}
        className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800"
      >
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium tracking-wide text-stone-500 uppercase">
              {item.brand}
            </p>
            <h3 className="truncate text-sm font-medium">
              <Link
                href={`/product/${item.slug}`}
                onClick={onNavigate}
                className="hover:text-accent-700 dark:hover:text-accent-400"
              >
                {item.name}
              </Link>
            </h3>
          </div>
          <Price value={item.price * item.quantity} className="shrink-0" />
        </div>

        <p className="mt-1 text-xs text-stone-500">
          {item.size} · {item.color}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          {compact ? (
            <span className="text-xs text-stone-500">Qty {item.quantity}</span>
          ) : (
            <QuantityStepper
              value={item.quantity}
              onChange={(value) => updateQuantity(item.id, value)}
            />
          )}
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name} from cart`}
            className="flex items-center gap-1 text-xs font-medium text-stone-500 transition-colors hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}