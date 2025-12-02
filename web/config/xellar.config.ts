/**
 * Xellar SDK Configuration
 * Initializes the Xellar client with sandbox credentials for Base Sepolia testnet
 */

import { XellarSDK } from "@xellar/sdk"
import { getCurrentNetwork } from "@/lib/constants/networks"
import { getChainId } from "@/lib/constants/base-tokens"

// Xellar SDK configuration
export const xellarConfig = {
  projectId: process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID || "",
  clientSecret: process.env.NEXT_PUBLIC_XELLAR_CLIENT_SECRET || "",
  environment: (process.env.NEXT_PUBLIC_XELLAR_ENVIRONMENT ||
    "sandbox") as "sandbox" | "production",
}

// Google OAuth configuration
export const googleOAuthConfig = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
  redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "http://localhost:3000/auth/google/callback",
}

// Initialize Xellar client
let xellarClient: XellarSDK | null = null

export const getXellarClient = (): XellarSDK => {
  // Return existing client if already initialized
  if (xellarClient) {
    return xellarClient
  }

  // Check if required environment variables are available
  if (!xellarConfig.projectId || !xellarConfig.clientSecret) {
    throw new Error("Xellar SDK configuration missing. Please check environment variables.")
  }

  // Initialize with Embedded Wallet (not MPC-TSS as it's not available yet)
  xellarClient = new XellarSDK({
    clientSecret: xellarConfig.clientSecret,
    env: xellarConfig.environment,
    appId: xellarConfig.projectId,
  })

  return xellarClient
}

// Feature flags
export const features = {
  enableTestnet: process.env.NEXT_PUBLIC_ENABLE_TESTNET === "true",
  enableKYC: process.env.NEXT_PUBLIC_ENABLE_KYC === "true",
  enableGasless: process.env.NEXT_PUBLIC_ENABLE_GASLESS === "true",
  enableGoogleAuth: !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
}

// Export network info for convenience
export const networkInfo = {
  chainId: getChainId(),
  network: getCurrentNetwork(),
  explorerUrl: process.env.NEXT_PUBLIC_EXPLORER_URL || "",
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || "",
}

// Account Abstraction (Gasless) Configuration
export const gaslessConfig = {
  enabled: features.enableGasless,
  // Add your gas tank address from Xellar dashboard if needed
  // gasTankAddress: process.env.NEXT_PUBLIC_GAS_TANK_ADDRESS,
}

export default xellarClient
