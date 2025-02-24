
export type Amenity = {
  key: string;
  label: string;
  selected: boolean;
};

export const amenities: Amenity[] = [
  { key: 'pool', label: '泳池', selected: false },
  { key: 'wifi', label: 'Wi-Fi', selected: false },
  { key: 'kitchen', label: '廚房', selected: false },
  { key: 'free_parking', label: '免費停車位', selected: false },
  { key: 'hot_tub', label: '按摩浴池', selected: false },
  { key: 'air_conditioning', label: '空調', selected: false },
  { key: 'heating', label: '暖氣', selected: false },
  { key: 'washer', label: '洗衣機', selected: false },
  { key: 'dryer', label: '烘衣機', selected: false },
  { key: 'self_check_in', label: '自助入住', selected: false },
  { key: 'tv', label: '電視', selected: false },
  { key: 'cable_tv', label: '有線電視', selected: false },
  { key: 'fireplace', label: '壁爐', selected: false },
  { key: 'essentials', label: '生活必需品', selected: false },
  { key: 'shampoo', label: '洗髮精', selected: false },
  { key: 'hair_dryer', label: '吹風機', selected: false },
  { key: 'iron', label: '熨斗', selected: false },
  { key: 'hangers', label: '衣架', selected: false },
  { key: 'smoke_detector', label: '煙霧探測器', selected: false },
  { key: 'first_aid_kit', label: '急救箱', selected: false },
  { key: 'fire_extinguisher', label: '滅火器', selected: false },
];

