import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster"

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
  title: "BookingNest",
  description: "Book your ideal accommodation now with BookingNest, offering the best choices of hotels and unique homestays worldwide. Enjoy a simple, fast search experience to find the perfect stay that suits your needs. Start every journey here!",
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
