import TextInput from '@/components/form/TextInput';
import FormContainer from '@/components/form/FormContainer';
import { fetchRentalDetails, updatePropertyAction, updatePropertyImageAction } from '@/utils/action'
import { SubmitButton } from '@/components/form/Buttons';
import NumberInput from '@/components/form/NumberInput';
import SelectInput from '@/components/form/SelectInput';
import { categories } from '@/data/categories'
import FormTextarea from '@/components/form/FormTextarea';
import CounterInput from '@/components/form/CounterInput';
import AmenitiesInput from '@/components/form/AmenitiesInput';
import { redirect } from 'next/navigation';
import { Amenity } from '@/data/amenities';
import ImageInputContainer from '@/components/form/ImageInputContainer';

async function EditRentalpage({ params }: { params: { id: string } }) {
  const property = await fetchRentalDetails(params.id)

  if (!property) redirect('/')

  const defaultAmenities: Amenity[] = JSON.parse(property.amenities)

  return (
    <section className='flex flex-col items-center w-full'>
      <div className='border p-8 rounded-md w-full max-w-5xl'>
        <h1 className='mb-6 text-2xl'>編輯房源</h1>
        <div className='mb-4'>
          <ImageInputContainer
            name={property.name}
            text='重新上傳圖片'
            action={updatePropertyImageAction}
            image={property.image}
            id={property.id}
          >
          </ImageInputContainer>
        </div>
        <FormContainer action={updatePropertyAction}>
          <div className='grid lg:grid-cols-2 gap-x-8 gap-y-4 mb-4'>
            <input type='hidden' name='id' value={property.id} />
            <TextInput name='name' label='房源名稱' placeholder='請輸入房源名稱' maxLength={20} defaultValue={property.name}/>
            <TextInput name='tagline' label='標語' placeholder='請輸入標語' maxLength={30} defaultValue={property.tagline}/>
            <NumberInput name='price' label='價格' placeholder='請輸入價格' min={0} defaultValue={property.price}/>
            <SelectInput
              label="房型類別"
              name="category"
              placeholder="請選擇一個類別"
              required
              items={categories.map(({ key, label, icon }) => ({
                value: key,
                label,
                icon,
              }))}
              defaultValue={property.category}
            />
          </div>
          <FormTextarea
            name="description"
            label="房源介紹"
            placeholder="請輸入詳細的資訊，幫助用戶更了解你的房源，可以使用ChatGPT幫忙呦!"
            minLength={10}
            maxLength={1000}
            rows={6}
            required
            defaultValue={property.description}
          />
          <div className='grid lg:grid-cols-1'>
            <TextInput name='address' label='地址(不可修改)' placeholder='請輸入房源名稱' defaultValue={property.address} readOnly/>
          </div>
          <div className='flex flex-col gap-4 mb-6'>
            <span>房間資訊</span>
            <CounterInput valueKey='guests' title='房客' defaultValue={property.guests} />
            <CounterInput valueKey='bedrooms' title='房間' defaultValue={property.bedrooms} />
            <CounterInput valueKey='beds' title='床位' defaultValue={property.beds} />
            <CounterInput valueKey='baths' title='浴室' defaultValue={property.baths} />
          </div>
          <div className='flex flex-col gap-4 mb-8'>
            <span>可用設施</span>
            <AmenitiesInput defaultValue={defaultAmenities}/>
          </div>
          <SubmitButton text='編輯房源' />
        </FormContainer>
      </div>
    </section>
  )
}

export default EditRentalpage