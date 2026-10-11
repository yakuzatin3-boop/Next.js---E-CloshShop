'use client'

import { Search as SearchIcon, X } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useRef, useState, useSyncExternalStore } from 'react'

import { ProductGrid } from '@/components/product/product-grid'
import { inputStyles } from '@/components/ui/input'
import { SectionHeading } from '@/components/ui/container'
import { searchProducts } from '@/lib/products'
import { cn } from '@/lib/utils'

const POPULAR = ['dress', 'sneakers', 'linen', 'overshirt', 'denim', 'tote']
const KEY = 'eclosh-search-history'
const EVENT = 'eclosh:search-history'

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

export function SearchContent() {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const rawHistory = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const history = useMemo(() => {
    try {
      const parsed = JSON.parse(rawHistory) as string[]
      return Array.isArray(parsed) ? parsed.slice(0, 5) : []
    } catch {
      return []
    }
  }, [rawHistory])

  const results = useMemo(() => searchProducts(query), [query])

  const runSearch = (term: string) => {
    setQuery(term)
    if (!term.trim()) return
    try {
      const current = JSON.parse(localStorage.getItem(KEY) ?? '[]') as string[]
      const next = [term, ...current.filter((item) => item !== term)].slice(0, 5)
      localStorage.setItem(KEY, JSON.stringify(next))
      window.dispatchEvent(new Event(EVENT))
    } catch {
      /* ignore */
    }
  }

  const searching = query.trim().length > 0

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Find it fast"
        title="Search the shop"
        description="Search by product, brand, colour or category."
      />

      <div className="mt-8 max-w-2xl">
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-stone-400"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => runSearch(event.target.value)}
            placeholder="Try “linen dress” or “sneakers”…"
            aria-label="Search products"
            className={cn(inputStyles, 'h-13 pl-12 pr-12 text-base')}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {!searching && (
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {history.length > 0 && (
              <section aria-label="Recent searches">
                <h2 className="text-sm font-semibold">Recent searches</h2>
                <ul className="mt-3 space-y-2">
                  {history.map((term) => (
                    <li key={term}>
                      <Link
                        href={`/shop?q=${encodeURIComponent(term)}`}
                        className="group flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                        onClick={() => setQuery(term)}
                      >
                        <SearchIcon className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
                        {term}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section aria-label="Popular searches">
              <h2 className="text-sm font-semibold">Popular right now</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {POPULAR.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => runSearch(term)}
                    className="rounded-full border border-stone-300 px-3 py-1.5 text-sm text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-400 dark:hover:text-white"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {searching && (
        <div className="mt-10">
          <p className="text-sm text-stone-600 dark:text-stone-400" aria-live="polite">
            {results.length
              ? `${results.length} ${results.length === 1 ? 'result' : 'results'} for “${query}”`
              : `No results for “${query}”`}
          </p>
          <div className="mt-6">
            <ProductGrid
              products={results}
              priorityCount={2}
              emptyTitle="Nothing matched your search"
              emptyDescription="Check the spelling or try a broader term like a category."
              emptyAction={
                <Link
                  href="/shop"
                  className="text-sm font-medium text-accent-700 hover:underline dark:text-accent-400"
                >
                  Browse everything
                </Link>
              }
            />
          </div>
        </div>
      )}
    </div>
  )
}