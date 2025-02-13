"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { 
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import Link from 'next/link';
import { User } from "lucide-react"
import { links } from "@/utils/links"
import SignOutLink from "./SignOutLink"
import { SignedOut, SignedIn, SignInButton, SignUpButton } from '@clerk/nextjs';

function LinksDropdown() {
  return (
    <DropdownMenu>
      {/* 觸發按鈕（使用者頭像） */}
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="/path/to/user-avatar.jpg" alt="User Avatar" />
          <AvatarFallback>
            <User className="h-6 w-6 text-gray-500" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {/* 下拉選單內容 */}
      <DropdownMenuContent align="end" className="w-22">
        {/* 未登入顯示 */}
        <SignedOut>
          <SignInButton mode='modal'>
            <button className='w-full text-center py-2 text-gray-700 hover:text-primary'>登入</button>
          </SignInButton>
          <SignUpButton mode='modal'>
            <button className='w-full text-center py-2 text-gray-700 hover:text-primary'>註冊</button>
          </SignUpButton>
        </SignedOut>

        {/* 登入的情況下顯示 */}
        <SignedIn>
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-2 p-2 text-gray-700 hover:text-primary">
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
          <DropdownMenuSeparator />
          <SignOutLink />
        </SignedIn>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown