import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { buttonStyles } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

interface EditorialBannerProps {
  eyebrow: string
  title: string
  description: string
  image: string
  ctaLabel: string
  ctaHref: string
  align?: 'left' | 'right'
}

export function EditorialBanner({
  eyebrow,
  title,
  description,
  image,
  ctaLabel,
  ctaHref,
  align = 'left',
}: EditorialBannerProps) {
  const reversed = align === 'right'

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div
          className={`grid items-center gap-10 rounded-3xl bg-stone-50 p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 dark:bg-stone-900`}
        >
          <div className={reversed ? 'lg:order-2' : ''}>
            <p className="text-xs font-semibold tracking-[0.18em] text-accent-600 uppercase dark:text-accent-400">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-stone-600 dark:text-stone-400">
              {description}
            </p>
            <Link
              href={ctaHref}
              className={`${buttonStyles({ variant: 'primary', size: 'lg' })} mt-8`}
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className={`relative ${reversed ? 'lg:order-1' : ''}`}>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}