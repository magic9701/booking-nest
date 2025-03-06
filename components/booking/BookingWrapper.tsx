'use client'

import { Booking } from '@/utils/types'
import { useProperty } from '@/utils/store'
import { useEffect } from 'react'
import BookingCalendar from './BookingCalendar'
import BookingContainer from './BookingContainer'

type BookingWrapperProps = {
  propertyId: string
  price: number
  bookings: Booking[]
}

function BookingWrapper({propertyId, price, bookings}: BookingWrapperProps) {
  useEffect(() => {
    useProperty.setState({
      propertyId,
      price,
      bookings,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <BookingCalendar/>
      <BookingContainer/>
    </>
  )
}

export default BookingWrapper