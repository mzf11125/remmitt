import Link from "next/link"
import { EmailLoginForm } from "@/components/auth/email-login-form"
import { GoogleLoginButton } from "@/components/auth/google-login-button"

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <EmailLoginForm />

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
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  )
}
