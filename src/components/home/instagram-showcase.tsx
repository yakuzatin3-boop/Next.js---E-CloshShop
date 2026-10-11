import { Heart, Camera } from 'lucide-react'
import Image from 'next/image'

import { Container, SectionHeading } from '@/components/ui/container'
import { INSTAGRAM_POSTS } from '@/data/site'
import { formatCompact } from '@/lib/format'

export function InstagramShowcase() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Follow along"
          title="@ecloshshop"
          description="Tag us in your #EcloshStyle looks for a chance to be featured."
          align="center"
        />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {INSTAGRAM_POSTS.map((post) => (
            <li key={post.image}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-900"
                aria-label={post.alt}
              >
                <div className="aspect-square">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 16vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-stone-950/50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Camera className="h-5 w-5" aria-hidden="true" />
                  <span className="flex items-center gap-1 text-xs font-medium">
                    <Heart className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    {formatCompact(post.likes)}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}