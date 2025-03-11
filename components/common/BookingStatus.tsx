'use client'

interface BookingStatusProps {
  to: Date;
  isCancelled: boolean
  paymentStatus: boolean
}

const BookingStatus: React.FC<BookingStatusProps> = ({ to, isCancelled, paymentStatus }) => {
  const today = new Date()
  
  if (isCancelled) {
    return <span className="text-red-500 font-medium">已取消</span>
  } else if (!isCancelled && to < today) {
    return <span className="text-green-600 font-medium">已完成</span>
  } else if (!isCancelled && paymentStatus) {
    return <span className="text-blue-500 font-medium">已完成付款</span>
  } else if (!isCancelled && !paymentStatus) {
    return <span className="text-orange-500 font-medium">未付款</span>
  }
  
  return <span className="text-gray-500">未知狀態</span>
};

export default BookingStatus