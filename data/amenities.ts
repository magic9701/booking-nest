
export type Amenity = {
  key: string;
  label: string;
  selected: boolean;
};

export const amenities: Amenity[] = [
  // 基本設備
  { key: 'wifi', label: 'Wi-Fi', selected: false },
  { key: 'tv', label: '電視', selected: false },
  { key: 'air_conditioning', label: '空調', selected: false },
  { key: 'heating', label: '暖氣', selected: false },
  { key: 'fireplace', label: '壁爐', selected: false },
  { key: 'smoke_detector', label: '煙霧探測器', selected: false },
  { key: 'first_aid_kit', label: '急救箱', selected: false },
  { key: 'fire_extinguisher', label: '滅火器', selected: false },

  // 生活用品
  { key: 'essentials', label: '生活必需品', selected: false },
  { key: 'shampoo', label: '洗髮精', selected: false },
  { key: 'hair_dryer', label: '吹風機', selected: false },
  { key: 'iron', label: '熨斗', selected: false },
  { key: 'hangers', label: '衣架', selected: false },
  { key: 'washer', label: '洗衣機', selected: false },
  { key: 'dryer', label: '烘衣機', selected: false },

  // 廚房與餐飲
  { key: 'kitchen', label: '廚房', selected: false },
  { key: 'breakfast', label: '早餐供應', selected: false },
  { key: 'bbq_grill', label: '烤肉設備', selected: false },

  // 住宿體驗
  { key: 'self_check_in', label: '自助入住', selected: false },
  { key: 'free_parking', label: '免費停車位', selected: false },
  { key: 'public_transport', label: '鄰近大眾運輸', selected: false },
  { key: 'pets_allowed', label: '寵物友善', selected: false },
  { key: 'kids_friendly', label: '兒童友善', selected: false },

  // 放鬆與娛樂
  { key: 'pool', label: '泳池', selected: false },
  { key: 'hot_tub', label: '按摩浴池', selected: false },
  { key: 'bathtub', label: '浴缸', selected: false },
  { key: 'hot_spring', label: '溫泉', selected: false },

  // 景觀與戶外空間
  { key: 'balcony', label: '陽台/露台', selected: false },
  { key: 'mountain_view', label: '山景', selected: false },
  { key: 'ocean_view', label: '海景', selected: false },
  { key: 'campfire', label: '營火區', selected: false },

  // 娛樂設施
  { key: 'karaoke', label: '卡拉OK', selected: false },
  { key: 'game_room', label: '遊戲室', selected: false },
  { key: 'mahjong', label: '麻將桌', selected: false },

  // 特色體驗
  { key: 'bicycle_rental', label: '自行車租借', selected: false },
  { key: 'farm_experience', label: '農場體驗', selected: false },
];


