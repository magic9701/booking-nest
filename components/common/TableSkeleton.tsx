'use client'

import { Skeleton } from "../ui/skeleton"

function TableSkeleton() {
  return (
    <>
    <Skeleton className="w-full h-8 mb-1" />
    <Skeleton className="w-full h-8 mb-1" />
    <Skeleton className="w-full h-8 mb-1" />
    <Skeleton className="w-full h-8 mb-1" />
    <Skeleton className="w-full h-8 mb-1" />
    <Skeleton className="w-full h-8 mb-1" />
  </>
  )
}

export default TableSkeleton