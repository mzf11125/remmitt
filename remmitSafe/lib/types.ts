// Core types for REMMIT remittance app

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  walletAddress: string
  kycStatus: "pending" | "verified" | "rejected"
  createdAt: Date
}

export interface Recipient {
  id: string
  name: string
  email: string
  phone?: string
  bankName: string
  accountNumber: string
  country: "ID" | "PH"
  lastSent?: Date
}

export interface Transaction {
  id: string
  type: "send" | "receive" | "add_money" | "withdrawal"
  status: "pending" | "confirming" | "completed" | "failed"
  amount: number
  currency: string
  recipientAmount?: number
  recipientCurrency?: string
  exchangeRate?: number
  fee: number
  recipientId?: string
  recipientName?: string
  txHash?: string
  createdAt: Date
  completedAt?: Date
  estimatedTime?: string
}

export interface WalletBalance {
  amount: number
  currency: string
  fiatEquivalent: number
  fiatCurrency: string
}

export interface ExchangeQuote {
  fromAmount: number
  fromCurrency: string
  toAmount: number
  toCurrency: string
  rate: number
  fee: number
  estimatedTime: string
  expiresAt: Date
}

export type TransactionFilter = "all" | "send" | "receive"
export type Country = "ID" | "PH" | "SG" | "AE"
