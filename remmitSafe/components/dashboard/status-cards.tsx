"use client"

import { ClockIcon, CheckCircleIcon } from "@/components/icons"
import { useWalletStore } from "@/store/wallet-store"

export function StatusCards() {
  const { transactions } = useWalletStore()

  const pending = transactions.filter((t) => t.status === "pending").length
  const confirming = transactions.filter((t) => t.status === "confirming").length
  const completed = transactions.filter((t) => t.status === "completed").length

  const cards = [
    {
      label: "Pending",
      value: pending,
      icon: ClockIcon,
      iconBg: "bg-[oklch(var(--status-pending)/0.2)]",
      iconColor: "text-[oklch(var(--status-pending))]",
    },
    {
      label: "Confirming",
      value: confirming,
      icon: ClockIcon,
      iconBg: "bg-[oklch(var(--status-confirming)/0.2)]",
      iconColor: "text-[oklch(var(--status-confirming))]",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircleIcon,
      iconBg: "bg-[oklch(var(--status-completed)/0.2)]",
      iconColor: "text-[oklch(var(--status-completed))]",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-card text-card-foreground rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="text-3xl font-bold mt-1">{card.value}</p>
          </div>
          <div className={`p-3 rounded-full ${card.iconBg}`}>
            <card.icon className={`w-6 h-6 ${card.iconColor}`} />
          </div>
        </div>
      ))}
    </div>
  )
}
