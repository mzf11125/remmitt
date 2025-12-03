"use client"
import { useState, useEffect } from "react"
import { BrutalCard } from "@/components/ui/brutal-card"
import { ArrowDownUp, Loader2 } from "lucide-react"
import { xellarService } from "@/services/xellar-service"

interface AmountInputProps {
  maxAmount: number
  onAmountChange: (amount: number, quote: QuoteData | null) => void
}

interface QuoteData {
  sendAmount: number
  receiveAmount: number
  exchangeRate: number
  fee: number
  estimatedTime: string
}

export function AmountInput({ maxAmount, onAmountChange }: AmountInputProps) {
  const [sendAmount, setSendAmount] = useState<string>("")
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [isLoadingQuote, setIsLoadingQuote] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const amount = Number.parseFloat(sendAmount) || 0

    if (amount <= 0) {
      setQuote(null)
      onAmountChange(0, null)
      return
    }

    if (amount > maxAmount) {
      setError("Insufficient balance")
      setQuote(null)
      onAmountChange(0, null)
      return
    }

    setError("")
    const timeoutId = setTimeout(async () => {
      setIsLoadingQuote(true)
      try {
        const quoteResponse = await xellarService.getQuote(amount, "USDC", "IDR")
        const quoteData: QuoteData = {
          sendAmount: quoteResponse.sendAmount,
          receiveAmount: quoteResponse.receiveAmount,
          exchangeRate: quoteResponse.exchangeRate,
          fee: quoteResponse.fee,
          estimatedTime: quoteResponse.estimatedTime,
        }
        setQuote(quoteData)
        onAmountChange(amount, quoteData)
      } catch (err) {
        setError("Failed to get quote")
      } finally {
        setIsLoadingQuote(false)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [sendAmount, maxAmount, onAmountChange])

  const formatIDR = (amount: number) => {
    return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`
  }

  const quickAmounts = [50, 100, 200, 500]

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold uppercase tracking-wide mb-2">You Send</label>
        <BrutalCard className="p-0 overflow-hidden">
          <div className="flex items-center">
            <div className="flex-1 p-4">
              <input
                type="number"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                placeholder="0.00"
                className="w-full text-3xl font-bold bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="px-4 py-3 bg-primary border-l-3 border-foreground">
              <span className="font-bold">USD</span>
            </div>
          </div>
        </BrutalCard>
        {error && <p className="mt-1 text-sm text-destructive font-medium">{error}</p>}
        <p className="mt-1 text-xs text-muted-foreground">Available: ${maxAmount.toFixed(2)}</p>
      </div>

      <div className="flex gap-2">
        {quickAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => setSendAmount(amount.toString())}
            className="flex-1 py-2 border-2 border-foreground bg-card text-sm font-bold brutal-shadow-sm brutal-hover brutal-active"
          >
            ${amount}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="w-10 h-10 border-3 border-foreground bg-primary flex items-center justify-center brutal-shadow">
          {isLoadingQuote ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowDownUp className="w-5 h-5" />}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold uppercase tracking-wide mb-2">They Receive</label>
        <BrutalCard className="p-0 overflow-hidden">
          <div className="flex items-center">
            <div className="flex-1 p-4">
              <p className="text-3xl font-bold">{quote ? formatIDR(quote.receiveAmount) : "Rp 0"}</p>
            </div>
            <div className="px-4 py-3 bg-accent border-l-3 border-foreground">
              <span className="font-bold">IDR</span>
            </div>
          </div>
        </BrutalCard>
      </div>

      {quote && (
        <BrutalCard className="bg-muted p-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Exchange Rate</span>
              <span className="font-bold">1 USD = {quote.exchangeRate.toLocaleString()} IDR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fee</span>
              <span className="font-bold">${quote.fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Time</span>
              <span className="font-bold">{quote.estimatedTime}</span>
            </div>
          </div>
        </BrutalCard>
      )}
    </div>
  )
}
