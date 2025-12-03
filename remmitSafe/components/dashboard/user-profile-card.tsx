"use client"

import { useAuthStore } from "@/store/auth-store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserProfileCard() {
  const { user } = useAuthStore()

  if (!user) return null

  const truncatedAddress = user.walletAddress
    ? `0x${user.walletAddress.slice(2, 10)}...${user.walletAddress.slice(-6)}`
    : ""

  return (
    <div className="bg-card text-card-foreground rounded-xl p-6">
      <div className="flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <div className="mt-4 w-full bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm">
          Address : {truncatedAddress}
        </div>
      </div>
    </div>
  )
}
