import { 
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import { User } from "lucide-react"
import { fetchProfileImage } from '@/utils/action'

async function UserIcon() {
  const profileImage = await fetchProfileImage()
  return(
    <Avatar className="h-6 w-6 cursor-pointer">
      <AvatarImage src={profileImage ?? undefined} alt="User Avatar" />
      <AvatarFallback>
        <User className="h-6 w-6 text-gray-500" />
      </AvatarFallback>
    </Avatar>
  )
}
export default UserIcon