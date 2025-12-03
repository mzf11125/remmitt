"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useWalletStore } from "@/store/wallet-store"

export function ActivityChart() {
  const { transactions } = useWalletStore()

  const sent = transactions.filter((t) => t.type === "send").length
  const received = transactions.filter((t) => t.type === "receive").length
  const addMoney = transactions.filter((t) => t.type === "add_money").length
  const withdrawal = transactions.filter((t) => t.type === "withdrawal").length

  const data = [
    { name: "Sent", value: sent || 40, color: "var(--chart-1)" },
    { name: "Request", value: received || 25, color: "var(--chart-4)" },
    { name: "Add Money", value: addMoney || 20, color: "var(--chart-2)" },
    { name: "Withdrawal", value: withdrawal || 15, color: "var(--chart-3)" },
  ]

  return (
    <div className="bg-card text-card-foreground rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Overview</h3>
        <span className="text-sm text-muted-foreground">4 Categories</span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
