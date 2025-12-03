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
import { Checkbox } from "@/components/ui/checkbox"
import { MailIcon, UserIcon, PhoneIcon } from "@/components/icons"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms"),
})

type SignupFormData = z.infer<typeof signupSchema>

export function SignupForm() {
  const router = useRouter()
  const { login, isLoading } = useAuthStore()
  const [step, setStep] = useState<"details" | "otp">("details")
  const [formData, setFormData] = useState<SignupFormData | null>(null)
  const [otp, setOtp] = useState("")

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      acceptTerms: false,
    },
  })

  const handleDetailsSubmit = async (data: SignupFormData) => {
    setFormData(data)
    // In production: call Xellar to create account and send OTP
    // await xellar.auth.register({ email: data.email, name: data.name })
    setStep("otp")
  }

  const handleOTPVerify = async () => {
    if (otp.length !== 6) return
    // In production: verify OTP and create embedded wallet
    // await xellar.auth.verifyOTP(formData?.email, otp)
    // Wallet is automatically created by Xellar on successful verification
    await login(formData?.email || "")
    router.push("/dashboard")
  }

  if (step === "otp") {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Verify your email</h2>
          <p className="text-muted-foreground text-sm">
            Enter the 6-digit code sent to
            <br />
            <span className="text-foreground">{formData?.email}</span>
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
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="bg-muted border-border text-foreground placeholder:text-muted-foreground text-center text-2xl tracking-[0.5em]"
          />
        </div>

        <Button
          onClick={handleOTPVerify}
          disabled={isLoading || otp.length !== 6}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoading ? "Creating your account..." : "Create Account"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By signing up, your secure wallet will be automatically created
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(handleDetailsSubmit)} className="space-y-5">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Create your account</h2>
        <p className="text-muted-foreground text-sm">Start sending money home in minutes</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground">
          Full Name
        </Label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="bg-muted border-border text-foreground placeholder:text-muted-foreground pl-10"
            {...form.register("name")}
          />
        </div>
        {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
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
            {...form.register("email")}
          />
        </div>
        {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-foreground">
          Phone Number
        </Label>
        <div className="relative">
          <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="+65 9123 4567"
            className="bg-muted border-border text-foreground placeholder:text-muted-foreground pl-10"
            {...form.register("phone")}
          />
        </div>
        {form.formState.errors.phone && <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          checked={form.watch("acceptTerms")}
          onCheckedChange={(checked) => form.setValue("acceptTerms", checked as boolean)}
          className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1"
        />
        <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
          I agree to the{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </Label>
      </div>
      {form.formState.errors.acceptTerms && (
        <p className="text-sm text-destructive">{form.formState.errors.acceptTerms.message}</p>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Continue
      </Button>
    </form>
  )
}
