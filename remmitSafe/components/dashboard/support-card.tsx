"use client"

import { PhoneIcon } from "@/components/icons"
import Link from "next/link"

export function SupportCard() {
  return (
    <div className="bg-card text-card-foreground rounded-xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
        <PhoneIcon className="w-6 h-6 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold">Customer Support</h4>
        <Link href="/support" className="text-sm text-muted-foreground hover:text-primary">
          Contact with us →
        </Link>
      </div>
    </div>
  )
}
