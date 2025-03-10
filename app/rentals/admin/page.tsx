'use client'

import { useToast } from "@/hooks/use-toast"
import { fetchRentals } from "@/utils/action"
import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import EmptyContent from "@/components/common/EmptyContent"
import { formatCurrency } from "@/utils/helper"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { Edit,Trash2 } from 'lucide-react'

type ReantalAdminProps = {
  totalNightsSum: number | null
  orderTotalSum: number | null
  id: string
  name: string
  price: number
}

const EditIcon = ({ propertyId }: { propertyId: string }) => {
  return (
    <Link href={`/rentals/${propertyId}/edit`}>
      <Edit size={16} />
    </Link>
  )
}

const DeleteIcon = ({ onDelete, propertyId }: { onDelete: (propertyId: string) => Promise<void>, propertyId: string }) => {
  return (
    <button 
      onClick={() => onDelete(propertyId)} 
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <Trash2 size={16} color="red" />
    </button>
  )
}

function ReantalAdminPage() {
  const [ myRentalList, setMyRentalList ] = useState<ReantalAdminProps[]>([])
  const [ loading, setLoading ] = useState(true)
  const { toast } = useToast()

  const getMyRentalList = async() => {
    try {
      const res = await fetchRentals()
      setMyRentalList(res)
    } catch (error) {
      toast({description: `無法取得我的房源: ${error}`})
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async(propertyId: string) =>{
    try {
      console.log('delete', propertyId)
    } catch (error) {
      toast({description: `無法刪除房源: ${error}`})
    }
  }

  useEffect(() => {
    getMyRentalList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mt-4 mb-6">我的房源</h1>
      {loading ? (
        <>
          <Skeleton className="w-full h-8 mb-1" />
          <Skeleton className="w-full h-8 mb-1" />
          <Skeleton className="w-full h-8 mb-1" />
          <Skeleton className="w-full h-8 mb-1" />
          <Skeleton className="w-full h-8 mb-1" />
          <Skeleton className="w-full h-8 mb-1" />
        </>
      ) : myRentalList.length > 0 ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名稱</TableHead>
                <TableHead>價格</TableHead>
                <TableHead>已被預約住宿(晚)</TableHead>
                <TableHead>總收入</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myRentalList.map((rental) => {
                const { id: propertyId, name, price } = rental
                const { totalNightsSum, orderTotalSum } = rental
                return (
                  <TableRow key={propertyId}>
                    <TableCell>
                      <Link
                        href={`/properties/${propertyId}`}
                        className='underline text-muted-foreground tracking-wide'
                      >
                        {name}
                      </Link>
                    </TableCell>
                    <TableCell>{formatCurrency(price)}</TableCell>
                    <TableCell>{totalNightsSum || 0}</TableCell>
                    <TableCell>{formatCurrency(orderTotalSum)}</TableCell>
        
                    <TableCell className='flex items-center gap-x-4'>
                      <EditIcon propertyId={propertyId}/>
                      <DeleteIcon propertyId={propertyId} onDelete={handleDelete} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <EmptyContent
          heading='你還沒有任何房源哦'
          btnText='立即建立房源'
          routerPush='/rentals/create'
          imageSrc='/images/no-Search-result.png'
          imgSize='medium'
        />
      )}
    </div>
  )
}

export default ReantalAdminPage