"use client"

import { SendIcon, ReceiveIcon, CheckCircleIcon, ClockIcon } from "@/components/icons"
import type { Transaction } from "@/lib/types"

interface ActivityTimelineProps {
  transactions: Transaction[]
}

export function ActivityTimeline({ transactions }: ActivityTimelineProps) {
  // Group transactions by date
  const groupedTransactions = transactions.reduce(
    (groups, tx) => {
      const date = tx.createdAt.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(tx)
      return groups
    },
    {} as Record<string, Transaction[]>,
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[oklch(var(--status-completed)/0.15)] text-[oklch(var(--status-completed))]">
            <CheckCircleIcon className="w-3 h-3" /> Completed
          </span>
        )
      case "confirming":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[oklch(var(--status-confirming)/0.15)] text-[oklch(var(--status-confirming))]">
            <ClockIcon className="w-3 h-3" /> Confirming
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[oklch(var(--status-pending)/0.15)] text-[oklch(var(--status-pending))]">
            <ClockIcon className="w-3 h-3" /> Pending
          </span>
        )
      default:
        return null
    }
  }

  const truncateAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="bg-card text-card-foreground rounded-xl p-6">
      <h2 className="text-2xl font-light text-card-foreground mb-6">Activity Timeline</h2>

      {Object.entries(groupedTransactions).map(([date, txs]) => (
        <div key={date} className="mb-8">
          {/* Date Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground font-medium">{date}</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Transactions */}
          <div className="space-y-4">
            {txs.map((tx) => (
              <div key={tx.id} className="border border-border rounded-xl p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      tx.type === "send" ? "bg-[oklch(var(--brand-orange)/0.15)]" : "bg-[oklch(var(--brand-green)/0.15)]"
                    }`}
                  >
                    {tx.type === "send" ? (
                      <SendIcon className="w-5 h-5 text-[oklch(var(--brand-orange))]" />
                    ) : (
                      <ReceiveIcon className="w-5 h-5 text-[oklch(var(--brand-green))]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-card-foreground capitalize">{tx.type}</h3>
                        <p className="text-sm text-muted-foreground">
                          {tx.amount.toLocaleString()} {tx.currency} {tx.type === "send" ? "to" : "from"}{" "}
                          {tx.recipientName || truncateAddress(tx.txHash || "")}
                        </p>
                      </div>
                      {getStatusBadge(tx.status)}
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                      {tx.txHash && (
                        <div>
                          <p className="text-xs text-muted-foreground">Transaction Hash:</p>
                          <p className="text-sm font-medium text-card-foreground">{truncateAddress(tx.txHash)}</p>
                        </div>
                      )}
                      {tx.recipientName && (
                        <div>
                          <p className="text-xs text-muted-foreground">{tx.type === "send" ? "To:" : "From:"}</p>
                          <p className="text-sm font-medium text-card-foreground">{tx.recipientName}</p>
                        </div>
                      )}
                      {tx.recipientAmount && (
                        <div>
                          <p className="text-xs text-muted-foreground">Converted Amount:</p>
                          <p className="text-sm font-medium text-card-foreground">
                            Rp {tx.recipientAmount.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                      )}
                      {tx.fee > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground">Fee:</p>
                          <p className="text-sm font-medium text-card-foreground">
                            ${tx.fee.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      )}
                    </div>

                    {tx.estimatedTime && tx.status !== "completed" && (
                      <div className="mt-3 text-xs text-muted-foreground">Estimated: {tx.estimatedTime}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(groupedTransactions).length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      )}
    </div>
  )
}
