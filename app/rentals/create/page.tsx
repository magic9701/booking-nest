import TextInput from '@/components/form/TextInput';
import FormContainer from '@/components/form/FormContainer';
import { createPropertyAction } from '@/utils/action'
import { SubmitButton } from '@/components/form/Buttons';
import NumberInput from '@/components/form/NumberInput';
import SelectInput from '@/components/form/SelectInput';
import { categories } from '@/data/categories'
import { accomodationDetails } from '@/data/accmodation'
import FormTextarea from '@/components/form/FormTextarea';
import AddressInputContainer from '@/components/form/AddressInputContainer';
import CounterInput from '@/components/form/CounterInput';
import AmenitiesInput from '@/components/form/AmenitiesInput';
import ImageInput from '@/components/form/ImageInput';

function CreatePropertyPage() {
  return (
    <section className='flex flex-col items-center w-full'>
      <div className='border p-8 rounded-md w-full max-w-5xl'>
        <h1 className='mb-6 text-2xl'>創建房源</h1>
        <FormContainer action={createPropertyAction}>
          <div className='grid lg:grid-cols-2 gap-x-8 gap-y-4 mb-4'>
            <TextInput name='name' label='房源名稱' placeholder='請輸入房源名稱' maxLength={20}/>
            <TextInput name='tagline' label='標語' placeholder='請輸入標語' maxLength={30}/>
            <NumberInput name='price' label='價格' placeholder='請輸入價格' min={0}/>
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
          />
          <ImageInput name='image' label='封面圖片' />
          <div className='grid lg:grid-cols-1'>
            <AddressInputContainer />
          </div>
          <div className='flex flex-col gap-4 mb-6'>
            <span>房間資訊</span>
            {accomodationDetails.map((detail) => (
              <CounterInput title={detail.label} valueKey={detail.key} key={detail.key} />
            ))}
          </div>
          <div className='flex flex-col gap-4 mb-8'>
            <span>可用設施</span>
            <AmenitiesInput />
          </div>
          <SubmitButton text='創建房源' />
        </FormContainer>
      </div>
    </section>
  )
}

export default CreatePropertyPage