import { create } from "zustand"

export interface Balance {
  token: string
  symbol: string
  amount: number
  usdValue: number
  network: string
}

export interface Transaction {
  id: string
  type: "send" | "receive" | "onramp" | "offramp"
  status: "pending" | "processing" | "completed" | "failed"
  amount: number
  currency: string
  fiatAmount: number
  fiatCurrency: string
  recipientName?: string
  recipientBank?: string
  recipientAccount?: string
  createdAt: string
  completedAt?: string
  fee: number
  exchangeRate: number
  txHash?: string
}

interface WalletState {
  balances: Balance[]
  transactions: Transaction[]
  isLoading: boolean
  totalUsdBalance: number

  // Actions
  setBalances: (balances: Balance[]) => void
  setTransactions: (transactions: Transaction[]) => void
  addTransaction: (transaction: Transaction) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  setLoading: (loading: boolean) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  balances: [],
  transactions: [],
  isLoading: false,
  totalUsdBalance: 0,

  setBalances: (balances) =>
    set({
      balances,
      totalUsdBalance: balances.reduce((sum, b) => sum + b.usdValue, 0),
    }),

  setTransactions: (transactions) => set({ transactions }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  updateTransaction: (id, updates) =>
    set((state) => ({
      transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  setLoading: (isLoading) => set({ isLoading }),
}))
