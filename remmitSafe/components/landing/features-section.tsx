"use client"

import { TrendDownIcon, GlobeIcon, BoltIcon, ShieldIcon } from "@/components/icons"

export function FeaturesSection() {
  const features = [
    {
      icon: TrendDownIcon,
      title: "Low fee",
      description: "Fee yang kompetitif dan transparan setiap transaksi",
    },
    {
      icon: GlobeIcon,
      title: "Global and Decentralized",
      description: "Kirim ke 150+ negara",
    },
    {
      icon: BoltIcon,
      title: "Instant Transfer",
      description: "Sent to 150+ countries",
    },
    {
      icon: ShieldIcon,
      title: "Security",
      description: "Dilindungi dengan enkripsi blockchain dan smart contract",
    },
  ]

  return (
    <section className="px-4 py-12 md:py-16 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="teal-card-gradient backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-start gap-4">
              <feature.icon className="w-6 h-6 text-white/80 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
