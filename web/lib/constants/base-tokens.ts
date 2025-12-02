/**
 * Base Network Token Addresses and Configuration
 * Supports both Base Sepolia (testnet) and Base Mainnet
 */

export const BASE_SEPOLIA_CHAIN_ID = 84532
export const BASE_MAINNET_CHAIN_ID = 8453

// Base Sepolia Testnet Tokens
export const BASE_SEPOLIA_TOKENS = {
  USDC: {
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    logo: "/tokens/usdc.svg",
  },
  // Add more testnet tokens as needed
} as const

// Base Mainnet Tokens
export const BASE_MAINNET_TOKENS = {
  USDC: {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    logo: "/tokens/usdc.svg",
  },
  ETH: {
    address: "0x0000000000000000000000000000000000000000", // Native ETH
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    logo: "/tokens/eth.svg",
  },
} as const

// Get tokens based on environment
export const getTokens = () => {
  const isTestnet = process.env.NEXT_PUBLIC_ENABLE_TESTNET === "true"
  return isTestnet ? BASE_SEPOLIA_TOKENS : BASE_MAINNET_TOKENS
}

// Get USDC address based on environment
export const getUSDCAddress = () => {
  const isTestnet = process.env.NEXT_PUBLIC_ENABLE_TESTNET === "true"
  return isTestnet
    ? BASE_SEPOLIA_TOKENS.USDC.address
    : BASE_MAINNET_TOKENS.USDC.address
}

// Get chain ID based on environment
export const getChainId = () => {
  const isTestnet = process.env.NEXT_PUBLIC_ENABLE_TESTNET === "true"
  return isTestnet ? BASE_SEPOLIA_CHAIN_ID : BASE_MAINNET_CHAIN_ID
}

// Token type
export type Token = {
  address: string
  symbol: string
  name: string
  decimals: number
  logo: string
}
