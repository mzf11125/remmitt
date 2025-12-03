"use client"

import { BrutalCard } from "@/components/ui/brutal-card"
import { BrutalButton } from "@/components/ui/brutal-button"
import { CheckCircle, Home, Send, Copy, Check } from "lucide-react"
import { useState } from "react"

interface SuccessScreenProps {
  transactionId: string
  recipientName: string
  receiveAmount: number
  estimatedTime: string
  onSendAnother: () => void
  onGoHome: () => void
}

export function SuccessScreen({
  transactionId,
  recipientName,
  receiveAmount,
  estimatedTime,
  onSendAnother,
  onGoHome,
}: SuccessScreenProps) {
  const [copied, setCopied] = useState(false)

  const formatIDR = (amount: number) => {
    return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transactionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6 text-center">
      <div className="py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-accent border-3 border-foreground brutal-shadow-lg mb-4">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold uppercase mb-2">Transfer Sent!</h1>
        <p className="text-muted-foreground">Your money is on its way to {recipientName}</p>
      </div>

      <BrutalCard variant="primary" className="py-6">
        <p className="text-sm font-bold uppercase opacity-70 mb-1">Amount Sent</p>
        <p className="text-4xl font-bold">{formatIDR(receiveAmount)}</p>
        <p className="text-sm opacity-70 mt-2">Expected arrival: {estimatedTime}</p>
      </BrutalCard>

      <BrutalCard>
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-xs font-bold uppercase text-muted-foreground">Transaction ID</p>
            <p className="font-mono text-sm">{transactionId.slice(0, 20)}...</p>
          </div>
          <button onClick={handleCopy} className="p-2 border-2 border-foreground brutal-shadow-sm brutal-hover">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </BrutalCard>

      <div className="space-y-3">
        <BrutalButton variant="primary" className="w-full" size="lg" onClick={onSendAnother}>
          <Send className="w-5 h-5" />
          Send Another
        </BrutalButton>
        <BrutalButton variant="outline" className="w-full" size="lg" onClick={onGoHome}>
          <Home className="w-5 h-5" />
          Back to Home
        </BrutalButton>
      </div>

      <p className="text-xs text-muted-foreground">{"We'll notify you when the transfer is complete"}</p>
    </div>
  )
}
