"use client"

import { useState } from "react"
import { useWalletStore } from "@/store/wallet-store"
import { UserIcon, ChevronDownIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Recipient } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface RecipientSelectorProps {
  selected: Recipient | null
  onSelect: (recipient: Recipient) => void
}

export function RecipientSelector({ selected, onSelect }: RecipientSelectorProps) {
  const { recipients } = useWalletStore()
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filteredRecipients = recipients.filter(
    (r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-full flex items-center gap-3 p-4 bg-muted rounded-lg border border-border hover:border-primary transition-colors text-left"
        >
          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          {selected ? (
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{selected.name}</p>
              <p className="text-sm text-muted-foreground truncate">
                {selected.bankName} - {selected.accountNumber}
              </p>
            </div>
          ) : (
            <span className="flex-1 text-muted-foreground">Select a recipient</span>
          )}
          <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Recipient</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="max-h-[300px] overflow-y-auto space-y-2">
            {filteredRecipients.map((recipient) => (
              <button
                key={recipient.id}
                type="button"
                onClick={() => {
                  onSelect(recipient)
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{recipient.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{recipient.email}</p>
                  <p className="text-xs text-muted-foreground">{recipient.bankName}</p>
                </div>
              </button>
            ))}
            {filteredRecipients.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No recipients found</p>
            )}
          </div>
          <Button variant="outline" className="w-full bg-transparent" asChild>
            <a href="/recipients/new">+ Add New Recipient</a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
