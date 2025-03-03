import PropertyCardSkeleton from "./PropertyCardSkeleton"

function PropertyCardSkeletonList() {
  return (
    <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
      <PropertyCardSkeleton />
      <PropertyCardSkeleton />
      <PropertyCardSkeleton />
      <PropertyCardSkeleton />
    </div>
  )
}

export default PropertyCardSkeletonList