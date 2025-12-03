// Constants for REMMIT app

export const SUPPORTED_CORRIDORS = {
  from: ["SGD", "AED", "USD"] as const,
  to: ["IDR", "PHP"] as const,
}

export const COUNTRIES = {
  ID: { name: "Indonesia", currency: "IDR", flag: "🇮🇩" },
  PH: { name: "Philippines", currency: "PHP", flag: "🇵🇭" },
  SG: { name: "Singapore", currency: "SGD", flag: "🇸🇬" },
  AE: { name: "UAE", currency: "AED", flag: "🇦🇪" },
} as const

export const INDONESIAN_BANKS = [
  { code: "BCA", name: "Bank Central Asia" },
  { code: "BRI", name: "Bank Rakyat Indonesia" },
  { code: "BNI", name: "Bank Negara Indonesia" },
  { code: "MANDIRI", name: "Bank Mandiri" },
  { code: "CIMB", name: "CIMB Niaga" },
  { code: "DANA", name: "DANA (E-Wallet)" },
  { code: "OVO", name: "OVO (E-Wallet)" },
  { code: "GOPAY", name: "GoPay (E-Wallet)" },
] as const

export const EXCHANGE_RATES = {
  "USD-IDR": 15800,
  "SGD-IDR": 11800,
  "AED-IDR": 4300,
  "USD-PHP": 56.5,
} as const

export const FEE_PERCENTAGE = 0.014 // 1.4% Rampable fee

export const SETTLEMENT_TIMES = {
  eWallet: "1-15 minutes",
  bank: "Instant to 2 hours",
  default: "15 minutes - 1 hour",
} as const
