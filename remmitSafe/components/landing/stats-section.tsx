"use client"

export function StatsSection() {
  const stats = [
    { value: "500k+", label: "ACTIVE USERS" },
    { value: "$2.5B", label: "Total Volume" },
    { value: "150+", label: "Countries" },
  ]

  return (
    <section className="flex flex-wrap justify-center gap-8 md:gap-16 px-4 py-12 md:py-16">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
          <p className="text-sm text-white/60 uppercase tracking-wider mt-1">{stat.label}</p>
        </div>
      ))}
    </section>
  )
}
