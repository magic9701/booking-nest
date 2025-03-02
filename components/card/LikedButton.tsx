import { auth } from '@clerk/nextjs/server';
import { CardSignInButton } from '../form/Buttons';
import { fetchFavoriteId } from '@/utils/action';
import FavoriteToggleForm from './FavoriteToggleForm';

async function LikedButton({ propertyId }: { propertyId: string }) {
  const { userId } = auth()

  // 沒登入顯示
  if (!userId) return <CardSignInButton />
  const favoriteId = await fetchFavoriteId({ propertyId })

  // 有登入可以按愛心
  return <FavoriteToggleForm favoriteId={favoriteId} propertyId={propertyId} />
}

export default LikedButton