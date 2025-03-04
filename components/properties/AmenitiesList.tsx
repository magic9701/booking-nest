import type { Amenity } from "@/data/amenities"

function AmenitiesList({ amenities }: { amenities: string | Amenity[] }) {
  const parsedAmenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities

  const selectedAmenities = parsedAmenities.filter((amenity: Amenity) => amenity.selected)

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-semibold mb-2">有提供的設備與服務</h3>
      <div className="grid gap-2 grid-cols-2">
        {selectedAmenities.map((amenity: Amenity) => {
          return(
            <div key={amenity.key}>{amenity.label}</div>
          )
        })}
      </div>
    </div>
  )
}

export default AmenitiesList