"use client"

import { useState } from "react"
import { BrutalCard } from "@/components/ui/brutal-card"
import { BrutalInput } from "@/components/ui/brutal-input"
import { BrutalButton } from "@/components/ui/brutal-button"
import { User, Star, Search, ChevronRight, Building2 } from "lucide-react"
import type { Recipient } from "@/store/recipient-store"
import { INDONESIAN_BANKS } from "@/services/xellar-service"

interface RecipientSelectorProps {
  recipients: Recipient[]
  onSelect: (recipient: Recipient) => void
  onAddNew: () => void
}

export function RecipientSelector({ recipients, onSelect, onAddNew }: RecipientSelectorProps) {
  const [search, setSearch] = useState("")

  const filteredRecipients = recipients.filter(
    (r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.accountNumber.includes(search),
  )

  const sortedRecipients = [...filteredRecipients].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1
    if (!a.isFavorite && b.isFavorite) return 1
    return 0
  })

  const getBankName = (code: string) => {
    const bank = INDONESIAN_BANKS.find((b) => b.code === code)
    return bank?.name || code
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold uppercase tracking-wide mb-2">Send To</label>
        <BrutalInput
          placeholder="Search by name or account"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="w-5 h-5" />}
        />
      </div>

      <BrutalButton variant="primary" className="w-full" onClick={onAddNew}>
        <User className="w-4 h-4" />
        Add New Recipient
      </BrutalButton>

      {sortedRecipients.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Saved Recipients</p>
          <div className="space-y-2">
            {sortedRecipients.map((recipient) => (
              <BrutalCard
                key={recipient.id}
                hover
                className="flex items-center gap-3 p-3 cursor-pointer"
                onClick={() => onSelect(recipient)}
              >
                <div className="w-10 h-10 border-2 border-foreground bg-primary flex items-center justify-center">
                  <span className="font-bold">{recipient.name.charAt(0).toUpperCase()}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm truncate">{recipient.name}</p>
                    {recipient.isFavorite && <Star className="w-3 h-3 fill-primary text-primary" />}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Building2 className="w-3 h-3" />
                    <span className="truncate">{getBankName(recipient.bankCode)}</span>
                    <span>•</span>
                    <span>{recipient.accountNumber.slice(-4).padStart(recipient.accountNumber.length, "•")}</span>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </BrutalCard>
            ))}
          </div>
        </div>
      )}

      {sortedRecipients.length === 0 && search && (
        <BrutalCard className="text-center py-6">
          <p className="text-muted-foreground text-sm">No recipients found</p>
        </BrutalCard>
      )}
    </div>
  )
}
