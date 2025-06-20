import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import UserDataModal from "@/components/user-data-modal"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Taha Hardware - Premium Industrial Solutions",
  description:
    "Quality brushes, hoses, and pneumatic products for retail and wholesale. Durable solutions for industries worldwide.",
  keywords: "industrial brushes, hoses, pneumatic products, Taha Hardware, industrial solutions",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <UserDataModal />
      </body>
    </html>
  )
}
