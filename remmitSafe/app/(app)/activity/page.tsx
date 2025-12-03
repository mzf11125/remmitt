"use client"

import { useState } from "react"
import { useWalletStore } from "@/store/wallet-store"
import { StatusCards } from "@/components/dashboard/status-cards"
import { ActivityFilter } from "@/components/activity/activity-filter"
import { ActivityTimeline } from "@/components/activity/activity-timeline"
import type { TransactionFilter } from "@/lib/types"

export default function ActivityPage() {
  const { transactions } = useWalletStore()
  const [filter, setFilter] = useState<TransactionFilter>("all")

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === "all") return true
    return tx.type === filter
  })

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <StatusCards />

      <div className="flex items-center gap-4">
        <ActivityFilter filter={filter} onFilterChange={setFilter} />
      </div>

      <ActivityTimeline transactions={filteredTransactions} />
    </div>
  )
}
