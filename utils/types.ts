export type actionFunction = (prevState: any, formData: FormData) => Promise<{message: string}>

// 房源卡片
export type PropertyCardProps = {
  id: string
  image: string
  name: string
  tagline: string
  county: string
  price: number
  city: string
  category: string
  reviewCount: number
  averageRating: number
}

export type DateRangeSelect = {
  startDate: Date,
  endDate: Date,
  key: string
}

export type Booking = {
  checkIn: Date
  checkOut: Date
}

export type Review = {
  profile: {
    id: string
    username: string
    profileImage: string
    createdAt: Date
  };
  id: string
  createdAt: Date
  rating: number
  comment: string
}

export type Property = {
  id: string
  name: string
  tagline: string
  description: string
  address: string
  city: string
  county: string
  latitude: number
  longitude: number
  category: string
  price: number
  guests: number
  bedrooms: number
  beds: number
  baths: number
  amenities: { key: string; label: string; selected: boolean }[]
  image: string
  profileId: string
  createdAt: Date
  updatedAt: Date
}

export type BookingData = {
  id: string
  profileId: string
  propertyId: string
  checkIn: Date
  checkOut: Date
  createdAt: Date
  updatedAt: Date
  totalNights: number 
  orderTotal: number       
  isCancelled: boolean    
  paymentStatus: boolean
  property: {
    name: string
  }
}


export type MonthIncome = {
  month: string
  total: number
}