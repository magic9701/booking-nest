import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { createPropertyAction } from '@/utils/action'
import { SubmitButton } from '@/components/form/Buttons';
import PriceInput from '@/components/form/PriceInput';

function CreatePropertyPage() {
  return (
    <section className='flex flex-col items-center w-full'>
      <div className='border p-8 rounded-md w-full max-w-5xl'>
        <h1 className='mb-6 text-2xl'>創建房源</h1>
        <FormContainer action={createPropertyAction}>
          <div className='grid lg:grid-cols-2 gap-x-8 gap-y-4 mb-4'>
            <FormInput name='name' type='text' label='房源名稱' placeholder='請輸入房源名稱' maxLength={20}/>
            <FormInput name='tagline' type='text' label='標語' placeholder='請輸入標語' maxLength={30}/>
            <PriceInput />
          </div>
          <SubmitButton text='創建房源' />
        </FormContainer>
      </div>
    </section>
  )
}

export default CreatePropertyPage