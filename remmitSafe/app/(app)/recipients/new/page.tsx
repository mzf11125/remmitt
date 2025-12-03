import { RecipientForm } from "@/components/recipients/recipient-form"
import { UserIcon } from "@/components/icons"

export default function NewRecipientPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-card text-card-foreground rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Add New Recipient</h1>
            <p className="text-sm text-muted-foreground">Enter the recipient's bank details</p>
          </div>
        </div>

        <RecipientForm />
      </div>
    </div>
  )
}
