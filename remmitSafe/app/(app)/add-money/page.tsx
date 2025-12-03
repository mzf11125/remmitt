"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const paymentMethods = [
  { id: "bank", name: "Bank Transfer", description: "1-2 hours" },
  { id: "va", name: "Virtual Account", description: "Instant" },
  { id: "card", name: "Debit Card", description: "Instant" },
]

export default function AddMoneyPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: call Rampable onramp API
    // await xellar.rampable.onRamp({ amount, paymentMethod: method })
    alert("Add Money functionality would connect to Rampable onramp API in production")
    router.push("/dashboard")
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-card text-card-foreground rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-6">Add Money</h1>

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
          </div>

          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((pm) => (
                  <SelectItem key={pm.id} value={pm.id}>
                    <div>
                      <span className="font-medium">{pm.name}</span>
                      <span className="text-muted-foreground ml-2">({pm.description})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground" disabled={!amount || !method}>
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
