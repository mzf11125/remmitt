"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BrutalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const BrutalInput = React.forwardRef<HTMLInputElement, BrutalInputProps>(
  ({ className, label, error, icon, type, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-bold uppercase tracking-wide mb-2">{label}</label>}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>}
          <input
            type={type}
            className={cn(
              "w-full px-4 py-3 bg-card text-foreground border-3 border-foreground brutal-shadow focus:outline-none focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[6px_6px_0px_var(--border)] transition-all duration-100 placeholder:text-muted-foreground",
              icon && "pl-10",
              error && "border-destructive",
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-destructive font-medium">{error}</p>}
      </div>
    )
  },
)

BrutalInput.displayName = "BrutalInput"
