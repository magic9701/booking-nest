'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { type actionFunction } from '@/utils/types';
import { LuUser } from 'react-icons/lu';
import { useToast } from '@/hooks/use-toast';

type ImageInputContainerProps = {
  image: string
  name: string
  action: actionFunction
  text: string
  children?: React.ReactNode
  id?: string
};

function ImageInputContainer(props: ImageInputContainerProps) {
  const { image, name, action, text, id } = props
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('image', file)
      if(id) {
        formData.append('id', id)
      }
      try {
        await action(image, formData)
      } catch (error) {
        toast({ description: `'上傳失敗:', ${error}` })
      } finally {
        setIsUploading(false)
      }
    }
  }

  const userIcon = (
    <LuUser className='w-24 h-24 bg-primary rounded-md text-white mb-4' />
  )
  return (
    <div>
      {image ? (
        <Image
          src={image}
          width={100}
          height={100}
          className='rounded-md object-cover mb-4 w-24 h-24'
          alt={name}
        />
      ) : (
        userIcon
      )}

      <input
        type='file'
        ref={fileInputRef}
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />
      
      <Button
        variant='outline'
        size='sm'
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? '上傳中...' : text}
      </Button>
    </div>
  );
}
export default ImageInputContainer;