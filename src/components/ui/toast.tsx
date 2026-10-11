'use client'

import { Check, Info, TriangleAlert, X } from 'lucide-react'

import { useUIStore } from '@/store/ui-store'
import { cn } from '@/lib/utils'

const ICONS = {
  default: Info,
  success: Check,
  error: TriangleAlert,
} as const

const TONES = {
  default: 'text-stone-500',
  success: 'text-emerald-600 dark:text-emerald-400',
  error: 'text-red-600 dark:text-red-400',
} as const

export function Toaster() {
  const toasts = useUIStore((state) => state.toasts)
  const dismiss = useUIStore((state) => state.dismissToast)

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:top-4 sm:right-4 sm:bottom-auto sm:items-end sm:px-0"
    >
      {toasts.map((toast) => {
        const Icon = ICONS[toast.variant]
        return (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex w-full max-w-sm animate-slide-up items-start gap-3 rounded-2xl border border-stone-200 bg-white p-3.5 shadow-raised dark:border-stone-800 dark:bg-stone-900"
          >
            <span className={cn('mt-0.5 shrink-0', TONES[toast.variant])}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {toast.title}
              </p>
              {toast.description && (
                <p className="mt-0.5 text-xs text-stone-600 dark:text-stone-400">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 rounded-full p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}