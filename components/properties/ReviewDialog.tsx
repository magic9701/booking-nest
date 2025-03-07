import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Review } from '@/utils/types'
import ReviewCard from "./ReviewCard"
import { useReviewStore } from "@/utils/store"

type ReviewDialogProps = {
  reviewList: Review[]
}

function ReviewDialog({ reviewList }: ReviewDialogProps) {
  const { isDialogOpen, toggleDialog } = useReviewStore()

  return (
    <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">顯示所有 {reviewList.length} 則評論</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[625px] sm:max-w-[375px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>所有 {reviewList.length} 則評論</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col overflow-y-auto gap-2" style={{ maxHeight: 'calc(80vh - 68px)' }}>
            {reviewList.map((review) => (
              <ReviewCard
                key={review.id}
                rating={review.rating}
                comment={review.comment}
                createdAt={review.createdAt}
                profile={review.profile}
                isClampEnabled={false}
              />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewDialog