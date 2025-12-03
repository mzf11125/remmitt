"use client"

import { CheckCircleIcon, ClockIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TransactionStatusProps {
  status: "processing" | "confirming" | "completed"
  amount: number
  recipientName: string
  recipientAmount: number
  estimatedTime?: string
}

const statusConfig = {
  processing: {
    icon: ClockIcon,
    title: "Processing your transfer",
    description: "We're converting your funds and preparing the transfer.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  confirming: {
    icon: ClockIcon,
    title: "Sending to recipient",
    description: "Your money is on its way to the recipient's bank.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  completed: {
    icon: CheckCircleIcon,
    title: "Transfer complete!",
    description: "Your money has been delivered successfully.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
}

export function TransactionStatus({
  status,
  amount,
  recipientName,
  recipientAmount,
  estimatedTime = "15-60 minutes",
}: TransactionStatusProps) {
  const config = statusConfig[status]

  return (
    <div className="flex flex-col items-center text-center py-8">
      <div className={`w-20 h-20 rounded-full ${config.bgColor} flex items-center justify-center mb-6`}>
        <config.icon className={`w-10 h-10 ${config.color}`} />
      </div>

      <h2 className="text-2xl font-bold text-card-foreground mb-2">{config.title}</h2>
      <p className="text-muted-foreground mb-6">{config.description}</p>

      <div className="bg-muted rounded-lg p-4 w-full max-w-sm mb-6">
        <div className="text-sm text-muted-foreground mb-1">Sending to {recipientName}</div>
        <div className="text-3xl font-bold text-card-foreground">
          ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          ≈ Rp {recipientAmount.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
        </div>
      </div>

      {status !== "completed" && (
        <div className="text-sm text-muted-foreground mb-6">
          Estimated time: <span className="text-card-foreground font-medium">{estimatedTime}</span>
        </div>
      )}

      <div className="flex gap-4 w-full max-w-sm">
        <Button variant="outline" className="flex-1 bg-transparent" asChild>
          <Link href="/activity">View Details</Link>
        </Button>
        <Button className="flex-1 bg-primary text-primary-foreground" asChild>
          <Link href="/dashboard">Done</Link>
        </Button>
      </div>
    </div>
  )
}
