import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Recipient {
  id: string
  name: string
  nickname?: string
  phone?: string
  email?: string
  bankName: string
  bankCode: string
  accountNumber: string
  accountType: "bank" | "ewallet"
  country: string
  currency: string
  isFavorite: boolean
  lastUsed?: string
  createdAt: string
}

interface RecipientState {
  recipients: Recipient[]
  selectedRecipient: Recipient | null
  isLoading: boolean

  // Actions
  setRecipients: (recipients: Recipient[]) => void
  addRecipient: (recipient: Recipient) => void
  updateRecipient: (id: string, updates: Partial<Recipient>) => void
  deleteRecipient: (id: string) => void
  selectRecipient: (recipient: Recipient | null) => void
  toggleFavorite: (id: string) => void
  setLoading: (loading: boolean) => void
}

export const useRecipientStore = create<RecipientState>()(
  persist(
    (set) => ({
      recipients: [],
      selectedRecipient: null,
      isLoading: false,

      setRecipients: (recipients) => set({ recipients }),

      addRecipient: (recipient) =>
        set((state) => ({
          recipients: [...state.recipients, recipient],
        })),

      updateRecipient: (id, updates) =>
        set((state) => ({
          recipients: state.recipients.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        })),

      deleteRecipient: (id) =>
        set((state) => ({
          recipients: state.recipients.filter((r) => r.id !== id),
          selectedRecipient: state.selectedRecipient?.id === id ? null : state.selectedRecipient,
        })),

      selectRecipient: (recipient) => set({ selectedRecipient: recipient }),

      toggleFavorite: (id) =>
        set((state) => ({
          recipients: state.recipients.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r)),
        })),

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "remitt-recipients",
    },
  ),
)
