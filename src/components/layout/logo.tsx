import Link from 'next/link'

import { SITE } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.name} home`}
      className={cn(
        'font-display text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl dark:text-stone-50',
        className,
      )}
    >
      E-Closh
      <span className="text-accent-600">.</span>
    </Link>
  )
}