'use client'

import { useCallback, useMemo, useSyncExternalStore } from 'react'

const KEY = 'eclosh-recently-viewed'
const EVENT = 'eclosh:recently-viewed'
const LIMIT = 8

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(KEY) ?? '[]'
  } catch {
    return '[]'
  }
}

function getServerSnapshot(): string {
  return '[]'
}

export function useRecentlyViewed(slug?: string) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const slugs = useMemo(() => {
    try {
      const parsed = JSON.parse(raw) as string[]
      return Array.isArray(parsed) ? parsed.filter((item) => item !== slug) : []
    } catch {
      return []
    }
  }, [raw, slug])

  const record = useCallback((value: string) => {
    try {
      const current = JSON.parse(localStorage.getItem(KEY) ?? '[]') as string[]
      const next = [value, ...current.filter((item) => item !== value)].slice(0, LIMIT)
      localStorage.setItem(KEY, JSON.stringify(next))
      window.dispatchEvent(new Event(EVENT))
    } catch {
      /* storage unavailable — non-critical */
    }
  }, [])

  return { slugs, record }
}