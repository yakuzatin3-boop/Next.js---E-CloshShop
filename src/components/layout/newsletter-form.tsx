'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUIStore } from '@/store/ui-store'

const schema = z.object({
  email: z.email('Enter a valid email address'),
})

type FormValues = z.infer<typeof schema>

export function NewsletterForm() {
  const pushToast = useUIStore((state) => state.pushToast)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: '' } })

  const onSubmit = async (values: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    pushToast({
      title: 'You’re on the list',
      description: `We’ll send new drops to ${values.email}.`,
      variant: 'success',
    })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-label="Email address"
            leading={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        <Button type="submit" variant="secondary" size="lg" loading={isSubmitting}>
          Subscribe
        </Button>
      </div>
      <p className="text-xs text-stone-500 dark:text-stone-400">
        By subscribing you agree to our privacy policy. Unsubscribe any time.
      </p>
    </form>
  )
}