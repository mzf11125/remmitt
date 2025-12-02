"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { EmailLogin } from "@/components/auth/email-login"
import { Send, Shield, Clock, DollarSign } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  if (isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-20" />
        <div className="absolute top-10 right-10 w-32 h-32 border-3 border-foreground bg-accent transform rotate-12" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border-3 border-foreground bg-primary transform -rotate-6" />

        <div className="relative max-w-lg mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background font-bold uppercase text-sm mb-6">
              <Send className="w-4 h-4" />
              Remitt
            </div>
            <h1 className="text-4xl md:text-5xl font-bold uppercase leading-tight mb-4">
              Send Money Home.
              <span className="block text-primary bg-foreground px-2 inline-block mt-2">Instantly.</span>
            </h1>
            <p className="text-muted-foreground text-lg">Fast, secure transfers to Indonesia with near-zero fees</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="border-3 border-foreground bg-card p-3 brutal-shadow text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2" />
              <p className="text-xs font-bold uppercase">Low Fees</p>
            </div>
            <div className="border-3 border-foreground bg-card p-3 brutal-shadow text-center">
              <Clock className="w-6 h-6 mx-auto mb-2" />
              <p className="text-xs font-bold uppercase">15 Min</p>
            </div>
            <div className="border-3 border-foreground bg-card p-3 brutal-shadow text-center">
              <Shield className="w-6 h-6 mx-auto mb-2" />
              <p className="text-xs font-bold uppercase">Secure</p>
            </div>
          </div>

          {/* Login Form */}
          <div className="border-3 border-foreground bg-card p-6 brutal-shadow-lg">
            <EmailLogin />
          </div>
        </div>
      </section>
    </main>
  )
}
