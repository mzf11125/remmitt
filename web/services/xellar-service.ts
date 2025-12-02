/**
 * Xellar SDK Service - Real implementation using @xellar/sdk
 * Provides authentication, wallet management, and offramp services for Base Sepolia
 */

import { getXellarClient, features } from "@/config/xellar.config"
import { getUSDCAddress, getChainId } from "@/lib/constants/base-tokens"
import { getCurrentNetwork } from "@/lib/constants/networks"

// Type definitions
interface XellarAuthResponse {
  token: string
  refreshToken?: string
  walletAddress: string
  userId: string
  expiresIn?: number
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
  quoteId?: string
  expiresAt?: number
}

interface OfframpResponse {
  transactionId: string
  status: "pending" | "processing" | "completed" | "failed"
  txHash?: string
  receiverName?: string
  receiverAccount?: string
}

interface BalanceResponse {
  usdc: number
  usdValue: number
  decimals: number
  tokenAddress: string
}

// Indonesian banks - expanded list
export const INDONESIAN_BANKS = [
  { code: "BCA", name: "Bank Central Asia (BCA)", type: "bank" },
  { code: "BRI", name: "Bank Rakyat Indonesia (BRI)", type: "bank" },
  { code: "BNI", name: "Bank Negara Indonesia (BNI)", type: "bank" },
  { code: "MANDIRI", name: "Bank Mandiri", type: "bank" },
  { code: "CIMB", name: "CIMB Niaga", type: "bank" },
  { code: "PERMATA", name: "Bank Permata", type: "bank" },
  { code: "BTN", name: "Bank Tabungan Negara (BTN)", type: "bank" },
  { code: "DANAMON", name: "Bank Danamon", type: "bank" },
  { code: "BII", name: "Bank Maybank Indonesia", type: "bank" },
  { code: "PANIN", name: "Bank Panin", type: "bank" },
  { code: "DANA", name: "DANA", type: "ewallet" },
  { code: "OVO", name: "OVO", type: "ewallet" },
  { code: "GOPAY", name: "GoPay", type: "ewallet" },
  { code: "SHOPEEPAY", name: "ShopeePay", type: "ewallet" },
  { code: "LINKAJA", name: "LinkAja", type: "ewallet" },
] as const

class XellarService {
  private client = getXellarClient()
  private sessionToken: string | null = null
  private refreshToken: string | null = null

  /**
   * Authentication Methods
   */

  // Send OTP to email for login/signup
  async sendOTP(email: string): Promise<{ success: boolean; message: string; verificationToken?: string }> {
    try {
      const verificationToken = await this.client.auth.email.login(email)

      return {
        success: true,
        message: "OTP sent successfully to your email",
        verificationToken,
      }
    } catch (error: any) {
      console.error("[Xellar] Send OTP error:", error)
      throw new Error(error?.message || "Failed to send OTP. Please try again.")
    }
  }

  // Verify OTP and create/login to Embedded Wallet
  async verifyOTP(email: string, otp: string, verificationToken: string): Promise<XellarAuthResponse> {
    try {
      // Verify OTP and authenticate
      const authResponse = await this.client.auth.email.verify(verificationToken, otp, {
        chainId: getChainId(),
      })

      // Debug: Log the response structure to understand the SDK format
      console.log("[Xellar] Auth response:", JSON.stringify(authResponse, null, 2))

      // Store tokens
      this.sessionToken = authResponse.accessToken
      this.refreshToken = authResponse.refreshToken

      // Handle different response structures for Embedded Wallet
      const walletAddress = authResponse.account?.address ||
                          authResponse.address ||
                          authResponse.walletAddress ||
                          ""

      if (!walletAddress) {
        throw new Error("No wallet address found in authentication response")
      }

      return {
        token: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
        walletAddress,
        userId: authResponse.userId || `user_${Date.now()}`,
        expiresIn: authResponse.expiredDate
          ? Math.floor((new Date(authResponse.expiredDate).getTime() - Date.now()) / 1000)
          : 3600,
      }
    } catch (error: any) {
      console.error("[Xellar] Verify OTP error:", error)
      throw new Error(
        error?.message || "Invalid OTP code. Please check and try again."
      )
    }
  }

  // Google OAuth login
  async loginWithGoogle(credential: string, expiredDate?: string): Promise<XellarAuthResponse> {
    try {
      // Use Google credential to authenticate
      const authResponse = await this.client.auth.google.authorize(credential, expiredDate, {
        chainId: getChainId(),
      })

      // Debug: Log the response structure to understand the SDK format
      console.log("[Xellar] Google auth response:", JSON.stringify(authResponse, null, 2))

      // Store tokens
      this.sessionToken = authResponse.accessToken
      this.refreshToken = authResponse.refreshToken

      // Handle different response structures for Embedded Wallet
      const walletAddress = authResponse.account?.address ||
                          authResponse.address ||
                          authResponse.walletAddress ||
                          ""

      if (!walletAddress) {
        throw new Error("No wallet address found in Google authentication response")
      }

      return {
        token: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
        walletAddress,
        userId: authResponse.userId || `user_${Date.now()}`,
        expiresIn: authResponse.expiredDate
          ? Math.floor((new Date(authResponse.expiredDate).getTime() - Date.now()) / 1000)
          : 3600,
      }
    } catch (error: any) {
      console.error("[Xellar] Google login error:", error)
      throw new Error(
        error?.message || "Google login failed. Please try again."
      )
    }
  }

