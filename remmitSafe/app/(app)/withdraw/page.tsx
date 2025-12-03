"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWalletStore } from "@/store/wallet-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function WithdrawPage() {
  const router = useRouter()
  const { balance } = useWalletStore()
  const [amount, setAmount] = useState("")
  const [bankAccount, setBankAccount] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: call Rampable offramp API for withdrawal
    alert("Withdraw functionality would connect to Rampable offramp API in production")
    router.push("/dashboard")
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-card text-card-foreground rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-6">Withdraw to Bank</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Amount (USD)</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder="Enter amount"
              className="text-2xl font-bold"
            />
            <p className="text-sm text-muted-foreground">
              Available: ${balance.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Bank Account Number</Label>
            <Input
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              placeholder="Enter your bank account"
            />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground"
              disabled={!amount || !bankAccount}
            >
              Withdraw
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
