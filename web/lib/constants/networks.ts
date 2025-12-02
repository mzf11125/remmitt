/**
 * Network Configuration for Base Blockchain
 * Supports Base Sepolia (testnet) and Base Mainnet
 */

export type Network = {
  id: number
  name: string
  displayName: string
  rpcUrl: string
  explorerUrl: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  testnet: boolean
}

export const BASE_SEPOLIA: Network = {
  id: 84532,
  name: "base-sepolia",
  displayName: "Base Sepolia",
  rpcUrl: "https://sepolia.base.org",
  explorerUrl: "https://sepolia.basescan.org",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  testnet: true,
}

export const BASE_MAINNET: Network = {
  id: 8453,
  name: "base",
  displayName: "Base",
  rpcUrl: "https://mainnet.base.org",
  explorerUrl: "https://basescan.org",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  testnet: false,
}

export const SUPPORTED_NETWORKS = [BASE_SEPOLIA, BASE_MAINNET] as const

// Get current network based on environment
export const getCurrentNetwork = (): Network => {
  const isTestnet = process.env.NEXT_PUBLIC_ENABLE_TESTNET === "true"
  return isTestnet ? BASE_SEPOLIA : BASE_MAINNET
}

// Get network by chain ID
export const getNetworkById = (chainId: number): Network | undefined => {
  return SUPPORTED_NETWORKS.find((network) => network.id === chainId)
}

// Format explorer URL for transaction
export const getTransactionUrl = (txHash: string, chainId?: number): string => {
  const network = chainId ? getNetworkById(chainId) : getCurrentNetwork()
  return `${network?.explorerUrl}/tx/${txHash}`
}

// Format explorer URL for address
export const getAddressUrl = (address: string, chainId?: number): string => {
  const network = chainId ? getNetworkById(chainId) : getCurrentNetwork()
  return `${network?.explorerUrl}/address/${address}`
}

// Format explorer URL for token
export const getTokenUrl = (tokenAddress: string, chainId?: number): string => {
  const network = chainId ? getNetworkById(chainId) : getCurrentNetwork()
  return `${network?.explorerUrl}/token/${tokenAddress}`
}
