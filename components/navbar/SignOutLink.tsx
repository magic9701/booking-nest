'use client'

import { useState } from 'react';
import { SignOutButton } from '@clerk/nextjs';

function SignOutLink() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = () => {
    setIsLoading(true);
  };

  return (
    <SignOutButton redirectUrl='/'>
      <button
        className='w-full text-center p-1 rounded disabled:opacity-50'
        onClick={handleSignOut}
        disabled={isLoading}
      >
        {isLoading ? '登出中...' : '登出'}
      </button>
    </SignOutButton>
  );
}

export default SignOutLink;