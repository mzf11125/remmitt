import type * as React from "react"
import { cn } from "@/lib/utils"

interface BrutalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "accent"
  hover?: boolean
}

export function BrutalCard({ className, variant = "default", hover = false, children, ...props }: BrutalCardProps) {
  const variants = {
    default: "bg-card text-card-foreground",
    primary: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
  }

  return (
    <div
      className={cn(
        "border-3 border-foreground brutal-shadow p-4",
        variants[variant],
        hover && "brutal-hover cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
