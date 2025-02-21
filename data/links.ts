import { Home, Heart, CalendarCheck, Star, PlusCircle, Building, User } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
};

export const links: NavLink[] = [
  { href: "/", label: "首頁", icon: Home },
  { href: "/favorites", label: "收藏住宿", icon: Heart },
  { href: "/bookings", label: "訂單管理", icon: CalendarCheck },
  { href: "/reviews", label: "評價", icon: Star },
  { href: "/rentals/create", label: "建立房源", icon: PlusCircle },
  { href: "/rentals", label: "我的房源", icon: Building },
  { href: "/profile", label: "個人資訊", icon: User },
];
