import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Noto_Sans_KR } from "next/font/google"
import "./globals.css"
import BottomNavigation from "@/components/bottom-navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })
const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "경기도 광주 벚꽃 명소",
  description: "광주의 아름다운 벚꽃 명소를 소개합니다. 드라이브 코스와 산책로를 확인해보세요.",
  keywords: ["벚꽃", "광주", "경기도", "드라이브", "봄꽃", "데이트", "나들이"],
  authors: [{ name: "Cherry Blossom Map" }],
  openGraph: {
    title: "경기도 광주 벚꽃 명소",
    description: "광주의 아름다운 벚꽃 명소를 소개합니다. 드라이브 코스와 산책로를 확인해보세요.",
    url: "https://your-domain.com",
    siteName: "벚꽃 명소 지도",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "경기도 광주 벚꽃 명소 지도",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "경기도 광주 벚꽃 명소",
    description: "광주의 아름다운 벚꽃 명소를 소개합니다. 드라이브 코스와 산책로를 확인해보세요.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  themeColor: "#FADADD",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} ${notoSansKr.className}`} suppressHydrationWarning>
        <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
          strategy="beforeInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="cherry-blossom-theme"
        >
          {children}
          <BottomNavigation />
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'