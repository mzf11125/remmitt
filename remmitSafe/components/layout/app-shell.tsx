"use client"

import type React from "react"

import { Header } from "./header"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen remmit-gradient">
      <Header />
      <main className="px-4 md:px-8 py-6">{children}</main>
    </div>
  )
}
