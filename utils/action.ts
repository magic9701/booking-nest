'use server'

import { imageSchema, profileSchema, propertySchema, reviewSchema, validateWithZodSchema } from "./schemas";
import db from './db';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { calculateTotals, renderError } from "./helper";
import { uploadImage } from "./supabase";
import { startOfMonth, subYears, format } from "date-fns"

/**
 * 檢查當前用戶是否登入，若未登入則拋出錯誤
 * @returns {Promise<User>} 已登入的使用者物件
 * @throws {Error} 使用者未登入
 */
async function checkUserLogin() {
  const user = await getAuthUser()
  if (!user) {
    throw new Error("使用者未登入")
  }
  return user
}

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
  const user = await checkUserLogin()

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
  const user = await checkUserLogin();
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
  const user = await checkUserLogin()
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
  redirect('/')
}

// 修改房源
export const updatePropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await checkUserLogin()
  const propertyId = formData.get('id') as string

  try {
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(propertySchema, rawData)
    await db.property.update({
      where: {
        id: propertyId,
        profileId: user.id,
      },
      data: {
        ...validatedFields,
      },
    })

    revalidatePath(`/rentals/${propertyId}/edit`)
    return { message: '修改成功' }
  } catch (error) {
    return renderError(error)
  }
}

// 修改房源圖片
export const updatePropertyImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await checkUserLogin()
  const propertyId = formData.get('id') as string

  try {
    const image = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image })
    const fullPath = await uploadImage(validatedFields.image)

    await db.property.update({
      where: {
        id: propertyId,
        profileId: user.id,
      },
      data: {
        image: fullPath,
      },
    });
    revalidatePath(`/rentals/${propertyId}/edit`)
    return { message: '編輯圖片成功' }
  } catch (error) {
    return renderError(error)
  }
}

// 取得單一房源
export const fetchRentalDetails = async (propertyId: string) => {
  const user = await checkUserLogin()

  return db.property.findUnique({
    where: {
      id: propertyId,
      profileId: user.id,
    },
  })
}

export const fetchProperties = async({
  search = '', 
  category = '',
}: {
  search: string;
  category: string;
}) => {
  const whereConditions: any = {
    ...(category && { category }),
    OR: [
      { name: { contains: search, mode: 'insensitive' } },
      { tagline: { contains: search, mode: 'insensitive' } },
      { county: { contains: search, mode: 'insensitive' } },
      { city: { contains: search, mode: 'insensitive' } },
    ]
  };

  const properties = await db.property.findMany({
    where: whereConditions,
    select: {
      id: true,
      image: true,
      name: true,
      tagline: true,
      county: true,
      city: true,
      price: true,
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const reviewStats = await Promise.all(
    properties.map(async (property) => {
      const stats = await db.review.aggregate({
        where: { propertyId: property.id },
        _count: { id: true },  // 計算 review 數量
        _avg: { rating: true },  // 計算平均分數
      });
      return {
        propertyId: property.id,
        reviewCount: stats._count.id || 0,
        averageRating: stats._avg.rating
        ? Number(stats._avg.rating.toFixed(1)) // 保證保留 1 位小數，包含 `.0`
        : 0
      }
    })
  )

  const propertiesWithReviews = properties.map((property) => {
    const stats = reviewStats.find((s) => s.propertyId === property.id)
    return {
      ...property,
      reviewCount: stats?.reviewCount || 0,
      averageRating: stats?.averageRating || 0,
    }
  })

  return propertiesWithReviews
}


export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string
}) => {
  const user = await checkUserLogin()
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
  const user = await checkUserLogin()
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
  const user = await checkUserLogin();

  const favoriteList = await db.favorite.findMany({
    where: {
      profileId: user.id,
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
          category: true,
        },
      },
    },
  })

  const favoriteProperties = await Promise.all(
    favoriteList.map(async (item) => {
      const property = item.property;
      const reviewStats = await db.review.aggregate({
        where: {
          propertyId: property.id,
        },
        _count: {
          id: true,
        },
        _avg: {
          rating: true,
        },
      });

      const reviewCount = reviewStats._count.id || 0;
      const averageRating = reviewStats._avg.rating
        ? Number(reviewStats._avg.rating.toFixed(1))
        : 0

      return {
        ...property,
        reviewCount,
        averageRating,
      };
    })
  );

  return favoriteProperties
}


export const fetchPropertyDetail = async (id: string) => {
  const property = await db.property.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      bookings: {
        where: {
          isCancelled: false, // 只包含未取消的訂房
        },
        select: {
          checkIn: true,
          checkOut: true,
        },
      },
    },
  })

  const reviewStats = await db.review.aggregate({
    where: {
      propertyId: id,
    },
    _count: {
      id: true,  // 計算評論數量
    },
    _avg: {
      rating: true,  // 計算平均評分
    },
  })
  const reviewCount = reviewStats._count.id || 0
  const averageRating = reviewStats._avg.rating
    ? Number(reviewStats._avg.rating.toFixed(1))
    : 0

  return {
    ...property,
    reviewCount,
    averageRating
  }
}


