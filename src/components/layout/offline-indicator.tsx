'use client'

import { WifiOff } from 'lucide-react'
import { useOffline } from 'next/offline'

/** Shows while the app detects no connectivity, next to where fetches would wait. */
export function OfflineIndicator() {
  const isOffline = useOffline()

  if (!isOffline) return null

  return (
    <div
      role="status"
      className="fixed top-18 left-1/2 z-[65] flex -translate-x-1/2 items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-white shadow-raised dark:bg-stone-100 dark:text-stone-900"
    >
      <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
      You’re offline — we’ll retry once you’re back.
    </div>
  )
}