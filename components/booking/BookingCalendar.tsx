'use client';
import { Calendar } from '@/components/ui/calendar'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useProperty } from '@/utils/store'
import { useToast } from "@/hooks/use-toast"

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from '@/utils/calendar'


function BookingCalendar() {
  const currentDate = new Date()
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected)
  const { toast } = useToast()

  // 取得所有訂單
  const bookings = useProperty((state) => state.bookings)
  
  // 獲得被預定的日期 form - to
  const blockPeriods = generateBlockedPeriods({
    bookings,
  })

  // 獲得被預定的日期 date: true
  const blockDates = generateDisabledDates(blockPeriods)

  useEffect(() => {
    const selectedRange = generateDateRange(range);
    selectedRange.some((date) => {
      if (blockDates[date]) {
        setRange(defaultSelected)
        toast({
          description: '有些日期已無法預定，請重新選擇',
        })
        return true
      }
      return false
    })
    useProperty.setState({ range })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range])

  return (
    <Calendar
      mode='range'
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      fromDate={currentDate}
      disabled={blockPeriods}
      className='mb-4'
    />
  )
}

export default BookingCalendar