  // Refresh access token
  async refreshAccessToken(refreshToken: string): Promise<{ token: string; expiresIn: number }> {
    try {
      // Note: The SDK might not have a direct refresh method
      // You may need to implement this based on Xellar's documentation
      // For now, we'll throw an error to prompt re-login
      throw new Error("Token refresh not implemented. Please login again.")
    } catch (error: any) {
      console.error("[Xellar] Refresh token error:", error)
      throw new Error("Session expired. Please login again.")
    }
  }

  /**
   * Wallet Operations
   */

  // Get USDC balance on Base Sepolia
  async getBalance(): Promise<BalanceResponse> {
    try {
      const usdcAddress = getUSDCAddress()
      const chainId = getChainId()

      const balance = await this.client.wallet.getBalance({
        tokenAddress: usdcAddress,
        chainId: chainId,
      })

      // USDC has 6 decimals
      const usdcBalance = Number(balance.balance) / 1e6

      return {
        usdc: usdcBalance,
        usdValue: usdcBalance, // 1 USDC = 1 USD
        decimals: 6,
        tokenAddress: usdcAddress,
      }
    } catch (error: any) {
      console.error("[Xellar] Get balance error:", error)
      
      // Return zero balance on error instead of throwing
      return {
        usdc: 0,
        usdValue: 0,
        decimals: 6,
        tokenAddress: getUSDCAddress(),
      }
    }
  }

  // Get transaction history
  async getTransactionHistory(limit: number = 20): Promise<any[]> {
    try {
      const chainId = getChainId()
      
      const history = await this.client.wallet.getTransactionHistory({
        chainId,
        limit,
      })

      return history.transactions || []
    } catch (error: any) {
      console.error("[Xellar] Get transaction history error:", error)
      return []
    }
  }

  /**
   * Offramp Operations (USDC → IDR to Indonesian banks)
   */

