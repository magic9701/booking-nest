import { IconType } from 'react-icons';
import { MdCabin } from 'react-icons/md';

import { TbCaravan, TbTent, TbBuildingCottage } from 'react-icons/tb';

import { GiWoodCabin } from 'react-icons/gi';
import { PiWarehouse, PiLighthouse, PiVan } from 'react-icons/pi';

import { GoContainer } from 'react-icons/go';

type Category = {
  key: CategoryKey
  label: string
  icon: IconType
};

export type CategoryKey =
  | 'cabin'
  | 'tent'
  | 'airstream'
  | 'cottage'
  | 'container'
  | 'caravan'
  | 'tiny'
  | 'warehouse'
  | 'lodge'


export const categories: Category[] = [
  {
    key: 'cabin',
    label: '小木屋',
    icon: MdCabin,
  },
  {
    key: 'airstream',
    label: '露營車',
    icon: PiVan,
  },
  {
    key: 'tent',
    label: '帳篷',
    icon: TbTent,
  },
  {
    key: 'warehouse',
    label: '倉庫',
    icon: PiWarehouse,
  },
  {
    key: 'cottage',
    label: '鄉村小屋',
    icon: TbBuildingCottage,
  },
  {
    key: 'container',
    label: '貨櫃屋',
    icon: GoContainer,
  },
  {
    key: 'caravan',
    label: '旅行拖車',
    icon: TbCaravan,
  },
  {
    key: 'tiny',
    label: '燈塔小屋',
    icon: PiLighthouse,
  },
  {
    key: 'lodge',
    label: '山林小屋',
    icon: GiWoodCabin,
  },
];
