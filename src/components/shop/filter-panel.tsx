'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { FILTER_COLORS, PRICE_RANGES } from '@/lib/constants'
import { getFilterFacets } from '@/lib/products'
import { cn } from '@/lib/utils'

export interface ActiveFilters {
  sizes: string[]
  colors: string[]
  brands: string[]
  price: string[]
}

export function emptyFilters(): ActiveFilters {
  return { sizes: [], colors: [], brands: [], price: [] }
}

interface FilterPanelProps {
  filters: ActiveFilters
  onChange: (next: ActiveFilters) => void
}

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const facets = getFilterFacets()

  const update = (key: keyof ActiveFilters, value: string) =>
    onChange({ ...filters, [key]: toggleValue(filters[key], value) })

  return (
    <div className="space-y-8">
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {facets.sizes.map((size) => {
            const active = filters.sizes.includes(size)
            return (
              <button
                key={size}
                type="button"
                aria-pressed={active}
                onClick={() => update('sizes', size)}
                className={cn(
                  'h-9 min-w-10 rounded-full border px-3 text-sm font-medium transition-colors',
                  active
                    ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                    : 'border-stone-300 text-stone-700 hover:border-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-400',
                )}
              >
                {size}
              </button>
            )
          })}
        </div>
      </FilterSection>

      <FilterSection title="Colour">
        <ul className="space-y-2.5">
          {FILTER_COLORS.map((color) => (
            <li key={color.name} className="flex items-center gap-3">
              <Checkbox
                id={`color-${color.name}`}
                checked={filters.colors.includes(color.name)}
                onChange={() => update('colors', color.name)}
              />
              <label
                htmlFor={`color-${color.name}`}
                className="flex flex-1 cursor-pointer items-center gap-2.5 text-sm text-stone-700 dark:text-stone-300"
              >
                <span
                  className={cn(
                    'h-4 w-4 rounded-full border border-stone-300 dark:border-stone-600',
                    color.hex === '#ffffff' && 'bg-stone-100',
                  )}
                  style={{ backgroundColor: color.hex }}
                  aria-hidden="true"
                />
                {color.name}
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Brand">
        <ul className="space-y-2.5">
          {facets.brands.map((brand) => (
            <li key={brand} className="flex items-center gap-3">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onChange={() => update('brands', brand)}
              />
              <label
                htmlFor={`brand-${brand}`}
                className="flex-1 cursor-pointer text-sm text-stone-700 dark:text-stone-300"
              >
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Price">
        <ul className="space-y-2.5">
          {PRICE_RANGES.map((range) => (
            <li key={range.id} className="flex items-center gap-3">
              <Checkbox
                id={`price-${range.id}`}
                checked={filters.price.includes(range.id)}
                onChange={() => update('price', range.id)}
              />
              <label
                htmlFor={`price-${range.id}`}
                className="flex-1 cursor-pointer text-sm text-stone-700 dark:text-stone-300"
              >
                {range.label}
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>
    </div>
  )
}

function FilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold tracking-tight">{title}</legend>
      {children}
    </fieldset>
  )
}