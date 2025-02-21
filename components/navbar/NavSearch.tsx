"use client"

import { Input } from "../ui/input"
import { Search } from "lucide-react"

function NavSearch() {
  return (
    <div className="relative max-w-sm w-full">
      <Input 
        type="text" 
        placeholder="搜尋喜歡的住宿"
        className="pr-10 dark:bg-muted"
      />
      <Search 
        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer"
        onClick={() => alert("開始搜尋！")}
      />
    </div>
  );
}

export default NavSearch;
