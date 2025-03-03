import LikedButton from "@/components/card/LikedButton"
import EmptyContent from "@/components/common/EmptyContent"
import BreadCrumbs from "@/components/properties/BreadCrumbs"
import CoverImage from "@/components/properties/CoverImage"
import ShareButton from "@/components/properties/ShareButton"
import { fetchPropertyDetail } from "@/utils/action"


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

  const { baths, bedrooms, beds, guests } = property
  const details = { baths, bedrooms, beds, guests }
  return (
    <section className="mt-2">
      <BreadCrumbs name={property.name}/>
      <header className='flex justify-between item-center mt-5'>
        <h1 className="text-3xl font-bold">{property.tagline}</h1>
        <div className="flex item-center gap-x-4">
          <LikedButton propertyId={property.id}/>
        </div>
      </header>
      <CoverImage name={property.name} src={property.image} />
    </section>
  )
}

export default PropertyDetailPage