"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { useRecipientStore, type Recipient } from "@/store/recipient-store"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Header } from "@/components/layout/header"
import { BrutalCard } from "@/components/ui/brutal-card"
import { BrutalButton } from "@/components/ui/brutal-button"
import { BrutalInput } from "@/components/ui/brutal-input"
import { AddRecipientForm } from "@/components/send/add-recipient-form"
import { User, Star, Search, MoreVertical, Trash2, Send, Plus, Building2 } from "lucide-react"
import { INDONESIAN_BANKS } from "@/services/xellar-service"

export default function RecipientsPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { recipients, addRecipient, deleteRecipient, toggleFavorite, selectRecipient } = useRecipientStore()

  const [search, setSearch] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

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

  const handleAddRecipient = (data: Omit<Recipient, "id" | "createdAt">) => {
    addRecipient({
      ...data,
      id: `recv_${Date.now()}`,
      createdAt: new Date().toISOString(),
    })
    setShowAddForm(false)
  }

  const handleSendTo = (recipient: Recipient) => {
    selectRecipient(recipient)
    router.push("/send")
  }

  if (showAddForm) {
    return (
      <main className="min-h-screen bg-background pb-24">
        <Header title="Add Recipient" showBack />
        <div className="max-w-lg mx-auto px-4 py-6">
          <AddRecipientForm onAdd={handleAddRecipient} onCancel={() => setShowAddForm(false)} />
        </div>
        <BottomNav />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      <Header title="Recipients" />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <BrutalInput
          placeholder="Search recipients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="w-5 h-5" />}
        />

        <BrutalButton variant="primary" className="w-full" onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4" />
          Add New Recipient
        </BrutalButton>

        {sortedRecipients.length > 0 ? (
          <div className="space-y-2">
            {sortedRecipients.map((recipient) => (
              <BrutalCard key={recipient.id} className="p-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 border-2 border-foreground bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold">{recipient.name.charAt(0).toUpperCase()}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold truncate">{recipient.name}</p>
                      {recipient.isFavorite && <Star className="w-4 h-4 fill-primary text-primary flex-shrink-0" />}
                    </div>
                    {recipient.nickname && <p className="text-sm text-muted-foreground">{recipient.nickname}</p>}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Building2 className="w-3 h-3" />
                      <span className="truncate">{getBankName(recipient.bankCode)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">{recipient.accountNumber}</p>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setMenuOpenId(menuOpenId === recipient.id ? null : recipient.id)}
                      className="p-2 hover:bg-muted"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {menuOpenId === recipient.id && (
                      <div className="absolute right-0 top-full mt-1 w-40 bg-card border-3 border-foreground brutal-shadow z-10">
                        <button
                          onClick={() => {
                            handleSendTo(recipient)
                            setMenuOpenId(null)
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-bold hover:bg-muted"
                        >
                          <Send className="w-4 h-4" />
                          Send Money
                        </button>
                        <button
                          onClick={() => {
                            toggleFavorite(recipient.id)
                            setMenuOpenId(null)
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-bold hover:bg-muted"
                        >
                          <Star className={`w-4 h-4 ${recipient.isFavorite ? "fill-primary" : ""}`} />
                          {recipient.isFavorite ? "Remove Favorite" : "Add Favorite"}
                        </button>
                        <button
                          onClick={() => {
                            deleteRecipient(recipient.id)
                            setMenuOpenId(null)
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-bold hover:bg-muted text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </BrutalCard>
            ))}
          </div>
        ) : (
          <BrutalCard className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 border-3 border-foreground bg-muted flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-bold mb-1">No Recipients Yet</p>
            <p className="text-sm text-muted-foreground mb-4">Add someone to send money to</p>
            <BrutalButton variant="primary" onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4" />
              Add Recipient
            </BrutalButton>
          </BrutalCard>
        )}
      </div>

      <BottomNav />
    </main>
  )
}
