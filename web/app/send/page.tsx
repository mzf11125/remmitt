"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { useWalletStore } from "@/store/wallet-store"
import { useRecipientStore, type Recipient } from "@/store/recipient-store"
import { xellarService } from "@/services/xellar-service"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Header } from "@/components/layout/header"
import { RecipientSelector } from "@/components/send/recipient-selector"
import { AddRecipientForm } from "@/components/send/add-recipient-form"
import { AmountInput } from "@/components/send/amount-input"
import { ConfirmationScreen } from "@/components/send/confirmation-screen"
import { SuccessScreen } from "@/components/send/success-screen"
import { BrutalButton } from "@/components/ui/brutal-button"
import { ArrowRight } from "lucide-react"

type Step = "recipient" | "add-recipient" | "amount" | "confirm" | "success"

interface QuoteData {
  sendAmount: number
  receiveAmount: number
  exchangeRate: number
  fee: number
  estimatedTime: string
}

export default function SendPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { totalUsdBalance, addTransaction } = useWalletStore()
  const { recipients, selectedRecipient, selectRecipient, addRecipient } = useRecipientStore()

  const [step, setStep] = useState<Step>("recipient")
  const [amount, setAmount] = useState(0)
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionId, setTransactionId] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    // If there's a pre-selected recipient, go to amount step
    if (selectedRecipient) {
      setStep("amount")
    }
  }, [isAuthenticated, router, selectedRecipient])

  const handleSelectRecipient = (recipient: Recipient) => {
    selectRecipient(recipient)
    setStep("amount")
  }

  const handleAddRecipient = (recipientData: Omit<Recipient, "id" | "createdAt">) => {
    const newRecipient: Recipient = {
      ...recipientData,
      id: `recv_${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    addRecipient(newRecipient)
    selectRecipient(newRecipient)
    setStep("amount")
  }

  const handleAmountChange = useCallback((newAmount: number, newQuote: QuoteData | null) => {
    setAmount(newAmount)
    setQuote(newQuote)
  }, [])

  const handleConfirmTransfer = async () => {
    if (!selectedRecipient || !quote) return

    setIsProcessing(true)
    try {
      const response = await xellarService.createOfframp({
        amount,
        recipientId: selectedRecipient.id,
        bankCode: selectedRecipient.bankCode,
        accountNumber: selectedRecipient.accountNumber,
      })

      setTransactionId(response.transactionId)

      addTransaction({
        id: response.transactionId,
        type: "offramp",
        status: "processing",
        amount,
        currency: "USD",
        fiatAmount: quote.receiveAmount,
        fiatCurrency: "IDR",
        recipientName: selectedRecipient.name,
        recipientBank: selectedRecipient.bankCode,
        recipientAccount: selectedRecipient.accountNumber,
        createdAt: new Date().toISOString(),
        fee: quote.fee,
        exchangeRate: quote.exchangeRate,
        txHash: response.txHash,
      })

      setStep("success")
    } catch (error) {
      console.error("[v0] Transfer failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSendAnother = () => {
    selectRecipient(null)
    setAmount(0)
    setQuote(null)
    setStep("recipient")
  }

  if (!isAuthenticated) {
    return null
  }

  const renderStep = () => {
    switch (step) {
      case "recipient":
        return (
          <RecipientSelector
            recipients={recipients}
            onSelect={handleSelectRecipient}
            onAddNew={() => setStep("add-recipient")}
          />
        )

      case "add-recipient":
        return <AddRecipientForm onAdd={handleAddRecipient} onCancel={() => setStep("recipient")} />

      case "amount":
        return (
          <div className="space-y-4">
            {selectedRecipient && (
              <button
                onClick={() => {
                  selectRecipient(null)
                  setStep("recipient")
                }}
                className="flex items-center gap-3 w-full p-3 border-3 border-foreground bg-card brutal-shadow"
              >
                <div className="w-10 h-10 border-2 border-foreground bg-primary flex items-center justify-center">
                  <span className="font-bold">{selectedRecipient.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-sm">{selectedRecipient.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedRecipient.bankCode} • ••••{selectedRecipient.accountNumber.slice(-4)}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">Change</span>
              </button>
            )}

            <AmountInput maxAmount={totalUsdBalance} onAmountChange={handleAmountChange} />

            <BrutalButton
              variant="primary"
              className="w-full"
              size="lg"
              disabled={!quote || amount <= 0}
              onClick={() => setStep("confirm")}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </BrutalButton>
          </div>
        )

      case "confirm":
        if (!selectedRecipient || !quote) return null
        return (
          <ConfirmationScreen
            recipient={selectedRecipient}
            sendAmount={amount}
            receiveAmount={quote.receiveAmount}
            exchangeRate={quote.exchangeRate}
            fee={quote.fee}
            estimatedTime={quote.estimatedTime}
            onConfirm={handleConfirmTransfer}
            onBack={() => setStep("amount")}
            isLoading={isProcessing}
          />
        )

      case "success":
        if (!selectedRecipient || !quote) return null
        return (
          <SuccessScreen
            transactionId={transactionId}
            recipientName={selectedRecipient.name}
            receiveAmount={quote.receiveAmount}
            estimatedTime={quote.estimatedTime}
            onSendAnother={handleSendAnother}
            onGoHome={() => router.push("/dashboard")}
          />
        )
    }
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      <Header
        title={step === "success" ? "Success" : "Send Money"}
        showBack={step !== "recipient" && step !== "success"}
      />

      <div className="max-w-lg mx-auto px-4 py-6">{renderStep()}</div>

      {step !== "success" && <BottomNav />}
    </main>
  )
}
