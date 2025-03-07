'use client'

import { useState, useEffect } from "react"
import ReviewCard from "./ReviewCard"
import ReviewListSkeleton from "./ReviewListSkeleton"
import { fetchPropertyReviews } from "@/utils/action"
import { renderError } from "@/utils/helper"
import type { Review } from '@/utils/types'
import ReviewDialog from "./ReviewDialog"

type ReviewListProps = {
  propertyId: string
}

function ReviewList(props: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReviewList = async() => {
    try {
      const res = await fetchPropertyReviews(props.propertyId)
      setReviews(res)
    } catch (error) {
      renderError(`無法取得資料: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const reviewsToDisplay = reviews.length < 4 ? reviews : reviews.slice(0, 4)

  useEffect(()=>{
    fetchReviewList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-2">評價</h3>
      {loading ? (
        
        // skeleton
        <ReviewListSkeleton />
      ) : reviews.length === 0 ? (

        // 沒有評論
        <p className="text-gray-500">還沒有人評論過這間房源哦!</p>
      ) : (
        <div>

          {/* 評論小於4 */}
          <div className="grid grid-cols-2 gap-4">
            {reviewsToDisplay.length > 0 && reviewsToDisplay.map((review) => (
              <ReviewCard 
                key={review.id}
                rating={review.rating}
                comment={review.comment}
                createdAt={review.createdAt}
                profile={review.profile}
                isClampEnabled
              />
            ))}
          </div>

          {/* 評論大於4 */}
          {reviews.length > 4 && (
            <ReviewDialog reviewList={reviews} />
          )}
        </div>
      )}
    </div>

  )
}

export default ReviewList