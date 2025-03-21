import { Home, Heart, CalendarCheck, Plane, PlusCircle, Building, User, Gauge  } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
};

export const links: NavLink[] = [
  { href: "/", label: "首頁", icon: Home },
  { href: "/favorites", label: "收藏住宿", icon: Heart },
  { href: "/trips", label: "我的旅程", icon: Plane },
  { href: "/rentals/create", label: "建立房源", icon: PlusCircle },
  { href: "/rentals/admin", label: "我的房源", icon: Building },
  { href: "/rentals/dashboard", label: "近期訂單", icon: Gauge },
  { href: "/rentals/reservation", label: "訂單管理", icon: CalendarCheck },
  { href: "/profile", label: "個人資訊", icon: User },
]
