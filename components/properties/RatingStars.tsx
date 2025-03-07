import { Star } from 'lucide-react'

interface RatingStarsProps {
  rating: number
}

function RatingStars({ rating }: RatingStarsProps) {
  const validRating = Math.max(1, Math.min(5, rating))

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          fill={index < validRating ? "#facc15" : "none"}
          stroke={index < validRating ? "#facc15" : "#d1d5db"}
          className="w-4 h-4"
        />
      ))}
    </div>
  )
}

export default RatingStars