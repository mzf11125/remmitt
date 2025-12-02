"use client"

import type React from "react"

import { useState } from "react"
import { BrutalInput } from "@/components/ui/brutal-input"
import { BrutalButton } from "@/components/ui/brutal-button"
import { BrutalCard } from "@/components/ui/brutal-card"
import { User, Building2, CreditCard, Phone, ChevronDown, Check } from "lucide-react"
import { INDONESIAN_BANKS } from "@/services/xellar-service"
import type { Recipient } from "@/store/recipient-store"

interface AddRecipientFormProps {
  onAdd: (recipient: Omit<Recipient, "id" | "createdAt">) => void
  onCancel: () => void
}

export function AddRecipientForm({ onAdd, onCancel }: AddRecipientFormProps) {
  const [name, setName] = useState("")
  const [nickname, setNickname] = useState("")
  const [phone, setPhone] = useState("")
  const [bankCode, setBankCode] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [showBankPicker, setShowBankPicker] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectedBank = INDONESIAN_BANKS.find((b) => b.code === bankCode)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = "Name is required"
    if (!bankCode) newErrors.bank = "Please select a bank"
    if (!accountNumber.trim()) newErrors.account = "Account number is required"
    if (accountNumber.length < 8) newErrors.account = "Account number too short"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    const isEwallet = ["DANA", "OVO", "GOPAY"].includes(bankCode)

    onAdd({
      name: name.trim(),
      nickname: nickname.trim() || undefined,
      phone: phone.trim() || undefined,
      bankName: selectedBank?.name || bankCode,
      bankCode,
      accountNumber: accountNumber.trim(),
      accountType: isEwallet ? "ewallet" : "bank",
      country: "ID",
      currency: "IDR",
      isFavorite: false,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BrutalInput
        label="Full Name"
        placeholder="Recipient's full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        icon={<User className="w-5 h-5" />}
        error={errors.name}
      />

      <BrutalInput
        label="Nickname (Optional)"
        placeholder="e.g. Mom, Brother"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <BrutalInput
        label="Phone Number (Optional)"
        placeholder="+62 812 3456 7890"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        icon={<Phone className="w-5 h-5" />}
      />

      <div>
        <label className="block text-sm font-bold uppercase tracking-wide mb-2">Bank / E-Wallet</label>
        <button
          type="button"
          onClick={() => setShowBankPicker(!showBankPicker)}
          className="w-full flex items-center justify-between px-4 py-3 bg-card border-3 border-foreground brutal-shadow text-left"
        >
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-muted-foreground" />
            <span className={selectedBank ? "font-medium" : "text-muted-foreground"}>
              {selectedBank?.name || "Select bank or e-wallet"}
            </span>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform ${showBankPicker ? "rotate-180" : ""}`} />
        </button>
        {errors.bank && <p className="mt-1 text-sm text-destructive font-medium">{errors.bank}</p>}

        {showBankPicker && (
          <BrutalCard className="mt-2 max-h-64 overflow-y-auto p-0">
            {INDONESIAN_BANKS.map((bank) => (
              <button
                key={bank.code}
                type="button"
                onClick={() => {
                  setBankCode(bank.code)
                  setShowBankPicker(false)
                }}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted border-b border-border last:border-b-0"
              >
                <span className="font-medium">{bank.name}</span>
                {bankCode === bank.code && <Check className="w-5 h-5 text-accent" />}
              </button>
            ))}
          </BrutalCard>
        )}
      </div>

      <BrutalInput
        label="Account Number"
        placeholder="Enter account number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
        icon={<CreditCard className="w-5 h-5" />}
        error={errors.account}
      />

      <div className="flex gap-3 pt-2">
        <BrutalButton type="button" variant="outline" className="flex-1" onClick={onCancel}>
          Cancel
        </BrutalButton>
        <BrutalButton type="submit" variant="primary" className="flex-1">
          Add Recipient
        </BrutalButton>
      </div>
    </form>
  )
}
