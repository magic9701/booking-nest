import * as z from 'zod';
import { ZodSchema } from 'zod';

export const profileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string().min(3, { message: "使用者名稱至少 3 個字" }).max(20, { message: "使用者名稱最多 20 個字" }),
});