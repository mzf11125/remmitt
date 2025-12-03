"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
}

export function BrutalButton({
  className,
  variant = "primary",
  size = "md",
  isLoading,
  disabled,
  children,
  ...props
}: BrutalButtonProps) {
  const baseStyles =
    "font-bold uppercase tracking-wide border-3 border-foreground transition-all duration-100 flex items-center justify-center gap-2"

  const variants = {
    primary: "bg-primary text-primary-foreground brutal-shadow brutal-hover brutal-active",
    secondary: "bg-secondary text-secondary-foreground brutal-shadow brutal-hover brutal-active",
    outline: "bg-card text-card-foreground brutal-shadow brutal-hover brutal-active",
    ghost: "bg-transparent text-foreground hover:bg-muted",
    danger: "bg-destructive text-destructive-foreground brutal-shadow brutal-hover brutal-active",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        (disabled || isLoading) && "opacity-50 cursor-not-allowed transform-none hover:transform-none",
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  )
}
