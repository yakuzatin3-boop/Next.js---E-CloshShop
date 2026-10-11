'use client'

import { Truck } from 'lucide-react'

import { formatCurrency } from '@/lib/format'
import { SHIPPING } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function FreeShippingBar({
  subtotal,
  className,
}: {
  subtotal: number
  className?: string
}) {
  const remaining = Math.max(0, SHIPPING.freeThreshold - subtotal)
  const progress = Math.min(100, (subtotal / SHIPPING.freeThreshold) * 100)
  const unlocked = remaining === 0

  return (
    <div className={cn('space-y-2', className)}>
      <p className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
        <Truck className="h-4 w-4 shrink-0" aria-hidden="true" />
        {unlocked ? (
          <span className="font-medium text-emerald-600 dark:text-emerald-400">
            You’ve unlocked free shipping
          </span>
        ) : (
          <span>
            Spend{' '}
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              {formatCurrency(remaining)}
            </span>{' '}
            more for free shipping
          </span>
        )}
      </p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            unlocked ? 'bg-emerald-500' : 'bg-accent-600',
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}