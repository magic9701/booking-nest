import EmptyContent from "@/components/common/EmptyContent";
import PropertiesList from "@/components/home/PropertiesList";
import { fetchFavoriteList } from "@/utils/action"

async function FavoritesPage() {
  const favoriteList = await fetchFavoriteList()

  if (favoriteList.length === 0) {
    return (
      <EmptyContent
        heading='你還沒有任何最愛哦'
        message='快點加入一些喜歡的住宿吧'
        btnText='前往首頁尋找住宿'
        routerPush='/'
        imageSrc='/images/no-Search-result.png'
        imgSize='medium'
      />
    );
  }

  return <PropertiesList properties={favoriteList} />;
}

export default FavoritesPage