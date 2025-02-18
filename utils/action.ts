'use server'

import { profileSchema } from "./schemas";

// 驗證創建使用者資料
export const createProfileAction = async (prevState: any, formData: FormData) => {
  try {
    const rawData = Object.fromEntries(formData)
    const validatedFields = profileSchema.parse(rawData)
    console.log(validatedFields)
    return { message: '成功創建使用者資料' }

  } catch (error) {
    console.log(error)
    return { message: '創建失敗' }
  }

};