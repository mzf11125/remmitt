"use client"

import { useState } from "react"
import Link from "next/link"
import { useWalletStore } from "@/store/wallet-store"
import { RecipientCard } from "@/components/recipients/recipient-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserIcon } from "@/components/icons"

export default function RecipientsPage() {
  const { recipients } = useWalletStore()
  const [search, setSearch] = useState("")

  const filteredRecipients = recipients.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.bankName.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Recipients</h1>
          <p className="text-white/60">{recipients.length} saved recipients</p>
        </div>
        <Button className="bg-primary text-primary-foreground" asChild>
          <Link href="/recipients/new">+ Add Recipient</Link>
        </Button>
      </div>

      <Input
        placeholder="Search recipients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-card border-border text-card-foreground placeholder:text-muted-foreground"
      />

      <div className="space-y-3">
        {filteredRecipients.map((recipient) => (
          <RecipientCard key={recipient.id} recipient={recipient} />
        ))}

        {filteredRecipients.length === 0 && (
          <div className="bg-card rounded-xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <UserIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-2">No recipients found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {search ? "Try a different search term" : "Add your first recipient to start sending money"}
            </p>
            {!search && (
              <Button className="bg-primary text-primary-foreground" asChild>
                <Link href="/recipients/new">Add Recipient</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
