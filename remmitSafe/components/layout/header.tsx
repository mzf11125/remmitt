"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BellIcon, ChevronDownIcon } from "@/components/icons"
import { useAuthStore } from "@/store/auth-store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { label: "DASHBOARD", href: "/dashboard" },
  { label: "SEND", href: "/send" },
  { label: "HISTORY", href: "/activity" },
  { label: "SUPPORT", href: "/support" },
]

export function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <Link href="/dashboard" className="text-xl font-bold text-white">
          REMMIT
        </Link>

        <nav className="hidden md:flex items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-6 py-3 text-sm font-medium transition-colors",
                  isActive ? "bg-[#1a4a4a] text-white" : "text-white/70 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-white/70 hover:text-white">
              EN <ChevronDownIcon className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Bahasa Indonesia</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="p-2 rounded-full bg-primary text-primary-foreground">
            <BellIcon className="w-5 h-5" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-10 h-10 border-2 border-primary">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex overflow-x-auto border-t border-white/10">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 px-4 py-3 text-center text-sm font-medium whitespace-nowrap transition-colors",
                isActive ? "bg-[#1a4a4a] text-white" : "text-white/70 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
