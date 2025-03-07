import { fetchProperties } from '@/utils/action';
import PropertiesList from './PropertiesList';
import EmptyContent from '../common/EmptyContent';
import type { PropertyCardProps } from '@/utils/types';

async function PropertiesContainer({
  category = '',
  search = '',
}: {
  category?: string;
  search?: string
}) {
  const properties: PropertyCardProps[] = await fetchProperties({
    category: category,
    search: search, 
  })
  if (properties.length === 0) {
    return (
      <EmptyContent
        heading='沒有相對應的旅宿'
        message='很抱歉目前沒有相對應的旅宿，請重新設定篩選條件或搜尋條件'
        btnText='清除搜尋條件'
        routerPush='/'
        imageSrc='/images/no-Search-result.png'
      />
    );
  }

  return <PropertiesList properties={properties} />;
}
export default PropertiesContainer;