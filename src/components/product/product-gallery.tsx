'use client'

import Image from 'next/image'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { Product } from '@/types/product'

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0)
  const image = product.images[active]

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex gap-3 overflow-x-auto sm:w-20 sm:flex-col sm:overflow-visible">
        {product.images.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`View image ${index + 1}`}
            aria-pressed={active === index}
            className={cn(
              'relative aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-xl border-2 sm:w-full',
              active === index
                ? 'border-stone-900 dark:border-stone-100'
                : 'border-transparent opacity-70 hover:opacity-100',
            )}
          >
            <Image
              src={item.src}
              alt={item.alt || product.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="relative flex-1 overflow-hidden rounded-3xl bg-stone-100 dark:bg-stone-900">
        {image && (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>
    </div>
  )
}