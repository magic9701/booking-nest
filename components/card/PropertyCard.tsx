import Image from "next/image"
import Rating from "./Rating"
import Link from "next/link"
// import LikedButton from "./LikedButton"

function PropertyCard() {
  return (
    <div className="flex flex-col w-full max-w-80 border border-gray-300 rounded-md">
      <Link href="/">
        <div className="relative h-[220px] overflow-hidden rounded-tl-md rounded-tr-md group">
          <Image src="/images/cover-pic.png" alt="" fill sizes='(max-width:768px) 100vw, 50vw' className="rounded-tl-md rounded-tr-md object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"/>
          <div className="absolute top-2 right-2 z-10">
            {/* <LikedButton /> */}
          </div>
        </div>
        <div className='flex flex-col px-2'>
          <span className='text-xl font-semibold mt-1 truncate w-full block'>測試用文字測試用文字測試用文字測試用文字測試用文字</span>
          <span className='text-xs my-1 truncate w-full block'>測試用文字測試用文字測試用文字測試用文字測試用文字</span>
          <Rating />
          <span className="text-sm text-gray-400">民宿 / 公寓 | 台東縣 台東市</span>
          <div className='flex items-center justify-end mt-6'>
            <span className="text-xl mr-2">TWD 9,720</span>
            <span className="text-m">起 / 晚</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PropertyCard