'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface RatingInputProps {
  defaultRating: number;
}

function RatingInput({ defaultRating }: RatingInputProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [rating, setRating] = useState<number>(defaultRating)

  const handleMouseEnter = (index: number) => setHovered(index)
  const handleMouseLeave = () => setHovered(null)

  const handleStarClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault()
    setRating(index + 1)
  }
  
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }, (_, index) => (
        <button
          key={index}
          onClick={(e) => handleStarClick(index, e)}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          className="p-0 focus:outline-none"
        >
          <Star 
            fill={index < (hovered ?? rating) ? "#facc15" : "none"}
            className={`w-6 h-6 ${index < (hovered || rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
          />
        </button>
      ))}
      <input type="hidden" name="rating" value={rating ?? 0} />
    </div>
  )
}

export default RatingInput

