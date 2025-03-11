import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { zhTW } from "date-fns/locale"

interface OwnerDetailProps {
  profileImage: string
  username: string
  createdAt: string | Date
  size?: "small" | "large"
}

function OwnerDetail({ profileImage, username, createdAt, size = "large" }: OwnerDetailProps) {
  // 計算加入的時間
  const joinedDuration = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: zhTW })

  // 根據 size 設定樣式
  const isSmall = size === "small"
  const imageSize = isSmall ? 40 : 64
  const textSize = isSmall ? "text-sm" : "text-lg"
  const subTextSize = isSmall ? "text-xs" : "text-sm"
  const gapSize = isSmall ? "gap-2" : "gap-4"

  return (
    <div className={`flex items-center ${gapSize}`}>
      {/* 屋主大頭貼 */}
      <div className='relative rounded-full overflow-hidden border' style={{ width: imageSize, height: imageSize }}>
        <Image src={profileImage} alt={username} fill className="object-cover" />
      </div>

      {/* 屋主資訊 */}
      <div>
        <h2 className={`font-semibold ${textSize}`}>{username}</h2>
        <p className={`text-gray-500 ${subTextSize}`}>{joinedDuration} 加入</p>
      </div>
    </div>
  )
}

export default OwnerDetail