// 訂房
export const createBookingAction = async (prevState: {
  propertyId: string
  checkIn: Date
  checkOut: Date
}) => {
  const user = await checkUserLogin()
  let bookingId: null | string = null

  const { propertyId, checkIn, checkOut } = prevState
  const property = await db.property.findUnique({
    where: { id: propertyId },
    select: { price: true }
  })

  if(!property) {
    return { message: '無法找到房源' }
  }

  const { orderTotal, totalNights } = calculateTotals({
    checkIn,
    checkOut,
    price: property.price
  })

  try {
    const booking = await db.booking.create({
      data: {
        checkIn,
        checkOut,
        orderTotal,
        totalNights,
        profileId: user.id,
        propertyId
      }
    })
    bookingId = booking.id
  } catch (error) {
    return renderError(error)
  }
  redirect(`/checkout?bookingId=${bookingId}`)
}

// 取得user所有訂房紀錄
export const fetchTrips = async() => {
  const user = await checkUserLogin()
  const booking = await db.booking.findMany({
    where: {
      profileId: user.id,
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          county: true,
          city: true,
          image: true,
        }
      },
      review: true,
    },
    orderBy: {
      checkIn: 'asc'
    }
  })
  return booking
}

// 取消訂房
export const cancelTrips = async(prevState: {bookingId:string}) => {
  const {bookingId} = prevState
  const user = await checkUserLogin()

  try {
    const booking = await db.booking.findUnique({
      where: {
        id: bookingId,
        profileId: user.id,
      },
    })
    if (booking) {
      await db.booking.update({
        where: { id: bookingId },
        data: { isCancelled: true },
      });
      return { message: '取消訂房成功' }
    } else {
      return { message: '無法找到訂房紀錄' }
    }
  } catch (error) {
    return renderError(error)
  }
}

// 撰寫評論
export const createReview = async(
  prevState: any,
  formData: FormData
) => {
  const user = await checkUserLogin()
  const bookingId = formData.get('bookingId') as string
  try {
    // 找到訂單
    const booking = await db.booking.findUnique({
      where: {
        id: bookingId,
        profileId: user.id,
      },
      select: {
        id: true,
        propertyId: true
      }
    })

    if (!booking) {
      return { message: "無法找到對應的訂單" }
    }

    //找到訂單評論
    const existingReview = await db.review.findUnique({
      where: {
        bookingId: bookingId,
      },
    })

    if (existingReview) {
      return { message: "此訂單已經有評論，無法重複評論" }
    }
    
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(reviewSchema, rawData)

    const comment = validatedFields.comment
    const rating = validatedFields.rating

    if (!comment || isNaN(rating)) {
      return { message: "評論內容或評分不正確" };
    }

    //新增評論
    await db.review.create({
      data: {
        bookingId,
        profileId: user.id,
        propertyId: booking.propertyId,
        comment,
        rating,
      },
    })
  } catch (error) {
    return renderError(error)
  }
  redirect('/trips?tab=completed')
}

// 編輯review
export const updateReview = async (
  prevState: { bookingId: string },
  formData: FormData
) => {
  const { bookingId } = prevState
  const user = await checkUserLogin()

  try {
    // 找到review
    const existingReview = await db.review.findUnique({
      where: { bookingId },
    })

    if (!existingReview) {
      return { message: "找不到該筆評論，請確認您的訂單" };
    }

    // 確保只能修改自己的評論
    if (existingReview.profileId !== user.id) {
      return { message: "您沒有權限修改這則評論" }
    }

    const newComment = formData.get("comment")?.toString()
    const newRating = Number(formData.get("rating"))

    if (!newComment || isNaN(newRating)) {
      return { message: "請提供要修改的評論內容或評分" }
    }

    // 更新評論
    await db.review.update({
      where: { bookingId },
      data: {
        comment: newComment,
        rating: newRating,
      },
    })
    
    return { message: "評論更新成功" }
  } catch (error) {
    return renderError(error);
  }
}

