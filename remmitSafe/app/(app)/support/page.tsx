import { SupportChannels } from "@/components/support/support-channels"
import { FAQSection } from "@/components/support/faq-section"

export default function SupportPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <SupportChannels />
      <FAQSection />
    </div>
  )
}
