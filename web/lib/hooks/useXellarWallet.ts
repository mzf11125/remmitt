/**
 * Custom hook for Xellar wallet operations
 * Manages wallet balance, transactions, and real-time updates
 */

import { useState, useEffect, useCallback } from "react"
import { xellarService } from "@/services/xellar-service"
import { useAuthStore } from "@/store/auth-store"

interface WalletBalance {
  usdc: number
  usdValue: number
  decimals: number
  tokenAddress: string
  isLoading: boolean
  error: string | null
}

interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  timestamp: number
  status: "pending" | "confirmed" | "failed"
  type: "send" | "receive"
}

export function useXellarWallet() {
  const { isAuthenticated } = useAuthStore()
  const [balance, setBalance] = useState<WalletBalance>({
    usdc: 0,
    usdValue: 0,
    decimals: 6,
    tokenAddress: "",
    isLoading: false,
    error: null,
  })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoadingTxs, setIsLoadingTxs] = useState(false)

  // Fetch wallet balance
  const fetchBalance = useCallback(async () => {
    if (!isAuthenticated) return

    setBalance((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const balanceData = await xellarService.getBalance()
      
      setBalance({
        usdc: balanceData.usdc,
        usdValue: balanceData.usdValue,
        decimals: balanceData.decimals,
        tokenAddress: balanceData.tokenAddress,
        isLoading: false,
        error: null,
      })
    } catch (error: any) {
      console.error("Failed to fetch balance:", error)
      setBalance((prev) => ({
        ...prev,
        isLoading: false,
        error: error?.message || "Failed to fetch balance",
      }))
    }
  }, [isAuthenticated])

  // Fetch transaction history
  const fetchTransactions = useCallback(async (limit: number = 20) => {
    if (!isAuthenticated) return

    setIsLoadingTxs(true)

    try {
      const txHistory = await xellarService.getTransactionHistory(limit)
      
      // Transform to our format
      const formattedTxs: Transaction[] = txHistory.map((tx: any) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        timestamp: tx.timestamp,
        status: tx.status || "confirmed",
        type: tx.type || "send",
      }))

      setTransactions(formattedTxs)
    } catch (error) {
      console.error("Failed to fetch transactions:", error)
    } finally {
      setIsLoadingTxs(false)
    }
  }, [isAuthenticated])

  // Refresh both balance and transactions
  const refresh = useCallback(async () => {
    await Promise.all([fetchBalance(), fetchTransactions()])
  }, [fetchBalance, fetchTransactions])

  // Auto-fetch on mount and when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchBalance()
      fetchTransactions()
    }
  }, [isAuthenticated, fetchBalance, fetchTransactions])

  // Poll balance every 30 seconds
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(() => {
      fetchBalance()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [isAuthenticated, fetchBalance])

  return {
    balance,
    transactions,
    isLoadingTxs,
    fetchBalance,
    fetchTransactions,
    refresh,
  }
}
