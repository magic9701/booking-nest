'use client'

import OwnerDetail from "./OwnerDetail"
import RatingStars from "./RatingStars"
import ReviewArticle from "./ReviewArticle"
import { formatDate } from "@/utils/helper"

type ReviewCardProps = {
  rating: number
  comment: string
  createdAt: Date
  profile: Profile
  isClampEnabled: boolean
}

type Profile = {
  id: string
  profileImage: string
  username: string
  createdAt: Date
}

function ReviewCard(props: ReviewCardProps) {

  const { profileImage, username, createdAt } = props.profile

  return (
    <div className={`flex flex-col w-full h-[192px] p-1 ${props.isClampEnabled ? 'h-[192px]' : 'h-auto'}`}>
      <OwnerDetail
        size='small'
        profileImage={profileImage}
        username={username}
        createdAt={createdAt}
      />
      <div className="flex items-center py-1">
        <RatingStars rating={props.rating}/>
        <time className="ml-1">· {formatDate(createdAt)}</time>
      </div>
      <ReviewArticle content={props.comment} isClampEnabled={props.isClampEnabled}/>
    </div>
  )
}

export default ReviewCard