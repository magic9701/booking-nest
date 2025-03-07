'use client'

import { useReviewStore } from "@/utils/store"
import { useState, useRef, useEffect } from "react"

interface ReviewProps {
  content: string
  isClampEnabled: boolean
}

function ReviewArticle({ content, isClampEnabled }: ReviewProps) {
  const [isClamped, setIsClamped] = useState(false)
  const contentRef = useRef<HTMLParagraphElement | null>(null)
  const { toggleDialog } = useReviewStore()

  // 檢查是否超過三行（僅在啟用 clamp 時）
  useEffect(() => {
    if (isClampEnabled && contentRef.current) {
      const isContentClamped = contentRef.current.scrollHeight > contentRef.current.clientHeight
      setIsClamped(isContentClamped)
    }
  }, [content, isClampEnabled])

  return (
    <article className="relative py-2">
      <p ref={contentRef} className={isClampEnabled ? "line-clamp-3" : ""}>
        {content}
      </p>

      {/* 只有在啟用 clamp 且超過三行的情況下顯示按鈕 */}
      {isClampEnabled && isClamped && (
        <button
          onClick={toggleDialog}
          className="mt-2 text-blue-500 font-semibold"
        >
          顯示更多內容
        </button>
      )}
    </article>
  )
}

export default ReviewArticle
