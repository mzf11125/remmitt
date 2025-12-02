// Xellar SDK Service - Mock implementation for demo
// In production, replace with actual @xellar/sdk integration

const MOCK_DELAY = 800

interface XellarAuthResponse {
  token: string
  walletAddress: string
  userId: string
}

interface QuoteResponse {
  sendAmount: number
  sendCurrency: string
  receiveAmount: number
  receiveCurrency: string
  exchangeRate: number
  fee: number
  totalCost: number
  estimatedTime: string
}

interface OfframpResponse {
  transactionId: string
  status: "pending" | "processing" | "completed"
  txHash?: string
}

// Simulated exchange rates
const EXCHANGE_RATES: Record<string, number> = {
  USD_IDR: 15800,
  SGD_IDR: 11700,
  AED_IDR: 4300,
  USDC_IDR: 15800,
}

// Indonesian banks
export const INDONESIAN_BANKS = [
  { code: "BCA", name: "Bank Central Asia (BCA)" },
  { code: "BRI", name: "Bank Rakyat Indonesia (BRI)" },
  { code: "BNI", name: "Bank Negara Indonesia (BNI)" },
  { code: "MANDIRI", name: "Bank Mandiri" },
  { code: "CIMB", name: "CIMB Niaga" },
  { code: "PERMATA", name: "Bank Permata" },
  { code: "DANA", name: "DANA (E-Wallet)" },
  { code: "OVO", name: "OVO (E-Wallet)" },
  { code: "GOPAY", name: "GoPay (E-Wallet)" },
]

class XellarService {
  private token: string | null = null

  // Authentication
  async sendOTP(email: string): Promise<{ success: boolean; message: string }> {
    await this.delay()
    // In production: Call Xellar's auth.sendOTP()
    console.log("[v0] Sending OTP to:", email)
    return { success: true, message: "OTP sent successfully" }
  }

  async verifyOTP(email: string, otp: string): Promise<XellarAuthResponse> {
    await this.delay()
    // In production: Call Xellar's auth.verifyOTP()
    if (otp.length !== 6) {
      throw new Error("Invalid OTP")
    }

    const mockResponse: XellarAuthResponse = {
      token: `xellar_token_${Date.now()}`,
      walletAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
      userId: `user_${Date.now()}`,
    }

    this.token = mockResponse.token
    return mockResponse
  }

  async loginWithGoogle(): Promise<XellarAuthResponse> {
    await this.delay()
    // In production: Call Xellar's auth.loginWithGoogle()
    const mockResponse: XellarAuthResponse = {
      token: `xellar_token_${Date.now()}`,
      walletAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
      userId: `user_${Date.now()}`,
    }

    this.token = mockResponse.token
    return mockResponse
  }

  // Wallet Operations
  async getBalance(): Promise<{ usdc: number; usdValue: number }> {
    await this.delay()
    // In production: Call Xellar's wallet.checkBalanceToken()
    const mockBalance = {
      usdc: 523.45,
      usdValue: 523.45,
    }
    return mockBalance
  }

  // Offramp Operations
  async getQuote(amount: number, fromCurrency: string, toCurrency: string): Promise<QuoteResponse> {
    await this.delay(300)

    const rateKey = `${fromCurrency}_${toCurrency}`
    const rate = EXCHANGE_RATES[rateKey] || 15800
    const fee = amount * 0.014 // 1.4% fee
    const receiveAmount = (amount - fee) * rate

    return {
      sendAmount: amount,
      sendCurrency: fromCurrency,
      receiveAmount: Math.round(receiveAmount),
      receiveCurrency: toCurrency,
      exchangeRate: rate,
      fee,
      totalCost: amount,
      estimatedTime: toCurrency === "IDR" ? "15-60 minutes" : "1-24 hours",
    }
  }

  async createOfframp(params: {
    amount: number
    recipientId: string
    bankCode: string
    accountNumber: string
  }): Promise<OfframpResponse> {
    await this.delay(1500)

    // In production: Call Xellar's offRamp.create()
    return {
      transactionId: `txn_${Date.now()}`,
      status: "processing",
      txHash: `0x${Math.random().toString(16).slice(2, 66)}`,
    }
  }

  // Rampable Receiver Management
  async createReceiver(data: {
    name: string
    bankCode: string
    accountNumber: string
    phone?: string
    email?: string
  }): Promise<{ receiverId: string }> {
    await this.delay()
    return { receiverId: `recv_${Date.now()}` }
  }

  async updateReceiver(
    receiverId: string,
    data: Partial<{
      name: string
      bankCode: string
      accountNumber: string
      phone?: string
      email?: string
    }>,
  ): Promise<{ success: boolean }> {
    await this.delay()
    return { success: true }
  }

  async deleteReceiver(receiverId: string): Promise<{ success: boolean }> {
    await this.delay()
    return { success: true }
  }

  // Utility
  private delay(ms: number = MOCK_DELAY): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export const xellarService = new XellarService()
