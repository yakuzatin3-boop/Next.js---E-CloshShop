'use client'

import { TriangleAlert } from 'lucide-react'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950">
        <TriangleAlert className="h-8 w-8" aria-hidden="true" />
      </span>
      <h1 className="mt-6 font-display text-4xl tracking-tight">Something went wrong</h1>
      <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
        An unexpected error occurred while rendering this page. Give it another go —
        it will probably be as good as new.
      </p>
      {error.digest && (
        <p className="mt-3 font-mono text-xs text-stone-400">Digest: {error.digest}</p>
      )}
      <div className="mt-8">
        <Button onClick={retry}>Try again</Button>
      </div>
    </div>
  )
}