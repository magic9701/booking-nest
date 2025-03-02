"use client"

import { Input } from "../ui/input"
import { Search } from "lucide-react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce'
import { useState, useEffect } from 'react'

function NavSearch() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()

  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '')

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    if(value){
      params.set('search', value)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 500)

  useEffect(() => {
    if(!searchParams.get('search')){
      setSearch('')
    }
  },[searchParams.get('search')])

  return (
    <div className="relative max-w-sm w-full">
      <Input 
        type="text" 
        placeholder="搜尋喜歡的住宿"
        className="pr-10 dark:bg-muted"
        onChange={(e) => {
          setSearch(e.target.value)
          handleSearch(e.target.value)
        }}
      />
      <Search 
        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
      />
    </div>
  );
}

export default NavSearch;
