import { WifiOff, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { buttonStyles } from '@/components/ui/button'
import { Logo } from '@/components/layout/logo'

export const metadata = {
  title: 'Offline',
  robots: { index: false, follow: false },
}

export default function OfflinePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-stone-50 px-4 py-16 text-center dark:bg-stone-950">
      <Logo className="mb-8" />
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-300">
        <WifiOff className="h-8 w-8" aria-hidden="true" />
      </span>
      <h1 className="mt-6 font-display text-3xl tracking-tight">You’re offline</h1>
      <p className="mt-3 max-w-sm text-sm leading-6 text-stone-600 dark:text-stone-400">
        Looks like you’ve lost your connection. Check your network and try again
        — your bag and wishlist are saved right here on your device.
      </p>
      <Link href="/" className={`${buttonStyles({ variant: 'secondary', size: 'lg' })} mt-8`}>
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Try again
      </Link>
    </div>
  )
}