import FormTextarea from "../form/FormTextarea"
import RatingInput from "../form/RatingInput"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FormContainer from "../form/FormContainer"
import { createReview } from "@/utils/action"
import { SubmitButton } from "../form/Buttons"

function ReviewModal({ bookingId }: { bookingId: string }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">填寫評論</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <FormContainer action={createReview}>
            <DialogHeader>
              <DialogTitle>給商家一筆評論吧!</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 mt-4">
              <RatingInput defaultRating={0}/>
              <FormTextarea
                name="comment"
                label="評論"
                placeholder="請輸入評論，告訴大家你的體驗"
                maxLength={500}
                rows={6}
                required
              />
              <input type='hidden' name='bookingId' value={bookingId} />
            </div>
            <DialogFooter>
              <SubmitButton text='儲存' className="mt-8" />
            </DialogFooter>
          </FormContainer>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReviewModal