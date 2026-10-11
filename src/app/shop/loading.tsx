import { ProductGridSkeleton } from '@/components/ui/skeleton'

export default function ShopLoading() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 lg:px-8">
      <div className="h-9 w-48 animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800" />
      <div className="mt-8">
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  )
}