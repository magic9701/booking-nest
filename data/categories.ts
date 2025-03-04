import { IconType } from 'react-icons'
import { MdCabin, MdMeetingRoom } from 'react-icons/md'
import { FaHotel } from 'react-icons/fa'
import { TbTent } from 'react-icons/tb'
import { GiWoodCabin, GiBrickWall } from 'react-icons/gi'
import { PiWarehouse, PiVan } from 'react-icons/pi'
import { GoContainer } from 'react-icons/go'
import { MdOutlineBed } from 'react-icons/md'

type Category = {
  key: CategoryKey
  label: string
  icon: IconType
};

export type CategoryKey =
  | 'cabin'
  | 'tent'
  | 'airstream'
  | 'container'
  | 'tiny'
  | 'warehouse'
  | 'lodge'
  | 'bnb'
  | 'traditional'
  | 'shared'

export const categories: Category[] = [
  {
    key: 'bnb',
    label: '民宿',
    icon: FaHotel,
  },
  {
    key: 'cabin',
    label: '小木屋',
    icon: MdCabin,
  },
  {
    key: 'tent',
    label: '豪華露營',
    icon: TbTent,
  },
  {
    key: 'airstream',
    label: '露營車',
    icon: PiVan,
  },
  {
    key: 'container',
    label: '貨櫃屋',
    icon: GoContainer,
  },
  {
    key: 'warehouse',
    label: '倉庫造屋',
    icon: PiWarehouse,
  },
  {
    key: 'tiny',
    label: '膠囊旅館',
    icon: MdOutlineBed,
  },
  {
    key: 'lodge',
    label: '山林小屋',
    icon: GiWoodCabin,
  },
  {
    key: 'traditional',
    label: '合院古厝',
    icon: GiBrickWall,
  },
  {
    key: 'shared',
    label: '共住房源',
    icon: MdMeetingRoom,
  },
];


// 取得類別中文
export function getCategoryLabel(key: string): string {
  return categories.find((c) => c.key === key)?.label || '未知類別';
}
