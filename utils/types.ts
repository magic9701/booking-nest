export type actionFunction = (prevState: any, formData: FormData) => Promise<{message: string}>

// 房源卡片
export type PropertyCardProps = {
  id: string
  image: string
  name: string
  tagline: string
  county: string
  price: number
}