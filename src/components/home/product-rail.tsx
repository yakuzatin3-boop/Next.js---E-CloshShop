import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { ProductCard } from '@/components/product/product-card'
import { Container, SectionHeading } from '@/components/ui/container'
import { buttonStyles } from '@/components/ui/button'
import type { Product } from '@/types/product'

interface ProductRailProps {
  eyebrow?: string
  title: string
  description?: string
  products: Product[]
  viewAllHref?: string
  viewAllLabel?: string
}

export function ProductRail({
  eyebrow,
  title,
  description,
  products,
  viewAllHref,
  viewAllLabel = 'View all',
}: ProductRailProps) {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={
            viewAllHref && (
              <Link
                href={viewAllHref}
                className={buttonStyles({ variant: 'ghost', size: 'sm' })}
              >
                {viewAllLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )
          }
        />
      </Container>
      <div className="mt-8">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8">
          {products.map((product) => (
            <div
              key={product.slug}
              className="w-[44vw] shrink-0 snap-start sm:w-[30vw] md:w-[24vw] xl:w-[19%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}