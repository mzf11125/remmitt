"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useWalletStore } from "@/store/wallet-store"
import { RecipientSelector } from "./recipient-selector"
import { AmountInput } from "./amount-input"
import { TransactionStatus } from "./transaction-status"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { Recipient } from "@/lib/types"
import { EXCHANGE_RATES, FEE_PERCENTAGE } from "@/lib/constants"

type SendStep = "form" | "confirm" | "processing" | "success"

export function SendForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { balance, recipients, addTransaction } = useWalletStore()

  const preselectedId = searchParams.get("recipient")
  const preselectedRecipient = preselectedId ? recipients.find((r) => r.id === preselectedId) || null : null

  const [step, setStep] = useState<SendStep>("form")
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(preselectedRecipient)
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")

  const numericAmount = Number.parseFloat(amount) || 0
  const rate = EXCHANGE_RATES["USD-IDR"]
  const fee = numericAmount * FEE_PERCENTAGE
  const recipientAmount = (numericAmount - fee) * rate

  const handleContinue = () => {
    setError("")

    if (!selectedRecipient) {
      setError("Please select a recipient")
      return
    }

    if (numericAmount <= 0) {
      setError("Please enter an amount to send")
      return
    }

    if (numericAmount > balance.amount) {
      setError("Insufficient balance")
      return
    }

    setStep("confirm")
  }

  const handleConfirm = async () => {
    setStep("processing")

    // Simulate transaction processing
    // In production: call Xellar offramp API
    // const quote = await xellar.offRamp.quote({ amount, currency: "USDC", recipient: ... })
    // const tx = await xellar.offRamp.create({ quoteId: quote.id })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Add transaction to store
    addTransaction({
      id: Date.now().toString(),
      type: "send",
      status: "confirming",
      amount: numericAmount,
      currency: "USD",
      recipientAmount,
      recipientCurrency: "IDR",
      exchangeRate: rate,
      fee,
      recipientId: selectedRecipient?.id,
      recipientName: selectedRecipient?.name,
      createdAt: new Date(),
      estimatedTime: "15-60 minutes",
    })

    setStep("success")
  }

  if (step === "processing" || step === "success") {
    return (
      <TransactionStatus
        status={step === "processing" ? "processing" : "completed"}
        amount={numericAmount}
        recipientName={selectedRecipient?.name || ""}
        recipientAmount={recipientAmount}
      />
    )
  }

  if (step === "confirm") {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-card-foreground">Confirm Transfer</h2>

        <div className="bg-muted rounded-lg p-4 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Sending to</p>
            <p className="font-medium text-card-foreground">{selectedRecipient?.name}</p>
            <p className="text-sm text-muted-foreground">
              {selectedRecipient?.bankName} - {selectedRecipient?.accountNumber}
            </p>
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">You send</span>
              <span className="font-medium text-card-foreground">
                ${numericAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fee</span>
              <span className="text-card-foreground">${fee.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Exchange rate</span>
              <span className="text-card-foreground">1 USD = {rate.toLocaleString()} IDR</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="text-muted-foreground">Recipient gets</span>
              <span className="text-xl font-bold text-primary">
                Rp {recipientAmount.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
          Estimated delivery: <span className="text-card-foreground font-medium">15-60 minutes</span>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep("form")}>
            Back
          </Button>
          <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleConfirm}>
            Confirm & Send
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-card-foreground">Send to</Label>
        <RecipientSelector selected={selectedRecipient} onSelect={setSelectedRecipient} />
      </div>

      <AmountInput
        amount={amount}
        onAmountChange={setAmount}
        fromCurrency="USD"
        toCurrency="IDR"
        balance={balance.amount}
      />

      {error && <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-sm">{error}</div>}

      <Button
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={handleContinue}
        disabled={!selectedRecipient || numericAmount <= 0}
      >
        Continue
      </Button>
    </div>
  )
}
