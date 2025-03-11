'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDate } from "@/utils/helper"
import { useRouter } from "next/navigation"
import { BookingData } from "@/utils/types"

type contentProps = {
  name: string
  checkIn: Date
  checkOut: Date
  paymentStatus: boolean
}

function ContentRow({name, checkIn, checkOut, paymentStatus}: contentProps) {
  return(
    <div className="grid grid-cols-12 items-center">
      <div className="col-span-5">{name}</div>
      <div className="flex flex-col col-span-4">
        <time>{formatDate(checkIn)}</time>
        <time>{formatDate(checkOut)}</time>
      </div>
      <div className="col-span-3 text-center">{paymentStatus ? '已付款' : '未付款'}</div>
    </div>
  )
}

function LatestBooking({ bookings }: { bookings: BookingData[] }) {
  const router = useRouter()
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>近期即將入住</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-col gap-4">
          {bookings.slice(0, 8).map((booking) => (
            <ContentRow
              key={booking.id}
              name={booking.property.name}
              checkIn={booking.checkIn}
              checkOut={booking.checkOut}
              paymentStatus={booking.paymentStatus}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4 h-10">
          <button
            onClick={() => router.push('/rentals/reservation')}
            className="mt-2 text-blue-500 font-semibold"
          >
            顯示所有訂單
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export default LatestBooking