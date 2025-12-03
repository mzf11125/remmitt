"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { EXCHANGE_RATES, FEE_PERCENTAGE } from "@/lib/constants"

interface AmountInputProps {
  amount: string
  onAmountChange: (amount: string) => void
  fromCurrency: string
  toCurrency: string
  balance: number
}

export function AmountInput({ amount, onAmountChange, fromCurrency, toCurrency, balance }: AmountInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const numericAmount = Number.parseFloat(amount) || 0
  const rateKey = `${fromCurrency}-${toCurrency}` as keyof typeof EXCHANGE_RATES
  const rate = EXCHANGE_RATES[rateKey] || 15800
  const fee = numericAmount * FEE_PERCENTAGE
  const recipientAmount = (numericAmount - fee) * rate

  const formatCurrency = (value: number, currency: string) => {
    if (currency === "IDR") {
      return `Rp ${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`
    }
    return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-card-foreground">You Send</Label>
        <div
          className={`relative rounded-lg border-2 transition-colors ${isFocused ? "border-primary" : "border-border"}`}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-card-foreground">$</div>
          <Input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, "")
              onAmountChange(value)
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="0.00"
            className="text-3xl font-bold pl-10 pr-20 py-6 border-0 bg-transparent focus-visible:ring-0"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            {fromCurrency}
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Available: {formatCurrency(balance, fromCurrency)}</span>
          <button
            type="button"
            onClick={() => onAmountChange(balance.toString())}
            className="text-primary hover:underline"
          >
            Send Max
          </button>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Transfer fee (1.4%)</span>
          <span className="text-card-foreground">{formatCurrency(fee, fromCurrency)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Exchange rate</span>
          <span className="text-card-foreground">
            1 {fromCurrency} = {rate.toLocaleString()} {toCurrency}
          </span>
        </div>
        <div className="border-t border-border pt-2 mt-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Recipient gets</span>
            <span className="text-xl font-bold text-primary">{formatCurrency(recipientAmount, toCurrency)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
