import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { zhTW } from "date-fns/locale"

interface OwnerDetailProps {
  profileImage: string
  username: string
  createdAt: string | Date
}

function OwnerDetail({ profileImage, username, createdAt }: OwnerDetailProps) {
  // 計算加入 Airbnb 的時間
  const joinedDuration = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: zhTW })

  return (
    <div className="flex items-center gap-4 ">
      {/* 屋主大頭貼 */}
      <div className="w-16 h-16 rounded-full overflow-hidden border">
        <Image src={profileImage} alt={username} width={64} height={64} className="object-cover" />
      </div>

      {/* 屋主資訊 */}
      <div>
        <h2 className="text-lg font-semibold">{username}</h2>
        <p className="text-gray-500 text-sm">{joinedDuration} 加入 Airbnb</p>
      </div>
    </div>
  );
}

export default OwnerDetail;
