"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MailIcon } from "@/components/icons"

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
})

type EmailFormData = z.infer<typeof emailSchema>
type OTPFormData = z.infer<typeof otpSchema>

export function EmailLoginForm() {
  const router = useRouter()
  const { login, isLoading } = useAuthStore()
  const [step, setStep] = useState<"email" | "otp">("email")
  const [email, setEmail] = useState("")

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  })

  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  })

  const handleEmailSubmit = async (data: EmailFormData) => {
    setEmail(data.email)
    // In production: call Xellar auth API to send OTP
    // await xellar.auth.sendOTP(data.email)
    setStep("otp")
  }

  const handleOTPSubmit = async (data: OTPFormData) => {
    // In production: verify OTP with Xellar
    // await xellar.auth.verifyOTP(email, data.otp)
    await login(email)
    router.push("/dashboard")
  }

  if (step === "otp") {
    return (
      <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Enter verification code</h2>
          <p className="text-muted-foreground text-sm">
            We sent a 6-digit code to
            <br />
            <span className="text-foreground">{email}</span>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="otp" className="text-foreground">
            Verification Code
          </Label>
          <Input
            id="otp"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            className="bg-muted border-border text-foreground placeholder:text-muted-foreground text-center text-2xl tracking-[0.5em]"
            {...otpForm.register("otp")}
          />
          {otpForm.formState.errors.otp && (
            <p className="text-sm text-destructive">{otpForm.formState.errors.otp.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoading ? "Verifying..." : "Verify & Continue"}
        </Button>

        <button
          type="button"
          onClick={() => setStep("email")}
          className="w-full text-sm text-muted-foreground hover:text-foreground"
        >
          Use a different email
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back</h2>
        <p className="text-muted-foreground text-sm">Sign in to continue sending money home</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email Address
        </Label>
        <div className="relative">
          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="bg-muted border-border text-foreground placeholder:text-muted-foreground pl-10"
            {...emailForm.register("email")}
          />
        </div>
        {emailForm.formState.errors.email && (
          <p className="text-sm text-destructive">{emailForm.formState.errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isLoading ? "Sending code..." : "Continue with Email"}
      </Button>
    </form>
  )
}
