import { Suspense } from "react"
import { StatusCards } from "@/components/dashboard/status-cards"
import { SendForm } from "@/components/send/send-form"
import { TransactionHistorySidebar } from "@/components/send/transaction-history-sidebar"
import { SendIcon } from "@/components/icons"

export default function SendPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <StatusCards />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Send Form */}
        <div className="lg:col-span-7">
          <div className="bg-card text-card-foreground rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <SendIcon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">New Transaction</h2>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <SendForm />
            </Suspense>
          </div>
        </div>

        {/* Transaction History Sidebar */}
        <div className="lg:col-span-5">
          <TransactionHistorySidebar />
        </div>
      </div>
    </div>
  )
}
