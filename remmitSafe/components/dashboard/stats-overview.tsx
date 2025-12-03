"use client"

import { useWalletStore } from "@/store/wallet-store"
import { ArrowRightIcon } from "@/components/icons"
import Link from "next/link"

export function StatsOverview() {
  const { transactions, recipients } = useWalletStore()

  const stats = [
    {
      value: transactions.length,
      label: "Total Transaction",
      href: "/activity",
    },
    {
      value: transactions.filter((t) => t.status === "pending").length,
      label: "Pending Transactions",
      href: "/activity?filter=pending",
    },
    {
      value: transactions
        .filter((t) => t.status === "failed")
        .length.toString()
        .padStart(2, "0"),
      label: "Incomplete Transactions",
      href: "/activity?filter=failed",
    },
    {
      value: recipients.length,
      label: "Total Recipients",
      href: "/recipients",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card text-card-foreground rounded-xl p-4">
          <p className="text-3xl font-bold text-primary">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          <Link href={stat.href} className="inline-flex items-center gap-1 text-xs text-primary mt-3 hover:underline">
            VIEW DETAILS <ArrowRightIcon className="w-3 h-3" />
          </Link>
        </div>
      ))}
    </div>
  )
}
