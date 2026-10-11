import { RotateCcw, ShieldCheck, Headphones, Truck } from 'lucide-react'

import { Container } from '@/components/ui/container'
import { FEATURES } from '@/data/site'

const ICONS = {
  truck: Truck,
  returns: RotateCcw,
  support: Headphones,
  secure: ShieldCheck,
} as const

export function FeatureStrip() {
  return (
    <section className="border-y border-stone-200 bg-white py-10 dark:border-stone-800 dark:bg-stone-950">
      <Container>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon]
            return (
              <li key={feature.title} className="flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-400">
                    {feature.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}