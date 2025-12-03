"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 md:pt-32 md:pb-24">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">REMMIT</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md text-balance">
        Send Money Home Faster,
        <br />
        Cheaper, and Safer.
      </p>
      <div className="flex gap-4">
        <Button
          asChild
          variant="outline"
          className="bg-transparent border-foreground text-foreground hover:bg-foreground hover:text-background px-6 py-2 rounded-full"
        >
          <Link href="/login">SIGN IN</Link>
        </Button>
        <Button asChild className="bg-foreground text-background hover:bg-foreground/90 px-6 py-2 rounded-full">
          <Link href="/signup">SIGN UP</Link>
        </Button>
      </div>
    </section>
  )
}
