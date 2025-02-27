'use client';
import { useState } from 'react';
import { amenities, Amenity } from '@/data/amenities';
import { Checkbox } from '@/components/ui/checkbox';

function AmenitiesInput() {
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
    amenities
  );
  const handleChange = (amenity: Amenity) => {
    setSelectedAmenities((prev) => {
      return prev.map((a) => {
        if (a.key === amenity.key) {
          return { ...a, selected: !a.selected };
        }
        return a;
      });
    });
  };

  return (
    <section>
      <input
        type='hidden'
        name='amenities'
        value={JSON.stringify(selectedAmenities)}
      />
      <div className='grid grid-cols-2 gap-4'>
        {selectedAmenities.map((amenity) => {
          return (
            <div key={amenity.key} className='flex items-center space-x-2'>
              <Checkbox
                id={amenity.key}
                checked={amenity.selected}
                onCheckedChange={() => handleChange(amenity)}
              />
              <label
                htmlFor={amenity.key}
                className='text-sm font-medium leading-none  flex gap-x-2 items-center'
              >
                {amenity.label}
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default AmenitiesInput;