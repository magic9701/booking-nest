import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import TextInput from "@/components/form/TextInput";
import ImageInputContainer from '@/components/form/ImageInputContainer'
import { updateProfileAction, fetchProfile, updateProfileImageAction } from "@/utils/action";

async function ProfilePage() {
  const profile = await fetchProfile()

  return (
  <section className='flex flex-col items-center w-full'>
    <div className='border p-8 rounded-md w-full max-w-4xl'>
      <h1 className="mb-6 text-2xl">編輯個人資料</h1>
      <ImageInputContainer
        image={profile.profileImage}
        name={profile.username}
        action={updateProfileImageAction}
        text='更新頭貼'
      />
      <FormContainer action={updateProfileAction}>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <TextInput name='firstName' label='姓氏' defaultValue={profile.firstName} maxLength={50}/>
          <TextInput name='lastName' label='名字' defaultValue={profile.lastName} maxLength={50}/>
          <TextInput name='username' label='用戶名' defaultValue={profile.username} maxLength={20}/>
          <TextInput name='email' label='Email' defaultValue={profile.email} disabled/>
        </div>
        <SubmitButton text='儲存' className="mt-8" />
      </FormContainer>
    </div>
  </section>
  )
}

export default ProfilePage