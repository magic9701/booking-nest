import { Skeleton } from '../ui/skeleton';

function PropertyCardSkeleton() {
  return (
    <div className="flex flex-col w-full max-w-80 border border-gray-100 rounded-md">
      <div className="relative h-[220px] overflow-hidden rounded-md">
        <Skeleton className="w-full h-full object-cover" />
      </div>
      <div className='flex flex-col px-2'>
        <Skeleton className='h-6 w-full mt-2' />
        <Skeleton className='h-4 w-3/4 my-2' />
        <Skeleton className='h-5 w-1/2' />
        <Skeleton className='h-4 w-2/3 mt-2' />
        <div className='flex items-center justify-end mt-6'>
          <Skeleton className='h-6 w-16 mr-2' />
          <Skeleton className='h-5 w-12' />
        </div>
      </div>
    </div>
  );
}

export default PropertyCardSkeleton;