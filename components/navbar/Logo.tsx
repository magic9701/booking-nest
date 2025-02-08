import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href='/'>
      <Image 
        src="/icon/logo.svg" 
        alt="Booking Nest Logo" 
        width={190} 
        height={48} 
        priority
      />
    </Link>
  );
}

export default Logo;