  // Get real-time quote for USDC → IDR conversion
  async getQuote(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<QuoteResponse> {
    try {
      const quote = await this.client.offramp.getQuote({
        sourceAmount: amount,
        sourceCurrency: fromCurrency,
        destinationCurrency: toCurrency,
        destinationCountry: "ID", // Indonesia
        chainId: getChainId(),
      })

      return {
        sendAmount: amount,
        sendCurrency: fromCurrency,
        receiveAmount: Number(quote.destinationAmount),
        receiveCurrency: toCurrency,
        exchangeRate: Number(quote.exchangeRate),
        fee: Number(quote.fee),
        totalCost: amount,
        estimatedTime: quote.estimatedTime || "15-60 minutes",
        quoteId: quote.quoteId,
        expiresAt: quote.expiresAt,
      }
    } catch (error: any) {
      console.error("[Xellar] Get quote error:", error)
      throw new Error(
        error?.message || "Failed to get exchange rate. Please try again."
      )
    }
  }

  // Create offramp transaction (send USDC, receive IDR in bank)
  async createOfframp(params: {
    amount: number
    recipientId: string
    bankCode: string
    accountNumber: string
    quoteId?: string
  }): Promise<OfframpResponse> {
    try {
      const usdcAddress = getUSDCAddress()
      const chainId = getChainId()

      const offrampTx = await this.client.offramp.create({
        sourceAmount: params.amount,
        sourceCurrency: "USDC",
        sourceTokenAddress: usdcAddress,
        destinationCurrency: "IDR",
        destinationCountry: "ID",
        receiverId: params.recipientId,
        chainId: chainId,
        quoteId: params.quoteId,
        // Enable gasless if configured
        gasless: features.enableGasless,
      })

      return {
        transactionId: offrampTx.transactionId,
        status: offrampTx.status as any,
        txHash: offrampTx.txHash,
        receiverName: offrampTx.receiverName,
        receiverAccount: offrampTx.receiverAccount,
      }
    } catch (error: any) {
      console.error("[Xellar] Create offramp error:", error)
      throw new Error(
        error?.message || "Failed to process transaction. Please try again."
      )
    }
  }

  // Get offramp transaction status
  async getOfframpStatus(transactionId: string): Promise<OfframpResponse> {
    try {
      const status = await this.client.offramp.getStatus({
        transactionId,
      })

      return {
        transactionId: status.transactionId,
        status: status.status as any,
        txHash: status.txHash,
        receiverName: status.receiverName,
        receiverAccount: status.receiverAccount,
      }
    } catch (error: any) {
      console.error("[Xellar] Get offramp status error:", error)
      throw new Error("Failed to get transaction status.")
    }
  }

  /**
   * Rampable Receiver Management (Indonesian Bank Accounts)
   */

  // Create a new recipient
  async createReceiver(data: {
    name: string
    bankCode: string
    accountNumber: string
    phone?: string
    email?: string
  }): Promise<{ receiverId: string }> {
    try {
      const receiver = await this.client.rampable.createReceiver({
        name: data.name,
        bankCode: data.bankCode,
        accountNumber: data.accountNumber,
        country: "ID",
        currency: "IDR",
        phone: data.phone,
        email: data.email,
      })

      return {
        receiverId: receiver.receiverId,
      }
    } catch (error: any) {
      console.error("[Xellar] Create receiver error:", error)
      throw new Error(
        error?.message || "Failed to add recipient. Please check details and try again."
      )
    }
  }

  // Update existing recipient
  async updateReceiver(
    receiverId: string,
    data: Partial<{
      name: string
      bankCode: string
      accountNumber: string
      phone?: string
      email?: string
    }>
  ): Promise<{ success: boolean }> {
    try {
      await this.client.rampable.updateReceiver({
        receiverId,
        ...data,
      })

      return { success: true }
    } catch (error: any) {
      console.error("[Xellar] Update receiver error:", error)
      throw new Error(
        error?.message || "Failed to update recipient."
      )
    }
  }

  // Delete recipient
  async deleteReceiver(receiverId: string): Promise<{ success: boolean }> {
    try {
      await this.client.rampable.deleteReceiver({
        receiverId,
      })

      return { success: true }
    } catch (error: any) {
      console.error("[Xellar] Delete receiver error:", error)
      throw new Error(
        error?.message || "Failed to delete recipient."
      )
    }
  }

  // Validate bank account
  async validateBankAccount(bankCode: string, accountNumber: string): Promise<{
    valid: boolean
    accountName?: string
  }> {
    try {
      const validation = await this.client.rampable.validateBankAccount({
        bankCode,
        accountNumber,
        country: "ID",
      })

      return {
        valid: validation.valid,
        accountName: validation.accountName,
      }
    } catch (error: any) {
      console.error("[Xellar] Validate bank account error:", error)
      return { valid: false }
    }
  }

  /**
   * Onramp Operations (Buy USDC with IDR)
   */

  // Create onramp transaction (buy USDC with IDR via Indonesian payment methods)
  async createOnramp(params: {
    amount: number
    currency: string
    paymentMethod: "virtual_account" | "bank_transfer" | "ewallet"
  }): Promise<{
    orderId: string
    paymentUrl?: string
    virtualAccountNumber?: string
    instructions?: string
  }> {
    try {
      const onramp = await this.client.onramp.create({
        destinationAmount: params.amount,
        destinationCurrency: "USDC",
        sourceCurrency: params.currency,
        sourceCountry: "ID",
        paymentMethod: params.paymentMethod,
        chainId: getChainId(),
      })

      return {
        orderId: onramp.orderId,
        paymentUrl: onramp.paymentUrl,
        virtualAccountNumber: onramp.virtualAccountNumber,
        instructions: onramp.instructions,
      }
    } catch (error: any) {
      console.error("[Xellar] Create onramp error:", error)
      throw new Error(
        error?.message || "Failed to create payment. Please try again."
      )
    }
  }

  /**
   * KYC Operations
   */

  // Submit KYC information
  async submitKYC(data: {
    fullName: string
    dateOfBirth: string
    nationality: string
    idNumber: string
    idType: "ktp" | "passport"
    address: string
    city: string
    postalCode: string
    idPhoto: File
    selfiePhoto: File
  }): Promise<{ kycId: string; status: string }> {
    try {
      const formData = new FormData()
      formData.append("fullName", data.fullName)
      formData.append("dateOfBirth", data.dateOfBirth)
      formData.append("nationality", data.nationality)
      formData.append("idNumber", data.idNumber)
      formData.append("idType", data.idType)
      formData.append("address", data.address)
      formData.append("city", data.city)
      formData.append("postalCode", data.postalCode)
      formData.append("idPhoto", data.idPhoto)
      formData.append("selfiePhoto", data.selfiePhoto)

      const kyc = await this.client.kyc.submit(formData)

      return {
        kycId: kyc.kycId,
        status: kyc.status,
      }
    } catch (error: any) {
      console.error("[Xellar] Submit KYC error:", error)
      throw new Error(
        error?.message || "Failed to submit KYC. Please try again."
      )
    }
  }

  // Get KYC status
  async getKYCStatus(): Promise<{
    status: "none" | "pending" | "approved" | "rejected"
    kycId?: string
    rejectionReason?: string
  }> {
    try {
      const kyc = await this.client.kyc.getStatus()

      return {
        status: kyc.status as any,
        kycId: kyc.kycId,
        rejectionReason: kyc.rejectionReason,
      }
    } catch (error: any) {
      console.error("[Xellar] Get KYC status error:", error)
      return { status: "none" }
    }
  }

  /**
   * Utility Methods
   */

  // Set authorization token for authenticated requests
  setAuthToken(token: string, refreshToken?: string) {
    this.sessionToken = token
    this.refreshToken = refreshToken
    this.client.setAuthToken(token)
  }

  // Clear auth session
  clearSession() {
    this.sessionToken = null
    this.refreshToken = null
  }

  // Get current network info
  getNetworkInfo() {
    return getCurrentNetwork()
  }
}

export const xellarService = new XellarService()
