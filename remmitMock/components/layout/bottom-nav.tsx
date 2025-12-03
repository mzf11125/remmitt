"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Send, Users, Clock, User } from "lucide-react"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/send", icon: Send, label: "Send" },
  { href: "/recipients", icon: Users, label: "Recipients" },
  { href: "/history", icon: Clock, label: "History" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-3 border-foreground z-50">
      <div className="max-w-lg mx-auto flex">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-bold uppercase">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
