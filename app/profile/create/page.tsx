import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import TextInput from "@/components/form/TextInput";
import { createProfileAction } from "@/utils/action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function CreateProfilePage() {
  const user = await currentUser()
  if(user?.privateMetadata.hasProfile) redirect('/')
  return (
    <section className='flex flex-col items-center w-full'>
      <h1 className="mb-6 ml-1 text-2xl">歡迎加入Booking Nest！請輸入你的個人資料！</h1>
      <div className='border p-8 rounded-md w-full max-w-3xl'>
        <FormContainer action={createProfileAction}>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <TextInput name='firstName' label='姓氏' />
            <TextInput name='lastName' label='名字' />
            <TextInput name='username' label='用戶名' />
          </div>
          <SubmitButton text='儲存' className="mt-8" />
        </FormContainer>
      </div>
    </section>
  )
}

export default CreateProfilePage