import * as z from 'zod';
import { ZodSchema } from 'zod';

export function validateWithZodSchema<T>(schema:ZodSchema<T>, data:unknown):T {
  const res = schema.safeParse(data)

  if (!res.success) {
    const errors = res.error.errors.map((error) => error.message)
    throw new Error(errors.join(','))
  }
  return res.data
}

// 創建使用者資料
export const profileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string().min(2, { message: "使用者名稱至少 2 個字" }).max(20, { message: "使用者名稱最多 20 個字" }),
});

// 使用者頭貼
export const imageSchema = z.object({
  image: validateFile(),
});

function validateFile() {
  const maxUploadSize = 5 * 1024 * 1024
  const acceptedFileTypes = ['image/jpeg']

  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, `檔案上限為 5 MB`)
    .refine((file) => {
      return (
        !file || acceptedFileTypes.includes(file.type)
      );
    }, '上傳檔案必須為 JPG 格式');
}
