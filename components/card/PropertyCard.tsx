import Image from "next/image"
import Rating from "./Rating"
import Link from "next/link"
import { PropertyCardProps } from '@/utils/types'
import { getCategoryLabel } from "@/data/categories";
import LikedButton from "./LikedButton"

function PropertyCard({ property }: { property: PropertyCardProps }) {
  const { name, image, price, category, city  } = property;
  const { county, id: propertyId, tagline } = property;

  return (
    <div className="flex relative flex-col w-full max-w-80 border border-gray-300 rounded-md">
      <Link href={`/properties/${propertyId}`}>
        <div className="relative h-[220px] overflow-hidden rounded-tl-md rounded-tr-md group">
          <Image src={image} alt={name} fill sizes='(max-width:768px) 100vw, 50vw' className="rounded-tl-md rounded-tr-md object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"/>
        </div>
        <div className='flex flex-col px-2'>
          <span className='text-xl font-semibold mt-1 truncate w-full block'>{name}</span>
          <span className='text-xs my-1 truncate w-full block'>{tagline}</span>
          <Rating />
          <span className="text-sm text-gray-400">{getCategoryLabel(category)} | {city} {county}</span>
          <div className='flex items-center justify-end mt-6'>
            <span className="text-xl mr-2">TWD {price}</span>
            <span className="text-m">起 / 晚</span>
          </div>
        </div>
      </Link>
      {/* 放在Link外，才不會觸發link */}
      <div className="absolute top-2 right-2 z-10">
        <LikedButton propertyId={propertyId}/>
      </div>
    </div>
  )
}

export default PropertyCard