import PropertyCardSkeleton from '@/components/card/PropertyCardSkeleton'
import CategoriesList from '@/components/home/CategoriesList'
import PropertiesContainer from '@/components/home/PropertiesContainer'
import Image from 'next/image';
import { Suspense } from 'react'

function HomePage({
  searchParams
}: {
  searchParams: {category?: string, search?: string}
}) {
  return (
    <section>
      <Image
        src="/images/cover-pic.png"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-[150px] md:h-[150px] xl:h-[300px] object-cover"
        alt="cover image"
      />
      {/* 住宿類型列表 */}
      <CategoriesList
        category={searchParams.category}
        search={searchParams.search}
      />
      {/* 住宿卡片 */}
      <Suspense fallback={<PropertyCardSkeleton />}>
        <PropertiesContainer
          category={searchParams.category}
          search={searchParams.search}
        />
      </Suspense>
    </section>
    
  )
}

export default HomePage