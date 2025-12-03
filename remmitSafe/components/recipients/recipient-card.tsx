"use client"

import Link from "next/link"
import { useWalletStore } from "@/store/wallet-store"
import { UserIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Recipient } from "@/lib/types"

interface RecipientCardProps {
  recipient: Recipient
}

export function RecipientCard({ recipient }: RecipientCardProps) {
  const { removeRecipient } = useWalletStore()

  const formatDate = (date?: Date) => {
    if (!date) return "Never"
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to remove this recipient?")) {
      removeRecipient(recipient.id)
    }
  }

  return (
    <div className="bg-card text-card-foreground rounded-xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <UserIcon className="w-6 h-6 text-muted-foreground" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-card-foreground truncate">{recipient.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{recipient.email}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {recipient.bankName} • Last sent: {formatDate(recipient.lastSent)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" className="bg-primary text-primary-foreground" asChild>
          <Link href={`/send?recipient=${recipient.id}`}>Send</Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="px-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="6" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="18" r="2" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/recipients/${recipient.id}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
