'use server'

import { imageSchema, profileSchema, propertySchema, validateWithZodSchema } from "./schemas";
import db from './db';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { renderError } from "./helper";
import { uploadImage } from "./supabase";

// 使用clerk的hook取得user資料
const getAuthUser = async() => {
  const user = await currentUser()

  if(!user){
    throw new Error('請登入再執行')
  }

  if(!user.privateMetadata.hasProfile) redirect('/profile/create')
  
  return user
}

// 檢查使用者名稱是否已經存在
export const checkUsernameExists = async (username: string) => {
  const existingUsername = await db.profile.findFirst({
    where: {
      username: username,
    },
  })

  if (existingUsername) {
    throw new Error('此使用者名稱已被註冊，請選擇其他名稱')
  }
}

// 創建使用者資料
export const createProfileAction = async (prevState: any, formData: FormData) => {
  try {

    // 使用clerk的hook取得user資料
    const user = await currentUser()
    if(!user) throw new Error('請登入再執行')

    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(profileSchema, rawData)

    // 檢查 userName 是否已經存在
    await checkUsernameExists(validatedFields.username)

    // 在db新增使用者資料
    await db.profile.create({
      data:{
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields,
      }
    })

    // 在clerk上新增metadata，標註使用者已經新增profile
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      }
    })

  } catch (error) {
    return renderError(error)
  }
  redirect('/')
}

// 取得目前登入者的頭像，如果沒有登入回傳null，沒有頭像回傳undefined
export const fetchProfileImage = async () => {
  const user = await currentUser()
  if(!user) return null

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  })
  return profile?.profileImage
}

export const fetchProfile = async () => {
  const user = await getAuthUser()
  const profile = await db.profile.findUnique({
    where:{
      clerkId: user.id
    },
  })
  if (!profile) redirect('/profile/create')
  return profile
}

// 更新使用者資料
export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser()

  try {
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(profileSchema, rawData)

    // 檢查 userName 是否已經存在
    const profile = await db.profile.findUnique({
      where: {
        clerkId: user.id
      },
    })
    if (profile?.username !== validatedFields.username) {
      await checkUsernameExists(validatedFields.username)
    }

    // 在db新增使用者資料
    await db.profile.update({
      where: {
        clerkId: user.id
      },
      data: validatedFields
    })

    revalidatePath('/profile')
    return { message: '修改個人資料成功' }
  } catch (error) {
    return renderError(error)
  }
}

// 更新使用者頭貼
export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const image = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    });
    revalidatePath('/profile');
    return { message: '更新頭貼成功' };
  } catch (error) {
    return renderError(error);
  }
}

// 創建房源
export const createPropertyAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser()
  try {
    const rawData = Object.fromEntries(formData)
    const file = formData.get('image') as File

    const validatedFields = validateWithZodSchema(propertySchema, rawData) as {
      name: string
      tagline: string
      price: number
      category: string
      description: string
      address: string
      latitude: number
      longitude: number
      city: string
      county: string
      guests: number
      bedrooms: number
      beds: number
      baths: number
      amenities: string
    }

    const validatedFile = validateWithZodSchema(imageSchema, { image: file })
    const fullPath = await uploadImage(validatedFile.image)

    await db.property.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: user.id,
      },
    })
  } catch (error) {
    console.log(error)
    return renderError(error)
  }
  redirect('/');
}

export const fetchProperties = async({
  search='', category
}: {
  search: string, category: string
}) => {
  const properties = await db.property.findMany({
    where: {
      category,
      OR:[
        { name: { contains: search, mode: 'insensitive' } },
        { tagline: { contains: search, mode: 'insensitive' } },
        { county: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } }
      ]
    },
    select: {
      id: true,
      image: true,
      name: true,
      tagline: true,
      county: true,
      city: true,
      price: true,
      category: true
    },
    orderBy: {
      createdAt: 'desc'
    },
  })
  return properties
}

export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string
}) => {
  const user = await getAuthUser()
  const favorite = await db.favorite.findFirst({
    where: {
      propertyId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  })
  return favorite?.id || null;
}

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser()
  const { propertyId, favoriteId, pathname } = prevState
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      })
    } else {
      await db.favorite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      })
    }
    revalidatePath(pathname)
    return { message: favoriteId ? '移除最愛' : '加入最愛' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchFavoriteList = async () => {
  const user = await getAuthUser()
  const favoriteList = await db.favorite.findMany({
    where: {
      profileId: user.id
    },
    select: {
      property: {
        select: {
          id: true,
          image: true,
          name: true,
          tagline: true,
          county: true,
          city: true,
          price: true,
          category: true
        }
      }
    }
  })
  return favoriteList.map((item) => item.property)
}

export const fetchPropertyDetail = async (id: string) => {
  return await db.property.findUnique({
    where: {
      id,
    },
    include: {
      profile:true
    }
  })
}