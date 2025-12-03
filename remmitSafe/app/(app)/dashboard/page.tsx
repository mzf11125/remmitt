"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/store/auth-store"
import { UserProfileCard } from "@/components/dashboard/user-profile-card"
import { BalanceCard } from "@/components/dashboard/balance-card"
import { SupportCard } from "@/components/dashboard/support-card"
import { StatsOverview } from "@/components/dashboard/stats-overview"
import { RecipientsList } from "@/components/dashboard/recipients-list"
import { ActivityChart } from "@/components/dashboard/activity-chart"

export default function DashboardPage() {
  const { user, login } = useAuthStore()

  // Auto-login for demo purposes
  useEffect(() => {
    if (!user) {
      login("demo@remmit.com")
    }
  }, [user, login])

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Stats Overview - Top Row */}
      <StatsOverview />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Profile & Balance */}
        <div className="lg:col-span-3 space-y-6">
          <UserProfileCard />
          <BalanceCard />
          <SupportCard />
        </div>

        {/* Middle Column - Recipients */}
        <div className="lg:col-span-5">
          <RecipientsList />
        </div>

        {/* Right Column - Chart */}
        <div className="lg:col-span-4">
          <ActivityChart />
        </div>
      </div>
    </div>
  )
}
