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