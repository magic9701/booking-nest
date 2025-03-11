'use client'

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import EmptyContent from '@/components/common/EmptyContent'
import { formatCurrency, formatDate } from '@/utils/helper'
import { fetchReservations } from '@/utils/action'
import { useToast } from "@/hooks/use-toast"
import TableSkeleton from "@/components/common/TableSkeleton"

type Reservation = {
  id: string
  profileId: string
  propertyId: string
  checkIn: Date
  checkOut: Date
  totalNights: number
  orderTotal: number
  paymentStatus: boolean
  isCancelled: boolean
  createdAt: Date
  updatedAt: Date
  property: {
    id: string
    name: string
    city: string
    county: string
    price: number
  }
}


function ReservationPage() {
  const [ reservationList, setRreservationList ] = useState<Reservation[]>([])
  const [ loading, setLoading ] = useState(true)
  const { toast } = useToast()

  const getReservationList = async() => {
      try {
        const res = await fetchReservations()
        setRreservationList(res)
      } catch (error) {
        toast({description: `無法取得我的訂單: ${error}`})
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    getReservationList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mt-4 mb-6">訂單管理</h1>
      {loading ? (
        <TableSkeleton />
      ) : reservationList.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>房源名稱</TableHead>
              <TableHead>縣市</TableHead>
              <TableHead>幾晚</TableHead>
              <TableHead>總價</TableHead>
              <TableHead>入住日期</TableHead>
              <TableHead>退房日期</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>訂房日期</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservationList.map((item) => {
              const { id, orderTotal, totalNights, checkIn, checkOut, isCancelled, createdAt } = item
              const { id: propertyId, name, city, county } = item.property
              const startDate = formatDate(checkIn)
              const endDate = formatDate(checkOut)
              const createdAtDate = formatDate(createdAt)
              return (
                <TableRow key={id}>
                  <TableCell>
                    <Link
                      href={`/properties/${propertyId}`}
                      className='underline text-muted-foreground tracking-wide'
                    >
                      {name}
                    </Link>
                  </TableCell>
                  <TableCell>{`${county} / ${city}`}</TableCell>
                  <TableCell>{totalNights}</TableCell>
                  <TableCell>{formatCurrency(orderTotal)}</TableCell>
                  <TableCell>{startDate}</TableCell>
                  <TableCell>{endDate}</TableCell>
                  <TableCell>{isCancelled ? '取消' : '已訂房'}</TableCell>
                  <TableCell>{createdAtDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <EmptyContent
          heading='沒有訂單'
          message='還沒有人預定嗎?檢查看看房源是否上架成功?'
          btnText='前往我的房源'
          routerPush='/rentals/admin'
          imageSrc='/images/no-reservation.webp'
          imgSize='medium'
        />
      )}
    </div>
  )
}

export default ReservationPage