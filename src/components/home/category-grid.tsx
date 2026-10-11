import Image from 'next/image'
import Link from 'next/link'

import { SectionHeading } from '@/components/ui/container'
import { CATEGORIES } from '@/data/products'

export function CategoryGrid() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Browse by category"
          title="Shop by department"
          description="Everything organised the way you think about getting dressed."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/shop/${category.slug}`}
              className="group relative block overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-900"
            >
              <div className="aspect-[3/4]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
                <h3 className="font-display text-lg text-white sm:text-xl">
                  {category.name}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-sm">
                  Shop now
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}