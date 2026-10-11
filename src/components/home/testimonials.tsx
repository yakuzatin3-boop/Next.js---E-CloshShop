import { Star } from 'lucide-react'

import { Container, SectionHeading } from '@/components/ui/container'
import { TESTIMONIALS } from '@/data/site'

export function Testimonials() {
  return (
    <section className="border-y border-stone-200 bg-stone-50 py-16 lg:py-24 dark:border-stone-800 dark:bg-stone-900/40">
      <Container>
        <SectionHeading
          eyebrow="Why people stay"
          title="Loved by 2,000+ customers"
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-card dark:border-stone-800 dark:bg-stone-950"
            >
              <div
                className="flex items-center gap-0.5 text-amber-400"
                role="img"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={
                      index < testimonial.rating
                        ? 'h-4 w-4 fill-current'
                        : 'h-4 w-4 text-stone-300 dark:text-stone-700'
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-6 text-stone-700 dark:text-stone-300">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold">{testimonial.name}</span>
                <span className="text-stone-500"> · {testimonial.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}