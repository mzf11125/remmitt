import Link from "next/link"
import { SignupForm } from "@/components/auth/signup-form"
import { GoogleLoginButton } from "@/components/auth/google-login-button"

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <SignupForm />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-transparent px-2 text-white/40">Or</span>
        </div>
      </div>

      <GoogleLoginButton />

      <p className="text-center text-sm text-white/60">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
