'use client'

import { useState, useEffect } from "react"
import { fillMissingMonths, formatCurrency, getOrdersThisMonth } from "@/utils/helper"
import { BookingData, MonthIncome } from "@/utils/types"
import DashBoardCard from "@/components/rental/DashBoardCard"
import LatestBooking from "@/components/rental/LatestBooking"
import { Separator } from "@/components/ui/separator"
import { getMonthlyCompletedBookings, getPendingBooking, getTotalCompletedBookingsAmount } from "@/utils/action"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

const chartConfig = {
  income: {
    label: "Monthly Income",
    color: "#34d399",
  },
} satisfies ChartConfig

const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-5 gap-6">
      {/* 左側主要區域 */}
      <div className="col-span-3 flex flex-col gap-10 w-full">
        <div className="flex gap-4">
          <Skeleton className="w-1/2 h-24 rounded-xl" />
          <Skeleton className="w-1/2 h-24 rounded-xl" />
        </div>
        <Skeleton className="min-h-[400px] w-full rounded-xl" />
      </div>
      
      {/* 右側訂單區域 */}
      <Skeleton className="col-span-2 h-120 rounded-xl" />
    </div>
  )
}

function RentalDashboard() {
  const [ totalIncome, setTotalIncome ] = useState<number>(0)
  const [ monthlyIncome, setMonthlyIncome ] = useState<MonthIncome[]>([])
  const [ upcomingBooking, setUpcomingBooking ] = useState<BookingData[]>([])
  const [ currentMonthBooking, setCurrentMonthBooking ] = useState(0)
  const [ loading, setLoading ] = useState(true)
  const { toast } = useToast()

  const getAYearIncome = async() => {
    try {
      const res = await getTotalCompletedBookingsAmount()
      setTotalIncome(res)
    } catch (error) {
      toast({ description: `無法取得總收入: ${error}`})
    }
  }

  const getMonthlyData = async() => {
    try {
      const res = await getMonthlyCompletedBookings()
      setMonthlyIncome(fillMissingMonths(res))
    } catch (error) {
      toast({ description: `無法取得月收入: ${error}`})
    }
  }

  const getUpcomingBooking = async() => {
    try {
      const res = await getPendingBooking()
      setUpcomingBooking(res)
      setCurrentMonthBooking(getOrdersThisMonth(res))
    } catch (error) {
      toast({ description: `無法取得近期訂單: ${error}`})
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getAYearIncome(), getMonthlyData(), getUpcomingBooking()])
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="flex flex-col w-full mt-2 p-4 overflow-hidden rounded-[0.5rem] border bg-background shadow">
      <h1 className="text-3xl font-bold tracking-tight mt-4 mb-6">近期訂單狀態</h1>
      <Separator className="mb-8"/>
      {!loading ?
        (
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-3 flex flex-col gap-10 w-full">
              <div className="flex gap-4">
                <DashBoardCard title="加入至今總收入" subtitle={formatCurrency(totalIncome)}/>
                <DashBoardCard title="未完成訂單數" subtitle={upcomingBooking.length} addtion={`本月新增 ${currentMonthBooking} 筆`}/>
              </div>
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart data={monthlyIncome}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="var(--color-income)" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="col-span-2">
              <LatestBooking bookings={upcomingBooking}/>
            </div>
          </div>
        ) :(
          <DashboardSkeleton />
        )
      }
    </div>
  )
}

export default RentalDashboard