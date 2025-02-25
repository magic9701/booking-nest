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
  firstName: z.string().max(50, { message: "使用者名稱最多 30 個字" }),
  lastName: z.string().max(50, { message: "使用者名稱最多 30 個字" }),
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

// 房源
export const propertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: '房源名稱至少需要 2 個字'
    })
    .max(20, {
      message: '房源名稱至多為 20 個字'
    }),
  tagline: z
    .string()
    .min(1, {
      message: '標語至少需要 1 個字'
    })
    .max(30, {
      message: '標語至多為 30 個字'
    }),
  price: z.coerce
    .number().int().min(0,{
      message: '價格必須至少為 0 元起'
    }),
  category: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: '描述的字數必須介於 10 到 1000 之間',
    }
  ),
  address: z.string(),
  latitude: z.number()
    .min(-90, { message: '緯度必須在 -90 到 90 之間。' })
    .max(90, { message: '緯度必須在 -90 到 90 之間。' }),
  longitude: z.number()
    .min(-180, { message: '經度必須在 -180 到 180 之間。' })
    .max(180, { message: '經度必須在 -180 到 180 之間。' }),
  guests: z.coerce.number().int().min(0, {
    message: '可容納人數至少為 1 位',
  }),
  bedrooms: z.coerce.number().int().min(0, {
    message: '房間至少為 1 間',
  }),
  beds: z.coerce.number().int().min(0, {
    message: '床位至少為 1 個',
  }),
  baths: z.coerce.number().int().min(0, {
    message: '浴室至少為 1 間',
  }),
  amenities: z.string(),
})