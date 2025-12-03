"use client"

import { useWalletStore } from "@/store/wallet-store"
import { WalletIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BalanceCard() {
  const { balance } = useWalletStore()

  return (
    <div className="bg-card text-card-foreground rounded-xl p-6">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <WalletIcon className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-4xl font-bold">${balance.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        <p className="text-sm text-muted-foreground mt-1">Available Balance</p>
        <div className="flex gap-4 mt-6 w-full">
          <Button variant="ghost" className="flex-1 text-primary hover:text-primary/80" asChild>
            <Link href="/add-money">+ ADD MONEY</Link>
          </Button>
          <div className="w-px bg-border" />
          <Button variant="ghost" className="flex-1 text-primary hover:text-primary/80" asChild>
            <Link href="/withdraw">WITHDRAW</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
