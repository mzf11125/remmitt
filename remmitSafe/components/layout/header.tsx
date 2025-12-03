"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { BellIcon, ChevronDownIcon, MoonIcon, SunIcon } from "@/components/icons"
import { useAuthStore } from "@/store/auth-store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
  const { theme, setTheme } = useTheme()

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
                  "px-6 py-3 text-sm font-medium transition-colors rounded-lg",
                  isActive ? "bg-[var(--nav-active)] text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-foreground hover:bg-muted"
          >
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
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
                isActive ? "bg-[var(--nav-active)] text-foreground" : "text-muted-foreground hover:text-foreground",
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
