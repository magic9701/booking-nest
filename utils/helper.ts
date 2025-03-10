import { calculateDaysBetween } from "./calendar"
import { BookingData, MonthIncome } from "./types"

// 錯誤提示
export const renderError = (error: unknown): { message: string } => {
  console.log(error)
  return {
    message: error instanceof Error ? error.message : '錯誤，無法成功執行',
  }
}

/**
 * 格式化日期為台灣的年份與月份格式（可選是否顯示日期）。
 * 
 * @param {Date} date - 要格式化的 Date 物件
 * @param {boolean} [onlyMonth] - 是否只顯示「年份 + 月份」（預設為 false，會包含日期）
 * @returns {string} 格式化後的日期字串，例如：
 *   - `formatDate(new Date('2025-03-05'))` → "2025年3月5日"
 *   - `formatDate(new Date('2025-03-05'), true)` → "2025年3月"
 */
export const formatDate = (date: Date, onlyMonth?: boolean) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  }
  if (!onlyMonth) {
    options.day = 'numeric';
  }

  return new Intl.DateTimeFormat('zh-TW', options).format(date);
}


/**
 * 格式化金額為台灣貨幣（新台幣，TWD）。
 *
 * @param {number | null} amount - 要格式化的金額，允許 `null` 值（`null` 會視為 0）。
 * @returns {string} 格式化後的金額字串，例如：
 *   - `formatCurrency(123456)` → "NT$123,456"
 *   - `formatCurrency(null)` → "NT$0"
 */
export const formatCurrency = (amount: number | null): string => {
  const value = amount ?? 0;

  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',        // 設定為貨幣格式
    currency: 'TWD',         // 使用台幣 (TWD)
    minimumFractionDigits: 0, // 最少小數位數為 0（不顯示小數）
    maximumFractionDigits: 0, // 最多小數位數為 0（不顯示小數）
  }).format(value);
}

// 訂房相關
type BookingDetails = {
  checkIn: Date
  checkOut: Date
  price: number
}

/**
 * 計算訂單總金額，包括住宿費、清潔費、服務費與稅金，並考慮長住優惠。
 *
 * @param {BookingDetails} details - 訂房資訊
 * @param {Date} details.checkIn - 入住日期
 * @param {Date} details.checkOut - 退房日期
 * @param {number} details.price - 每晚房價
 * @returns {object} 訂單的費用明細：
 *   - `totalNights` (number): 總住宿天數，計算方式為入住日期與退房日期之間的天數
 *   - `subTotal` (number): 住宿費（`總天數 * 每晚價格`）
 *   - `service` (number): 服務費（6% 住宿費）
 *   - `tax` (number): 稅金（10% 住宿費）
 *   - `longStayDiscount` (number): 長住優惠（若住宿天數超過 3 晚）
 *   - `orderTotal` (number): 訂單總金額（包括住宿費、清潔費、服務費、稅金及折扣）
 */
export const calculateTotals = ({checkIn, checkOut, price}: BookingDetails) => {
  const totalNights = calculateDaysBetween({ checkIn, checkOut })
  const subTotal = totalNights * price
  const service = subTotal * 0.06
  let tax = 0
  let longStayDiscount = 0

  let orderTotal = subTotal

  // 長住優惠
  if (totalNights >= 3) {
    longStayDiscount = orderTotal * 0.05
  } else if (totalNights >= 7) {
    longStayDiscount = orderTotal * 0.07
  }

  // 最後計算總價
  tax = (subTotal - longStayDiscount) * 0.1
  orderTotal = subTotal - longStayDiscount + tax + service

  return { totalNights, subTotal, tax, service, orderTotal, longStayDiscount }
}

/**
 * 生成過去 12 個月的資料，補齊缺少的月份，並設定 total 為 0。
 * 
 * @param {Array<{ month: string, total: number }>} data - 原始數據，包含月份與對應總數
 * @returns {Array<{ month: string, total: number }>} 補齊並排序後的 12 個月數據
 *   - `month` (string): 月份（格式為 YYYY-MM）
 *   - `total` (number): 當月總數，若無資料則為 0
 */
export function fillMissingMonths(data:MonthIncome[]) {
  const now = new Date();
  now.setMonth(now.getMonth() - 11)
  let startYear = now.getFullYear()
  let startMonth = now.getMonth() + 1

  const existingMonths = new Map(data.map(d => [d.month, d.total]))

  // 建立完整 12 個月的範圍
  const fullData = [];
  for (let i = 0; i < 12; i++) {
    const month = String(startMonth).padStart(2, "0")
    const key = `${startYear}-${month}`
    
    // 如果原始資料有該月份，取出原值，否則補 0
    fullData.push({ month: key, total: existingMonths.get(key) || 0 })

    // 更新月份（跨年處理）
    startMonth++;
    if (startMonth > 12) {
        startMonth = 1
        startYear++
    }
  }

  return fullData
}

/**
 * 取得本月份新增的訂單
 * 
 * @param {Array<{ createdAt: Date }>} data - 原始訂單數據，每個訂單包含創建時間 `createdAt`
 *   - `createdAt` (Date): 訂單的創建時間
 * @returns {number} 本月新增訂單的數量
 *   - 函數返回一個數字，表示在本月內新增的訂單數量。
 */
export function getOrdersThisMonth(data:BookingData[]) {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const ordersThisMonth = data.filter(order => {
    const createdAt = new Date(order.createdAt)
    return createdAt >= startOfMonth && createdAt <= now
  })
  return ordersThisMonth.length
}