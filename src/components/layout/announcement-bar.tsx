import { ANNOUNCEMENT } from '@/lib/constants'

export function AnnouncementBar() {
  return (
    <div className="bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900">
      <p className="mx-auto max-w-[1400px] px-4 py-2 text-center text-[11px] font-medium tracking-wide sm:text-xs">
        {ANNOUNCEMENT}
      </p>
    </div>
  )
}