import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 px-6 py-16 text-center dark:border-stone-700',
        className,
      )}
    >
      {Icon && (
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      )}
      <h2 className="mt-4 text-lg font-semibold text-stone-900 dark:text-stone-100">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-md text-sm leading-6 text-stone-600 dark:text-stone-400">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}