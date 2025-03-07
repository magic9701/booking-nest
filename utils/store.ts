import { create } from 'zustand'
import { Booking } from './types'
import { DateRange } from 'react-day-picker'

type PropertyState = {
  propertyId: string
  price: number
  bookings: Booking[]
  range: DateRange | undefined
}

export const useProperty = create<PropertyState>(() => {
  return {
    propertyId: '',
    price: 0,
    bookings: [],
    range: undefined,
  }
})


type ReviewState = {
  isDialogOpen: boolean
  toggleDialog: () => void
}

export const useReviewStore = create<ReviewState>((set) => ({
  isDialogOpen: false,
  toggleDialog: () => set((state) => ({ isDialogOpen: !state.isDialogOpen })),
}))