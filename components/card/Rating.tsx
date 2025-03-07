type RatingProps = {
  reviewCount: number;
  averageRating: number;
}

function Rating({ reviewCount, averageRating }: RatingProps) {
  return (
    <div className="flex gap-1 mt-1">
      <div className='w-8 h-6 rounded-sm bg-sky-500 flex justify-center'>
        <span className="text-white font-medium">{averageRating.toFixed(1)}</span>
      </div>
      <span className="text-gray-400">/5</span>
      <span className="text-sky-500">({reviewCount})</span>
    </div>
  )
}

export default Rating