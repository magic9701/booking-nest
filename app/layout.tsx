import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster"
import Head from 'next/head'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Booking Nest",
  description: "Booking Nest 是一個簡便、快速的訂房平台，專為尋找理想住宿的旅行者而設計。無論你是計劃商務出差還是度假旅行，Booking Nest 提供來自全球的各種住宿選擇，從舒適的酒店到溫馨的民宿，滿足你的各種需求。透過直觀的搜尋功能，使用者可以輕鬆選擇目的地、日期與房型，並即時預訂，確保你的旅行計劃無縫連接。加入 Booking Nest，享受便捷的訂房體驗，讓每次旅行都更輕鬆愉快。",
  keywords: "訂房平台, 住宿, 旅行",
  openGraph: {
    title: "Booking Nest",
    description: "Booking Nest 是一個簡便、快速的訂房平台，專為尋找理想住宿的旅行者而設計。無論你是計劃商務出差還是度假旅行，Booking Nest 提供來自全球的各種住宿選擇，從舒適的酒店到溫馨的民宿，滿足你的各種需求。透過直觀的搜尋功能，使用者可以輕鬆選擇目的地、日期與房型，並即時預訂，確保你的旅行計劃無縫連接。加入 Booking Nest，享受便捷的訂房體驗，讓每次旅行都更輕鬆愉快。",
    images: [
      {
        url: "/icon/logo.svg",
        alt: "Booking Nest Logo"
      }
    ],
    url: "https://booking-nest.vercel.app/"
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking Nest",
    description: "Booking Nest 是一個簡便、快速的訂房平台，專為尋找理想住宿的旅行者而設計。無論你是計劃商務出差還是度假旅行，Booking Nest 提供來自全球的各種住宿選擇，從舒適的酒店到溫馨的民宿，滿足你的各種需求。透過直觀的搜尋功能，使用者可以輕鬆選擇目的地、日期與房型，並即時預訂，確保你的旅行計劃無縫連接。加入 Booking Nest，享受便捷的訂房體驗，讓每次旅行都更輕鬆愉快。",
    images: [
      {
        url: "/icon/logo.svg",
        alt: "Booking Nest Logo"
      }
    ]
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
        <html lang='zh'>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Navbar />
            <main className="container">
              {children}
            </main>
            <Toaster />
          </body>
        </html>
    </ClerkProvider>
  );
}
