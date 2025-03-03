'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '../ui/button'

function EmptyContent({
  imageSrc,
  heading,
  message,
  btnText,
  btnAction,
  routerPush,
  imgSize = 'small',
}: {
  imageSrc?: string
  heading?: string
  message?: string
  btnText?: string
  btnAction?: (event: React.MouseEvent<HTMLButtonElement>) => void
  routerPush?: string
  imgSize?: 'small' | 'medium' | 'large'
}) {
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (routerPush) {
      router.push(routerPush)
    } else if (btnAction) {
      btnAction(event)
    }
  }

  // 圖片大小
  const imageSizes = {
    small: 128,
    medium: 256,
    large: 384,
  }

  return (
    <div className="flex flex-col items-center justify-center mt-4 text-center">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="Empty state"
          width={imageSizes[imgSize]}
          height={imageSizes[imgSize]}
          className="mb-2 rounded"
        />
      )}
      {heading && <h2 className="text-xl font-bold mt-2">{heading}</h2>}
      {message && <p className="text-lg mt-2">{message}</p>}
      {btnText && (
        <Button className="mt-4 capitalize" size="lg" onClick={handleClick}>
          {btnText}
        </Button>
      )}
    </div>
  )
}

export default EmptyContent