// 取得詳細review內容
export const fetchPropertyReviews = async (propertyId: string) => {
  const reviews = await db.review.findMany({
    where: {
      propertyId: propertyId,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
      profile: {
        select: {
          id: true,
          profileImage: true,
          username: true,
          createdAt: true
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return reviews
}

// 取得所有未完成的bookings
export async function getPendingBooking() {
  const user = await checkUserLogin()

  const today = new Date()

  // 先取得使用者的所有 property
  const properties = await db.property.findMany({
    where: {
      profileId: user.id, // 當前使用者的 properties
    },
  })

  const bookings = await db.booking.findMany({
    where: {
      propertyId: { in: properties.map(property => property.id) },
      isCancelled: false,
      checkOut: {
        gt: today, // 只取得未來的訂單
      },
    },
    include: {
      property: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      checkIn: 'asc',
    },
  })

  return bookings.length > 0 ? bookings : []
}


// 取得近一年已完成的每月bookings所得
export async function getMonthlyCompletedBookings() {
  const user = await checkUserLogin()

  const oneYearAgo = subYears(new Date(), 1); // 取得一年前的日期

  // 先取得使用者的所有 property
  const properties = await db.property.findMany({
    where: {
      profileId: user.id, // 當前使用者的 properties
    },
  })

  // 如果使用者沒有任何property，直接回傳空陣列
  if (properties.length === 0) {
    return []
  }

  // 取得這些property下的所有未取消的 bookings
  const bookings = await db.booking.findMany({
    where: {
      propertyId: { in: properties.map(property => property.id) },
      isCancelled: false,
      checkOut: {
        gte: oneYearAgo, // 過濾近一年的資料
      },
    },
    select: {
      orderTotal: true,
      checkOut: true,
    },
  })

  // 按月份累積 `orderTotal`
  const monthlyEarnings: Record<string, number> = {};

  bookings.forEach((booking) => {
    const monthKey = format(startOfMonth(booking.checkOut), "yyyy-MM"); // 轉成 YYYY-MM 格式

    if (!monthlyEarnings[monthKey]) {
      monthlyEarnings[monthKey] = 0
    }

    monthlyEarnings[monthKey] += booking.orderTotal
  });

  return Object.entries(monthlyEarnings).map(([month, total]) => ({
    month,
    total,
  }))
}

// 取得所有已完成bookings的總金額
export async function getTotalCompletedBookingsAmount() {
  const user = await checkUserLogin()

  const today = new Date()

  // 先取得使用者的所有 property
  const properties = await db.property.findMany({
    where: {
      profileId: user.id, // 當前使用者的 properties
    },
  });

  // 如果使用者沒有任何屬性，直接回傳 0
  if (properties.length === 0) {
    return 0
  }

  // 取得這些屬性下的所有 bookings
  const result = await db.booking.aggregate({
    where: {
      propertyId: { in: properties.map(property => property.id) },
      isCancelled: false, // 未被取消
      checkOut: {
        lt: today,
      },
    },
    _sum: {
      orderTotal: true, // 計算所有 `orderTotal` 的總和
    },
  });

  return result._sum.orderTotal || 0
}

// 取得所有房源
export const fetchRentals = async () => {
  const user = await checkUserLogin()
  const rentals = await db.property.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });

  const rentalsWithBookingSums = await Promise.all(
    rentals.map(async (rental) => {
      const totalNightsSum = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
          paymentStatus: true,
        },
        _sum: {
          totalNights: true,
        },
      });

      const orderTotalSum = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
          paymentStatus: true,
        },
        _sum: {
          orderTotal: true,
        },
      });

      return {
        ...rental,
        totalNightsSum: totalNightsSum._sum.totalNights,
        orderTotalSum: orderTotalSum._sum.orderTotal,
      }
    })
  )

  return rentalsWithBookingSums
}

// 刪除房源
export async function deleteRentalAction(propertyId: string) {
  const user = await checkUserLogin()

  try {
    await db.property.delete({
      where: {
        id: propertyId,
        profileId: user.id,
      },
    })

    revalidatePath('/rentals')
    return { message: '刪除成功' }
  } catch (error) {
    return renderError(error);
  }
}

// 取得訂單
export const fetchReservations = async () => {
  const user = await checkUserLogin()

  const reservations = await db.booking.findMany({
    where: {
      property: {
        profileId: user.id,
      },
    },

    orderBy: {
      checkIn: 'desc',
    },

    include: {
      property: {
        select: {
          id: true,
          name: true,
          price: true,
          county: true,
          city: true,
        },
      },
    },
  })
  return reservations
}


export async function cleanupBookings() {
  try {
    // 查找所有未付款並且超過30分鐘未付款的訂單
    const bookingsToCancel = await db.booking.findMany({
      where: {
        isCancelled: false,
        paymentStatus: false,
        createdAt: {
          lt: new Date(new Date().getTime() - 30 * 60 * 1000), // 創建時間超過30分鐘
        },
      },
    })

    if (bookingsToCancel.length === 0) {
      return
    }

    // 批量更新這些訂單為取消狀態
    await db.booking.updateMany({
      where: {
        id: {
          in: bookingsToCancel.map((booking) => booking.id),
        },
      },
      data: { isCancelled: true },
    })
  } catch (error) {
    console.error(error)
  }
}