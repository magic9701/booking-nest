import { Skeleton } from '../ui/skeleton'

function ReviewCardSkeleton() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex flex-col w-full">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-2/3 mt-2" />
        </div>
      </div>

      <div className="flex items-center py-1 mt-4">
        <Skeleton className="w-24 h-5" />
        <Skeleton className="ml-2 w-16 h-4" />
      </div>

      <div className="mt-4">
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-5/6 mb-2" />
        <Skeleton className="h-6 w-4/5" />
      </div>

      <div className="flex items-center py-1 mt-4">
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}

function ReviewListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ReviewCardSkeleton />
      <ReviewCardSkeleton />
    </div>
  );
}

export default ReviewListSkeleton