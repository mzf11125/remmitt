"use client"
import { Plus, User } from "lucide-react"
import type { Recipient } from "@/store/recipient-store"

interface QuickSendProps {
  recipients: Recipient[]
  onSelectRecipient: (recipient: Recipient) => void
  onAddNew: () => void
}

export function QuickSend({ recipients, onSelectRecipient, onAddNew }: QuickSendProps) {
  const favoriteRecipients = recipients.filter((r) => r.isFavorite).slice(0, 4)

  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wide mb-3">Quick Send</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
        <button onClick={onAddNew} className="flex-shrink-0 flex flex-col items-center gap-2">
          <div className="w-14 h-14 border-3 border-foreground bg-primary brutal-shadow flex items-center justify-center brutal-hover">
            <Plus className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium">New</span>
        </button>

        {favoriteRecipients.map((recipient) => (
          <button
            key={recipient.id}
            onClick={() => onSelectRecipient(recipient)}
            className="flex-shrink-0 flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 border-3 border-foreground bg-card brutal-shadow flex items-center justify-center brutal-hover">
              <span className="text-lg font-bold">{recipient.name.charAt(0).toUpperCase()}</span>
            </div>
            <span className="text-xs font-medium truncate w-14 text-center">
              {recipient.nickname || recipient.name.split(" ")[0]}
            </span>
          </button>
        ))}

        {favoriteRecipients.length === 0 && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <User className="w-4 h-4" />
            <span>No favorites yet</span>
          </div>
        )}
      </div>
    </div>
  )
}
