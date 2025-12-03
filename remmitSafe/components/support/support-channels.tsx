"use client"

import { MailIcon, MessageIcon, PhoneIcon } from "@/components/icons"

const channels = [
  {
    icon: MailIcon,
    title: "Email Support",
    description: "Response within 24 hours",
    action: "support@remmit.com",
    href: "mailto:support@remmit.com",
  },
  {
    icon: MessageIcon,
    title: "Live Chat",
    description: "Available 24/7",
    action: "Start Chat",
    href: "#chat",
  },
  {
    icon: PhoneIcon,
    title: "Phone Support",
    description: "Mon-Fri, 9AM-6PM",
    action: "+65 6123 4567",
    href: "tel:+6561234567",
  },
]

export function SupportChannels() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {channels.map((channel) => (
        <a
          key={channel.title}
          href={channel.href}
          className="bg-card text-card-foreground rounded-xl p-6 hover:ring-2 hover:ring-primary transition-all"
        >
          <h3 className="font-semibold text-card-foreground mb-1">{channel.title}</h3>
          <p className="text-sm text-muted-foreground">{channel.description}</p>
        </a>
      ))}
    </div>
  )
}
