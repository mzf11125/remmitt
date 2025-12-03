"use client"

import Link from "next/link"

export function Footer() {
  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Send", href: "/send" },
    { label: "Activity", href: "/activity" },
    { label: "Support", href: "/support" },
  ]

  return (
    <footer className="px-4 py-12 md:py-16 border-t border-white/10 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">REMMIT</h2>
          <p className="text-sm text-white/60 mt-1">Transfer platform across country with low fee</p>
        </div>
        <nav className="flex flex-wrap gap-4 md:gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
