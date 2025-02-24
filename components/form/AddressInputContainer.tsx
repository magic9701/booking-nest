'use client'
import TextInput from "./TextInput"
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast";

function AddressInputContainer() {
  const { toast } = useToast()

  const getLocation = (e: React.MouseEvent) => {
    e.preventDefault()

    const inputElement = (e.currentTarget.previousElementSibling as HTMLElement).querySelector("input");

    if (inputElement && inputElement instanceof HTMLInputElement) {
      const address = inputElement.value;

      // 檢查地址長度是否小於 10
      if (address.length < 10) {
        toast({
          title: "地址太短",
          description: "請輸入至少 10 個字的地址",
          variant: "destructive",
        });
      } else {
        console.log("getLocation");
      }
    }
  }

  return (
    <div className='flex gap-4 w-full'>
      <TextInput className="w-full" name='address' type='text' label='地址' placeholder='請輸入房源地址進行驗證' maxLength={100}/>
      <Button
        className="mt-6 bg-blue-500 text-white hover:bg-blue-700"
        onClick={getLocation}
      >
        驗證地址
      </Button>
    </div>
  )
}

export default AddressInputContainer