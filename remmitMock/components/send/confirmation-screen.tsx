"use client"

import { BrutalCard } from "@/components/ui/brutal-card"
import { BrutalButton } from "@/components/ui/brutal-button"
import { ArrowRight, Shield, Clock } from "lucide-react"
import type { Recipient } from "@/store/recipient-store"
import { INDONESIAN_BANKS } from "@/services/xellar-service"

interface ConfirmationScreenProps {
  recipient: Recipient
  sendAmount: number
  receiveAmount: number
  exchangeRate: number
  fee: number
  estimatedTime: string
  onConfirm: () => void
  onBack: () => void
  isLoading?: boolean
}

export function ConfirmationScreen({
  recipient,
  sendAmount,
  receiveAmount,
  exchangeRate,
  fee,
  estimatedTime,
  onConfirm,
  onBack,
  isLoading,
}: ConfirmationScreenProps) {
  const getBankName = (code: string) => {
    const bank = INDONESIAN_BANKS.find((b) => b.code === code)
    return bank?.name || code
  }

  const formatIDR = (amount: number) => {
    return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary border-3 border-foreground brutal-shadow mb-4">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold uppercase">Confirm Transfer</h2>
        <p className="text-muted-foreground text-sm">Please review the details below</p>
      </div>

      <BrutalCard variant="primary" className="text-center py-6">
        <p className="text-sm font-bold uppercase opacity-70 mb-1">They Receive</p>
        <p className="text-4xl font-bold">{formatIDR(receiveAmount)}</p>
      </BrutalCard>

      <BrutalCard>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Recipient</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-foreground bg-accent flex items-center justify-center">
                <span className="font-bold">{recipient.name.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="font-bold">{recipient.name}</p>
                <p className="text-sm text-muted-foreground">
                  {getBankName(recipient.bankCode)} • ••••{recipient.accountNumber.slice(-4)}
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">You Send</span>
              <span className="font-bold">${sendAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Exchange Rate</span>
              <span className="font-bold">1 USD = {exchangeRate.toLocaleString()} IDR</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fee</span>
              <span className="font-bold">${fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Cost</span>
              <span className="font-bold">${sendAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Estimated arrival:</span>
            <span className="font-bold">{estimatedTime}</span>
          </div>
        </div>
      </BrutalCard>

      <div className="flex gap-3">
        <BrutalButton variant="outline" className="flex-1" onClick={onBack} disabled={isLoading}>
          Back
        </BrutalButton>
        <BrutalButton variant="primary" className="flex-1" onClick={onConfirm} isLoading={isLoading}>
          Send Now
          <ArrowRight className="w-5 h-5" />
        </BrutalButton>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        By confirming, you agree to our terms and authorize this transfer
      </p>
    </div>
  )
}
