'use client'

import Image from "next/image"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { formatDate } from "@/utils/helper"
import { cancelTrips } from "@/utils/action"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import ReviewModal from "./ReviewModal"

type TripsCardProps = {
  propertyId: string
  bookingId: string
  src: string
  name: string
  county: string
  city: string
  from: Date
  to: Date
  totalPrice: number
  isCancelled: boolean
  isDone: boolean
  review?: object | null
}

const status = (to: Date, isCancelled: boolean) => {
  const today = new Date

  if(isCancelled) {
    return '已取消'
  } else if (!isCancelled && to < today) {
    return '已完成'
  } else {
    return '已確認預定'
  }
}

function TripsCard(props:TripsCardProps) {
  const { propertyId, bookingId, src, name, county, city, from, to, totalPrice, isCancelled, isDone } = props
  const {toast} = useToast()
  const router = useRouter()

  const cancelTrip = async () => {
      const { message } = await cancelTrips({ bookingId: bookingId })
      if(message) {
        toast({ description: message })
        router.refresh()
      }
  }

  return (
    <Card className="p-4 flex items-center shadow-lg h-[130px]">
      <Image
        src={src}
        width={100}
        height={100}
        className='rounded-md object-cover w-24 h-24'
        alt={name}
      />
      <div className="ml-4 flex flex-col gap-2 flex-1">
        <Link href={`/properties/${propertyId}`} className="w-fit">
          <span className="text-xl text-gray-700 font-bold hover:text-primary">{name}</span>
        </Link>
        <span className="text-gray-500">{formatDate(from)}-{formatDate(to)} - {city} {county}</span>
        <span className="text-gray-500">{status(to, isCancelled)}</span>
      </div>
      <div className="flex flex-col justify-between h-full items-end">
        <div className="text-xl">TWD {totalPrice}</div>
          {(!isCancelled && !isDone) && (
            <Button className="bg-red-500 text-white hover:bg-red-400" onClick={cancelTrip}>取消住宿</Button>
          )}
          {(isCancelled && !isDone) && (
            <Button className="bg-red-500 text-white hover:bg-red-400" disabled>已經取消住宿</Button>
          )}
          {(!isCancelled && isDone && !props.review) && (
            <ReviewModal bookingId={bookingId}/>
          )}
          {(!isCancelled && isDone && props.review) && (
            <span>已完成評論</span>
          )}
      </div>
    </Card>
  )
}

export default TripsCard