"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { useWalletStore } from "@/store/wallet-store"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Header } from "@/components/layout/header"
import { TransactionList } from "@/components/dashboard/transaction-list"
import { BrutalCard } from "@/components/ui/brutal-card"
import { Clock } from "lucide-react"

export default function HistoryPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { transactions } = useWalletStore()
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === "all") return true
    if (filter === "completed") return tx.status === "completed"
    if (filter === "pending") return tx.status === "pending" || tx.status === "processing"
    return true
  })

  return (
    <main className="min-h-screen bg-background pb-24">
      <Header title="History" />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(["all", "completed", "pending"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 border-2 border-foreground text-sm font-bold uppercase transition-all ${
                filter === f ? "bg-primary brutal-shadow" : "bg-card brutal-shadow-sm hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {filteredTransactions.length > 0 ? (
          <TransactionList transactions={filteredTransactions} />
        ) : (
          <BrutalCard className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 border-3 border-foreground bg-muted flex items-center justify-center">
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-bold mb-1">No Transactions</p>
            <p className="text-sm text-muted-foreground">
              {filter === "all" ? "Your transaction history will appear here" : `No ${filter} transactions found`}
            </p>
          </BrutalCard>
        )}
      </div>

      <BottomNav />
    </main>
  )
}
