'use client'
import TextInput from "./TextInput"
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"

function AddressInputContainer() {
  const { toast } = useToast()
  const [formattedAddress, setFormattedAddress] = useState("")
  const [city, setCity] = useState("")
  const [county, setCounty] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const handleGeocode = async (address:string) => {
    setError("")
    setCity("")
    setCounty("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/geocode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      })


      const data = await response.json();
      if (response.ok) {
        setFormattedAddress(data.formattedAddress)
        setCity(data.city)
        setCounty(data.county)

        toast({
          title: "驗證成功",
          description: `地址已成功解析！\n${data.formattedAddress}`,
        })
      } else {
        setError(data.error || "無法獲取座標");
      }
    } catch (err) {
      console.log(err)
      setError("伺服器錯誤，請稍後再試")
    } finally {
      setIsLoading(false)
    }
  }

  const getLocation = async (e: React.MouseEvent) => {
    e.preventDefault()

    const inputElement = (e.currentTarget.previousElementSibling as HTMLElement).querySelector("input");

    if (inputElement && inputElement instanceof HTMLInputElement) {
      const address = inputElement.value;

      // 檢查地址長度是否小於 10
      if (address.length < 10) {
        setError('地址太短，請輸入至少 10 個字的地址')
      } else {
        await handleGeocode(address)
      }
    }
  }

  useEffect(() => {
    if (error) {
      toast({
        title: "地址解析失敗",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast])

  return (
    <div className='flex gap-4 w-full'>
      <input type="hidden" name="city" value={city ?? ""} />
      <input type="hidden" name="county" value={county ?? ""} />
      
      <TextInput className="w-full" name='address' label='地址' placeholder='請輸入房源地址進行驗證' defaultValue={formattedAddress} maxLength={100} readOnly={isLoading || city !== ''}/>
      <Button
        className="mt-6 bg-blue-500 text-white hover:bg-blue-700"
        disabled={isLoading}
        onClick={getLocation}
      >
        {isLoading ? "驗證中..." : "驗證地址"}
      </Button>
    </div>
  )
}

export default AddressInputContainer