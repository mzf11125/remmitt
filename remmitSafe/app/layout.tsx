import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "REMMIT - Send Money Home Faster, Cheaper, and Safer",
  description:
    "Web2-friendly remittance app for Southeast Asian migrant workers. Send money to Indonesia with low fees and instant transfers.",
  generator: "v0.app",
  keywords: ["remittance", "money transfer", "Indonesia", "migrant workers", "send money"],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a2f2f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased remmit-gradient min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
