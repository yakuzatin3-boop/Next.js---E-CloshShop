'use client'

import { SlidersHorizontal } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState, useTransition } from 'react'

import { ProductGrid } from '@/components/product/product-grid'
import { Pagination } from '@/components/shop/pagination'
import { SortSelect } from '@/components/shop/sort-select'
import {
  emptyFilters,
  FilterPanel,
  type ActiveFilters,
} from '@/components/shop/filter-panel'
import { Button, buttonStyles } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { filterProducts } from '@/lib/products'
import { SORT_OPTIONS, type SortId } from '@/lib/constants'
import type { CategorySlug } from '@/types/product'
import { cn } from '@/lib/utils'

interface ShopContentProps {
  category?: CategorySlug
  initialSort?: SortId
  initialFilter?: 'new' | 'sale'
  title: string
  description?: string
}

export function ShopContent({
  category,
  initialSort = 'featured',
  initialFilter,
  title,
  description,
}: ShopContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filters = useMemo<ActiveFilters>(
    () => ({
      sizes: searchParams.getAll('size'),
      colors: searchParams.getAll('color'),
      brands: searchParams.getAll('brand'),
      price: searchParams.getAll('price'),
    }),
    [searchParams],
  )

  const sortParam = searchParams.get('sort')
  const sort: SortId =
    sortParam && SORT_OPTIONS.some((option) => option.id === sortParam)
      ? (sortParam as SortId)
      : initialSort

  const syncUrl = useCallback(
    (nextSort: SortId, active: ActiveFilters) => {
      const params = new URLSearchParams(searchParams.toString())
      if (initialFilter) params.set('filter', initialFilter)
      params.set('sort', nextSort)
      if (category) params.set('category', category)

      params.delete('size')
      active.sizes.forEach((size) => params.append('size', size))
      params.delete('color')
      active.colors.forEach((color) => params.append('color', color))
      params.delete('brand')
      active.brands.forEach((brand) => params.append('brand', brand))
      params.delete('price')
      active.price.forEach((price) => params.append('price', price))
      params.delete('page')

      const query = params.toString()
      startTransition(() =>
        router.replace(`/shop${query ? `?${query}` : ''}`, { scroll: false }),
      )
    },
    [router, searchParams, category, initialFilter],
  )

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    startTransition(() => router.replace(`/shop?${params.toString()}`, { scroll: true }))
  }

  const activeCount =
    filters.sizes.length + filters.colors.length + filters.brands.length + filters.price.length

  const { products, total, page, pageCount } = useMemo(
    () =>
      filterProducts({
        category,
        filter: initialFilter,
        sizes: filters.sizes,
        colors: filters.colors,
        brands: filters.brands,
        price: filters.price,
        sort,
        page: Number(searchParams.get('page') ?? 1),
      }),
    [category, initialFilter, filters, sort, searchParams],
  )

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <header className="py-8 lg:py-12">
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600 dark:text-stone-400">
            {description}
          </p>
        )}
      </header>

      <div className="flex flex-col gap-10 lg:flex-row">
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-28">
            <h2 className="text-base font-semibold tracking-tight">Filters</h2>
            <div className="mt-5">
              <FilterPanel
                filters={filters}
                onChange={(next) => syncUrl(sort, next)}
              />
            </div>
            {activeCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-6"
                onClick={() => syncUrl(sort, emptyFilters())}
              >
                Clear all
              </Button>
            )}
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 border-b border-stone-200 pb-4 dark:border-stone-800">
            <p className="text-sm text-stone-600 dark:text-stone-400" aria-live="polite">
              {total} {total === 1 ? 'product' : 'products'}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className={cn(
                  buttonStyles({ variant: 'outline', size: 'sm' }),
                  'lg:hidden',
                )}
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Filters
                {activeCount > 0 && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-600 text-[10px] font-semibold text-white">
                    {activeCount}
                  </span>
                )}
              </button>
              <SortSelect value={sort} onChange={(next) => syncUrl(next, filters)} />
            </div>
          </div>

          <div
            className={cn(
              'mt-8 transition-opacity',
              isPending && 'pointer-events-none opacity-60',
            )}
            aria-busy={isPending}
          >
            <ProductGrid products={products} priorityCount={4} />
          </div>

          <Pagination page={page} pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      </div>

      <Drawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        side="left"
        title="Filters"
        footer={
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => syncUrl(sort, emptyFilters())}>
              Clear all
            </Button>
            <Button variant="secondary" onClick={() => setFiltersOpen(false)}>
              Show {total > 0 ? `${total} results` : 'results'}
            </Button>
          </div>
        }
      >
        <div className="p-5">
          <FilterPanel filters={filters} onChange={(next) => syncUrl(sort, next)} />
        </div>
      </Drawer>
    </div>
  )
}