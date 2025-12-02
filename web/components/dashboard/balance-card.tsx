"use client"

import { BrutalCard } from "@/components/ui/brutal-card"
import { BrutalButton } from "@/components/ui/brutal-button"
import { ArrowUpRight, ArrowDownLeft, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface BalanceCardProps {
  balance: number
  currency?: string
  onSend?: () => void
  onTopUp?: () => void
}

export function BalanceCard({ balance, currency = "USD", onSend, onTopUp }: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true)

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <BrutalCard variant="primary" className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/5 transform rotate-45 translate-x-16 -translate-y-8" />

      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold uppercase opacity-80">Your Balance</span>
          <button onClick={() => setShowBalance(!showBalance)} className="p-1 hover:bg-foreground/10 transition-colors">
            {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>

        <div className="mb-6">
          {showBalance ? (
            <p className="text-4xl md:text-5xl font-bold tracking-tight">{formatBalance(balance)}</p>
          ) : (
            <p className="text-4xl md:text-5xl font-bold tracking-tight">••••••</p>
          )}
          <p className="text-sm opacity-70 mt-1">Available to send</p>
        </div>

        <div className="flex gap-3">
          <BrutalButton variant="secondary" className="flex-1" onClick={onSend}>
            <ArrowUpRight className="w-4 h-4" />
            Send
          </BrutalButton>
          <BrutalButton variant="outline" className="flex-1 bg-card" onClick={onTopUp}>
            <ArrowDownLeft className="w-4 h-4" />
            Top Up
          </BrutalButton>
        </div>
      </div>
    </BrutalCard>
  )
}
