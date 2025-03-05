import { calculateTotals, formatCurrency } from "@/utils/helper"
import { useProperty } from "@/utils/store"
import { Card, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"



function BookingForm() {
  const { range, price } = useProperty((state) => state)
  const checkIn = range?.from as Date
  const checkOut = range?.to as Date

  const { totalNights, subTotal, service, tax, orderTotal, longStayDiscount } = calculateTotals({checkIn, checkOut, price})

  return (
    <Card className="p-4">
      <CardTitle className="mb-4">價格明細</CardTitle>
      <PriceRow label={`$${price} x ${totalNights} 晚`} amount={subTotal} />
      <PriceRow label='Booking Nest服務費' amount={service} />
      <PriceRow label="稅金" amount={tax} />
      {longStayDiscount !== 0 && (
        <PriceRow label="長期住宿折扣" amount={-longStayDiscount} />
      )}
      <Separator className="my-4" />
      <CardTitle>
        <PriceRow label="總價" amount={orderTotal} />
      </CardTitle>
    </Card>
  )
}

function PriceRow ({label, amount}: {label: string, amount: number}) {
  return (
    <p className="flex justify-between text-sm mb-2">
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
  )
}

export default BookingForm