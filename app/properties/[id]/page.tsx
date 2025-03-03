import EmptyContent from "@/components/common/EmptyContent"
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
    <div>PropertyDetailPage</div>
  )
}

export default PropertyDetailPage