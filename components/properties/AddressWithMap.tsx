'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from '@/components/ui/dialog'

function AddressWithMap({ address, name }: { address: string, name: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const openMapPopup = () => {
    setIsOpen(true)
  }

  const encodedAddress = encodeURIComponent(address)
  const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`

  return (
    <div>
      <address className="flex gap-1 mt-2">
        <MapPin color="#ff3838" />
        <span>{address}</span>
        <button onClick={openMapPopup} className="ml-2 text-blue-500 underline">
          開啟地圖
        </button>
      </address>

      {/* google map pop up */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button onClick={openMapPopup} className="hidden" />
        </DialogTrigger>
        <DialogContent className="max-w-4xl w-full p-4">
          <DialogHeader>
            <h2 className="text-xl font-bold">{name}</h2>
          </DialogHeader>
          <div className="relative w-full h-96">
            <iframe
              className="w-full h-full"
              src={mapUrl}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddressWithMap
