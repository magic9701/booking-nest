import LikedButton from "@/components/card/LikedButton"
import EmptyContent from "@/components/common/EmptyContent"
import AddressWithMap from "@/components/properties/AddressWithMap"
import BreadCrumbs from "@/components/properties/BreadCrumbs"
import CoverImage from "@/components/properties/CoverImage"
import { Separator } from "@/components/ui/separator"
import AmenitiesList from "@/components/properties/AmenitiesList"
import OwnerDetail from "@/components/properties/OwnerDetail"
import { Skeleton } from "@/components/ui/skeleton"
//
import { fetchPropertyDetail } from "@/utils/action"
import { Star } from 'lucide-react'
//
import dynamic from "next/dynamic"
import ReviewList from "@/components/properties/ReviewList"


const DynamicBookingWrapper = dynamic(() => import('@/components/booking/BookingWrapper'),{
  ssr: false,
  loading: () => <Skeleton className="h-[200px] w-full"/>
})

async function PropertyDetailPage({params}: {params: {id: string}}) {
  const property = await fetchPropertyDetail(params.id)
  

  if(!property) return (
    <EmptyContent
        heading='房源不存在'
        message='找不到相對應房源，請檢查網址是否正確，或是房源已經下架'
        btnText='回到首頁'
        routerPush='/'
        imageSrc='/images/room-not-found.webp'
        imgSize='medium'
      />
  )
  return (
    <section className="mt-2 relative">
      <BreadCrumbs name={property.name!}/>
      <header className='flex justify-between item-center mt-5'>
        <h1 className="text-3xl font-bold">{property.tagline}</h1>
        <div className="flex item-center gap-x-4">
          <LikedButton propertyId={property.id!}/>
        </div>
      </header>
      <AddressWithMap address={property.address!} name={property.name!}></AddressWithMap>
      <CoverImage name={property.name!} src={property.image!} />
      {/* 詳細資訊 */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">住宿資訊</h2>
            <span>{property.guests}人 - {property.bedrooms}間臥室 - {property.beds}張床 - {property.baths}間衛浴</span>
            <div className="flex mt-2">
              <Star color="ffa200" fill="#ffa200"/>
              <span className="ml-2 text-m font-semibold">{property.averageRating.toFixed(1)} / 5<span className="text-primary ml-1">({property.reviewCount}則評價)</span></span>
            </div>
            <Separator className="my-8"/>
            <OwnerDetail {...property.profile!}/>
            <Separator className="my-8"/>
            <article className="whitespace-pre-line">
              {property.description}
            </article>
            <Separator className="my-8"/>
            <AmenitiesList amenities={property.amenities!} />
            <Separator className="my-8"/>
            <ReviewList propertyId={property.id!}/>
          </div>
        </div>

        <div className="col-span-3 sticky top-0">
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-center">立即訂房</h2>
            {/* 選擇日期 */}
            <DynamicBookingWrapper propertyId={property.id!} price={property.price!} bookings={property.bookings!}/>
          </div>
        </div>
      </section>
    </section>
  )
}

export default PropertyDetailPage