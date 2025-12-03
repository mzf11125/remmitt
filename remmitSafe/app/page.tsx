import { HeroSection } from "@/components/landing/hero-section"
import { StatsSection } from "@/components/landing/stats-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen remmit-gradient">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <Footer />
    </div>
  )
}
