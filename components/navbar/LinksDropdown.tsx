import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import Link from 'next/link';
import { links } from "@/data/links"
import SignOutLink from "./SignOutLink"
import { SignedOut, SignedIn, SignInButton, SignUpButton } from '@clerk/nextjs';
import UserIcon from './UserIcon';
import { Button } from '../ui/button';
import { LuAlignLeft } from 'react-icons/lu';

function LinksDropdown() {
  return (
    <DropdownMenu>
      {/* 觸發按鈕（使用者頭像） */}
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex gap-4 max-w-[100px]'>
          <LuAlignLeft className='w-6 h-6' />
          <UserIcon />
        </Button>
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