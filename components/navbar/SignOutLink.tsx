'use client';

import { SignOutButton } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast'

function SignOutLink() {
  const { toast } = useToast()
  const handleLogout = () => {
    toast({ description: '登出成功' })
  };

  return (
    <SignOutButton redirectUrl='/'>
      <button className='w-full text-center p-1' onClick={handleLogout}>
        登出
      </button>
    </SignOutButton>
  );
}
export default SignOutLink