import { AtSign, Camera, MessageCircle, Play } from 'lucide-react'
import Link from 'next/link'

import { Logo } from '@/components/layout/logo'
import { NewsletterForm } from '@/components/layout/newsletter-form'
import { Container } from '@/components/ui/container'
import { FOOTER_COLUMNS, PAYMENT_METHODS } from '@/data/site'
import { SITE } from '@/lib/constants'

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: Camera },
  { label: 'Facebook', href: 'https://facebook.com', icon: MessageCircle },
  { label: 'Twitter', href: 'https://twitter.com', icon: AtSign },
  { label: 'YouTube', href: 'https://youtube.com', icon: Play },
]

const PAYMENT_LABELS: Record<(typeof PAYMENT_METHODS)[number], string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'Amex',
  paypal: 'PayPal',
  applepay: 'Apple Pay',
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-950">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-stone-400">
              {SITE.tagline} Join the list for early access to new drops and
              members-only offers.
            </p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-stone-200 pt-8 sm:flex-row sm:items-center sm:justify-between dark:border-stone-800">
          <div className="flex items-center gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-900 dark:border-stone-800 dark:text-stone-400 dark:hover:border-stone-500 dark:hover:text-white"
              >
                <social.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="rounded-md border border-stone-200 bg-white px-2.5 py-1 text-[10px] font-semibold tracking-wide text-stone-500 uppercase dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400"
              >
                {PAYMENT_LABELS[method]}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/account" className="hover:text-stone-900 dark:hover:text-white">
              Privacy
            </Link>
            <Link href="/account" className="hover:text-stone-900 dark:hover:text-white">
              Terms
            </Link>
            <Link href="/account" className="hover:text-stone-900 dark:hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}