import type React from "react"
import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen remmit-gradient flex flex-col">
      <header className="p-4 md:p-6">
        <Link href="/" className="text-xl font-bold text-white">
          REMMIT
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  )
}
