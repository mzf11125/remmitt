"use client"

import { useWalletStore } from "@/store/wallet-store"
import { CheckCircleIcon, ClockIcon } from "@/components/icons"

export function TransactionHistorySidebar() {
  const { transactions } = useWalletStore()
  const recentTransactions = transactions.slice(0, 5)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircleIcon className="w-3 h-3" /> Completed
          </span>
        )
      case "confirming":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-700">
            <ClockIcon className="w-3 h-3" /> Confirming
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <ClockIcon className="w-3 h-3" /> Pending
          </span>
        )
      default:
        return null
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="bg-card text-card-foreground rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ClockIcon className="w-5 h-5 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Transaction History</h3>
      </div>

      <div className="space-y-4">
        {recentTransactions.map((tx) => (
          <div key={tx.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              {getStatusBadge(tx.status)}
              <span className="text-xs text-muted-foreground">{formatTimeAgo(tx.createdAt)}</span>
            </div>
            <p className="font-bold text-card-foreground">
              {tx.amount.toLocaleString("en-US", { minimumFractionDigits: 0 })} {tx.currency}
            </p>
            {tx.recipientAmount && (
              <p className="text-sm text-muted-foreground">
                → {tx.recipientAmount.toLocaleString("id-ID", { maximumFractionDigits: 0 })} {tx.recipientCurrency}
              </p>
            )}
            {tx.recipientName && <p className="text-xs text-muted-foreground mt-1">To: {tx.recipientName}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
