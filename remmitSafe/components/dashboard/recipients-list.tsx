"use client"

import { useWalletStore } from "@/store/wallet-store"
import { UserIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function RecipientsList() {
  const { recipients } = useWalletStore()
  const displayedRecipients = recipients.slice(0, 7)

  const formatDate = (date?: Date) => {
    if (!date) return ""
    return `Last: ${date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
  }

  return (
    <div className="bg-card text-card-foreground rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recipients</h3>
        <Link href="/recipients" className="text-sm text-primary hover:underline">
          VIEW ALL
        </Link>
      </div>
      <div className="space-y-3">
        {displayedRecipients.map((recipient) => (
          <div key={recipient.id} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{recipient.name}</p>
              <p className="text-xs text-muted-foreground truncate">{recipient.email}</p>
              <p className="text-xs text-muted-foreground">{formatDate(recipient.lastSent)}</p>
            </div>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href={`/send?recipient=${recipient.id}`}>Send</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
