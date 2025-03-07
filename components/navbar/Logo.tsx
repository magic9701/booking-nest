import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href='/'>
      <Image 
        src="/icon/logo.svg" 
        alt="Booking Nest Logo" 
        width={170} 
        height={42} 
        priority
      />
    </Link>
  );
}

export default Logo;
