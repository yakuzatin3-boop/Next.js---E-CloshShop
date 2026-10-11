'use client'

import { Select } from '@/components/ui/select'
import { SORT_OPTIONS, type SortId } from '@/lib/constants'

interface SortSelectProps {
  value: SortId
  onChange: (value: SortId) => void
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select
      aria-label="Sort products"
      value={value}
      onChange={(event) => onChange(event.target.value as SortId)}
      className="h-10 w-full sm:w-56"
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </Select>
  )
}