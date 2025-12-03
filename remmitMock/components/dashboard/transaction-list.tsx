"use client"

import { BrutalCard } from "@/components/ui/brutal-card"
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react"
import type { Transaction } from "@/store/wallet-store"

interface TransactionListProps {
  transactions: Transaction[]
  limit?: number
}

const statusIcons = {
  pending: <Clock className="w-4 h-4 text-muted-foreground" />,
  processing: <Loader2 className="w-4 h-4 text-primary animate-spin" />,
  completed: <CheckCircle className="w-4 h-4 text-accent" />,
  failed: <XCircle className="w-4 h-4 text-destructive" />,
}

const statusLabels = {
  pending: "Pending",
  processing: "Processing",
  completed: "Completed",
  failed: "Failed",
}

export function TransactionList({ transactions, limit }: TransactionListProps) {
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions

  const formatAmount = (amount: number, currency: string) => {
    if (currency === "IDR") {
      return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (displayTransactions.length === 0) {
    return (
      <BrutalCard className="text-center py-8">
        <div className="w-12 h-12 mx-auto mb-3 border-3 border-foreground bg-muted flex items-center justify-center">
          <ArrowUpRight className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-sm">No transactions yet</p>
        <p className="text-xs text-muted-foreground mt-1">Send money to see your history here</p>
      </BrutalCard>
    )
  }

  return (
    <div className="space-y-2">
      {displayTransactions.map((tx) => (
        <BrutalCard key={tx.id} hover className="flex items-center gap-3 p-3">
          <div
            className={`w-10 h-10 border-2 border-foreground flex items-center justify-center ${
              tx.type === "send" || tx.type === "offramp" ? "bg-primary" : "bg-accent"
            }`}
          >
            {tx.type === "send" || tx.type === "offramp" ? (
              <ArrowUpRight className="w-5 h-5" />
            ) : (
              <ArrowDownLeft className="w-5 h-5" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-bold text-sm truncate">
                {tx.recipientName || (tx.type === "onramp" ? "Top Up" : "Transfer")}
              </p>
              {statusIcons[tx.status]}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDate(tx.createdAt)} • {statusLabels[tx.status]}
            </p>
          </div>

          <div className="text-right">
            <p className="font-bold text-sm">
              {tx.type === "send" || tx.type === "offramp" ? "-" : "+"}
              {formatAmount(tx.amount, tx.currency)}
            </p>
            {tx.fiatAmount && (
              <p className="text-xs text-muted-foreground">{formatAmount(tx.fiatAmount, tx.fiatCurrency)}</p>
            )}
          </div>
        </BrutalCard>
      ))}
    </div>
  )
}
