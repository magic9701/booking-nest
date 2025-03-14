import PropertyCardSkeletonList from '@/components/card/PropertyCardSkeletonList'
import CategoriesList from '@/components/home/CategoriesList'
import PropertiesContainer from '@/components/home/PropertiesContainer'
import Image from 'next/image'
import { Suspense } from 'react'

function HomePage({
  searchParams
}: {
  searchParams: {category?: string, search?: string}
}) {
  return (
    <section>
      <Image
        src="/images/Book-Now.gif"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-[120px] object-cover"
        alt="cover image"
        unoptimized={true}
      />
      {/* 住宿類型列表 */}
      <CategoriesList
        category={searchParams.category}
        search={searchParams.search}
      />
      {/* 住宿卡片 */}
      <Suspense fallback={<PropertyCardSkeletonList />}>
        <PropertiesContainer
          category={searchParams.category}
          search={searchParams.search}
          key={JSON.stringify(searchParams)}
        />
      </Suspense>
    </section>
    
  )
}

export default HomePage