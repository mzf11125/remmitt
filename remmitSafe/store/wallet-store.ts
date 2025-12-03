import { create } from "zustand"
import type { WalletBalance, Transaction, Recipient } from "@/lib/types"

interface WalletState {
  balance: WalletBalance
  transactions: Transaction[]
  recipients: Recipient[]
  isLoading: boolean
  setBalance: (balance: WalletBalance) => void
  addTransaction: (tx: Transaction) => void
  setRecipients: (recipients: Recipient[]) => void
  addRecipient: (recipient: Recipient) => void
  removeRecipient: (id: string) => void
}

// Mock data
const mockBalance: WalletBalance = {
  amount: 523.82,
  currency: "USDC",
  fiatEquivalent: 523.82,
  fiatCurrency: "USD",
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "send",
    status: "completed",
    amount: 1000,
    currency: "USD",
    recipientAmount: 15800000,
    recipientCurrency: "IDR",
    exchangeRate: 15800,
    fee: 14,
    recipientName: "Juan Esteban",
    txHash: "0x1234...5678",
    createdAt: new Date("2025-11-25T10:30:00"),
    completedAt: new Date("2025-11-25T11:00:00"),
  },
  {
    id: "2",
    type: "receive",
    status: "completed",
    amount: 500,
    currency: "USD",
    fee: 0,
    txHash: "0xabcd...ef01",
    createdAt: new Date("2025-11-25T09:00:00"),
    completedAt: new Date("2025-11-25T09:05:00"),
  },
  {
    id: "3",
    type: "send",
    status: "confirming",
    amount: 200,
    currency: "USD",
    recipientAmount: 3160000,
    recipientCurrency: "IDR",
    exchangeRate: 15800,
    fee: 2.8,
    recipientName: "Ezequiel Dengra",
    createdAt: new Date("2025-11-25T14:00:00"),
    estimatedTime: "15-60 minutes",
  },
  {
    id: "4",
    type: "send",
    status: "pending",
    amount: 150,
    currency: "USD",
    recipientAmount: 2370000,
    recipientCurrency: "IDR",
    exchangeRate: 15800,
    fee: 2.1,
    recipientName: "Nuria Pelayo",
    createdAt: new Date("2025-11-24T16:30:00"),
    estimatedTime: "15-60 minutes",
  },
]

const mockRecipients: Recipient[] = [
  {
    id: "1",
    name: "Juan Esteban",
    email: "masodaho67@gmail.com",
    bankName: "BCA",
    accountNumber: "1234567890",
    country: "ID",
    lastSent: new Date("2020-11-05"),
  },
  {
    id: "2",
    name: "Ezequiel Dengra",
    email: "masodaho67@gmail.com",
    bankName: "BRI",
    accountNumber: "0987654321",
    country: "ID",
    lastSent: new Date("2020-11-05"),
  },
  {
    id: "3",
    name: "Nuria Pelayo",
    email: "masodaho67@gmail.com",
    bankName: "Mandiri",
    accountNumber: "1122334455",
    country: "ID",
    lastSent: new Date("2020-11-05"),
  },
  {
    id: "4",
    name: "Stephan Mulyono",
    email: "mulyono@gmail.com",
    bankName: "DANA",
    accountNumber: "6677889900",
    country: "ID",
    lastSent: new Date("2020-11-05"),
  },
  {
    id: "5",
    name: "Clifrenton Shenron",
    email: "clif2020@gmail.com",
    bankName: "OVO",
    accountNumber: "5544332211",
    country: "ID",
    lastSent: new Date("2020-11-05"),
  },
  {
    id: "6",
    name: "Stephany Suli",
    email: "stephany5@gmail.com",
    bankName: "GoPay",
    accountNumber: "9988776655",
    country: "ID",
    lastSent: new Date("2020-11-05"),
  },
  {
    id: "7",
    name: "Manda Mulyono",
    email: "mulyonomanda@gmail.com",
    bankName: "BNI",
    accountNumber: "4433221100",
    country: "ID",
    lastSent: new Date("2020-11-05"),
  },
]

export const useWalletStore = create<WalletState>((set) => ({
  balance: mockBalance,
  transactions: mockTransactions,
  recipients: mockRecipients,
  isLoading: false,
  setBalance: (balance) => set({ balance }),
  addTransaction: (tx) => set((state) => ({ transactions: [tx, ...state.transactions] })),
  setRecipients: (recipients) => set({ recipients }),
  addRecipient: (recipient) => set((state) => ({ recipients: [...state.recipients, recipient] })),
  removeRecipient: (id) => set((state) => ({ recipients: state.recipients.filter((r) => r.id !== id) })),
}))
