'use client'

import { useProperty } from "@/utils/store"
import { SignInButton, useAuth } from "@clerk/nextjs"
import { Button } from "../ui/button"
import FormContainer from "../form/FormContainer"
import { SubmitButton } from "../form/Buttons"
import { createBookingAction } from "@/utils/action"

function ConfirmBooking() {
  const { userId } = useAuth()
  const { propertyId, range } = useProperty((state) => state)
  const checkIn = range?.from as Date
  const checkOut = range?.to as Date

  if (!userId) {
    return (
      <SignInButton mode="modal">
        <Button type='button' className='w-full'>
          登入完成訂房
        </Button>
      </SignInButton>
    )
  }

  const creatBooking = createBookingAction.bind(null, { propertyId, checkIn, checkOut })
  
  return (
    <FormContainer action={creatBooking}>
      <SubmitButton text='確認訂房' className="w-full" />
    </FormContainer>
  )
}

export default ConfirmBooking