"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useWalletStore } from "@/store/wallet-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { INDONESIAN_BANKS, COUNTRIES } from "@/lib/constants"
import type { Recipient } from "@/lib/types"

const recipientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  country: z.enum(["ID", "PH"]),
  bankName: z.string().min(1, "Please select a bank"),
  accountNumber: z.string().min(5, "Account number must be at least 5 digits"),
})

type RecipientFormData = z.infer<typeof recipientSchema>

interface RecipientFormProps {
  recipient?: Recipient
  onSuccess?: () => void
}

export function RecipientForm({ recipient, onSuccess }: RecipientFormProps) {
  const router = useRouter()
  const { addRecipient } = useWalletStore()

  const form = useForm<RecipientFormData>({
    resolver: zodResolver(recipientSchema),
    defaultValues: {
      name: recipient?.name || "",
      email: recipient?.email || "",
      phone: recipient?.phone || "",
      country: recipient?.country || "ID",
      bankName: recipient?.bankName || "",
      accountNumber: recipient?.accountNumber || "",
    },
  })

  const selectedCountry = form.watch("country")

  const handleSubmit = async (data: RecipientFormData) => {
    // In production: call Rampable API to create/update receiver
    // await xellar.rampable.createReceiver({ ...data })

    const newRecipient: Recipient = {
      id: recipient?.id || Date.now().toString(),
      ...data,
      lastSent: recipient?.lastSent,
    }

    addRecipient(newRecipient)

    if (onSuccess) {
      onSuccess()
    } else {
      router.push("/recipients")
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name (as on bank account)</Label>
        <Input id="name" placeholder="Enter recipient's full name" {...form.register("name")} />
        {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="Enter email address" {...form.register("email")} />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input id="phone" type="tel" placeholder="+62 812 3456 7890" {...form.register("phone")} />
      </div>

      <div className="space-y-2">
        <Label>Country</Label>
        <Select value={form.watch("country")} onValueChange={(value) => form.setValue("country", value as "ID" | "PH")}>
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ID">{COUNTRIES.ID.flag} Indonesia (IDR)</SelectItem>
            <SelectItem value="PH">{COUNTRIES.PH.flag} Philippines (PHP)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Bank / E-Wallet</Label>
        <Select value={form.watch("bankName")} onValueChange={(value) => form.setValue("bankName", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select bank or e-wallet" />
          </SelectTrigger>
          <SelectContent>
            {INDONESIAN_BANKS.map((bank) => (
              <SelectItem key={bank.code} value={bank.name}>
                {bank.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.bankName && (
          <p className="text-sm text-destructive">{form.formState.errors.bankName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input id="accountNumber" placeholder="Enter account number" {...form.register("accountNumber")} />
        {form.formState.errors.accountNumber && (
          <p className="text-sm text-destructive">{form.formState.errors.accountNumber.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          For e-wallets (DANA, OVO, GoPay), enter the registered phone number
        </p>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1 bg-primary text-primary-foreground">
          {recipient ? "Update Recipient" : "Add Recipient"}
        </Button>
      </div>
    </form>
  )
}
