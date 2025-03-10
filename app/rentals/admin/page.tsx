'use client'

import { getMyProperties } from "@/utils/action"
import { renderError } from "@/utils/helper"
import { Property } from "@/utils/types"
import { useState, useEffect } from "react"


function ReantalAdminPage() {
  const [myRentalList, setMyRentalList] = useState<Property[]>([])

  const getMyRentalList = async() => {
    try {
      const res = await getMyProperties()
        if (Array.isArray(res)) {
          const formattedData = res.map((item) => ({
            ...item,
            amenities: typeof item.amenities === "string" ? JSON.parse(item.amenities) : item.amenities,
          }))
          setMyRentalList(formattedData)
        }
    } catch (error) {
      renderError(error)
    }
  }

  useEffect(() => {
    getMyRentalList()
  },[])

  return (
    <div>
      ReantalAdminPage
      {myRentalList.length > 0 && (
        <div>123</div>
      )}
    </div>
  )
}

export default ReantalAdminPage