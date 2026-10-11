import { FileX2 } from 'lucide-react'
import Link from 'next/link'

import { buttonStyles } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-300">
        <FileX2 className="h-8 w-8" aria-hidden="true" />
      </span>
      <h1 className="mt-6 font-display text-4xl tracking-tight">Page not found</h1>
      <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
        The page you’re after has moved or never existed. Let’s get you back to
        something good.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonStyles({ variant: 'primary' })}>
          Back to home
        </Link>
        <Link href="/shop" className={buttonStyles({ variant: 'outline' })}>
          Browse the shop
        </Link>
      </div>
    </div>
  )
}