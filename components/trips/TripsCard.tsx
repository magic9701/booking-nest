'use client'

import Image from "next/image"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { formatDate, formatTimeRemaining } from "@/utils/helper"
import { cancelTrips } from "@/utils/action"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import ReviewModal from "./ReviewModal"
import { useEffect, useState } from "react"
import BookingStatus from "../common/BookingStatus"

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
  paymentStatus: boolean
  createdAt: Date
}

function TripsCard(props:TripsCardProps) {
  const { propertyId, bookingId, src, name, county, city, from, to, totalPrice, isCancelled, isDone, paymentStatus, createdAt } = props
  const {toast} = useToast()
  const router = useRouter()
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [hasCancelled, setHasCancelled] = useState<boolean>(isCancelled)

  useEffect(() => {
    if (!paymentStatus && !isCancelled) {
      const createdTime = new Date(createdAt).getTime()
      const paymentDeadline = createdTime + 30 * 60 * 1000
      const now = new Date().getTime()
      const initialTimeRemaining = paymentDeadline - now
      
      if (initialTimeRemaining <= 0) {
        setTimeRemaining(0)
        if (!hasCancelled) {
          handleAutoCancelBooking()
        }
        return
      }
      
      setTimeRemaining(initialTimeRemaining)
      
      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1000
          if (newTime <= 0) {
            clearInterval(interval)
            if (!hasCancelled) {
              handleAutoCancelBooking()
            }
            return 0
          }
          return newTime
        })
      }, 1000)
      
      return () => clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdAt, paymentStatus, isCancelled, bookingId, hasCancelled])

  const goToCheckout = () => {
    router.push(`/checkout?bookingId=${bookingId}`)
  }

  const handleAutoCancelBooking = async () => {
    try {
      const { message } = await cancelTrips({ bookingId: bookingId })
      setHasCancelled(true);
      if (message) {
        toast({ 
          description: "付款時間已過期，預訂已自動取消" 
        });
        router.refresh()
      }
    } catch (error) {
      console.error("自動取消預訂失敗:", error)
      toast({ 
        description: "無法自動取消預訂，請手動取消",
        variant: "destructive"
      })
    }
  }

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
        <div>
          <BookingStatus
            to={to} 
            isCancelled={isCancelled || hasCancelled} 
            paymentStatus={paymentStatus} 
          />
          {timeRemaining !== 0 && <span className="text-orange-500 font-medium">請在 {formatTimeRemaining(timeRemaining)} 內完成付款</span>}
        </div>
      </div>
      <div className="flex flex-col justify-between h-full items-end">
        <div className="text-xl">TWD {totalPrice}</div>
          <div className="flex gap-2">
            {(!paymentStatus && !isCancelled && timeRemaining > 0) && (
              <Button className="bg-blue-500 text-white hover:bg-blue-400" onClick={goToCheckout}>
                立即付款
              </Button>
            )}
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
      </div>
    </Card>
  )
}

export default TripsCard