import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/lib/types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  login: (email: string) => Promise<void>
  logout: () => void
}

// Mock user for demo
const mockUser: User = {
  id: "1",
  email: "syalomita@gmail.com",
  name: "Syalomita Lim",
  phone: "+65 9123 4567",
  avatar: "/professional-asian-woman.png",
  walletAddress: "0x1aE0EA34a72D944a8",
  kycStatus: "verified",
  createdAt: new Date("2024-01-15"),
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email) => {
        set({ isLoading: true })
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        set({ user: mockUser, isAuthenticated: true, isLoading: false })
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "remmit-auth",
    },
  ),
)
