"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does a transfer take to Indonesia?",
    answer:
      "Transfers to Indonesian bank accounts typically arrive within 1-2 hours during banking hours. E-wallet transfers (DANA, OVO, GoPay) are usually instant, arriving within 1-15 minutes. Please note that transfers initiated outside banking hours may be processed the next business day.",
  },
  {
    question: "What are the fees for sending money?",
    answer:
      "REMMIT charges a transparent 1.4% fee on all transfers. This fee covers currency conversion, blockchain processing, and disbursement to the recipient's bank or e-wallet. There are no hidden fees - the amount shown at confirmation is exactly what you pay.",
  },
  {
    question: "Is my money safe with REMMIT?",
    answer:
      "Yes, your funds are secured using industry-leading blockchain technology. We use MPC (Multi-Party Computation) wallets that are self-custodial, meaning only you have access to your funds. All transactions are processed on Base network with enterprise-grade security.",
  },
  {
    question: "What documents do I need to verify my identity?",
    answer:
      "For basic transfers up to $500, you only need to verify your email and phone number. For larger amounts, you'll need to provide a government-issued ID (passport, national ID, or driver's license) and complete a selfie verification. This helps us comply with international anti-money laundering regulations.",
  },
  {
    question: "Can I cancel a transfer after sending?",
    answer:
      "Once a transfer is confirmed on the blockchain, it cannot be reversed. However, if the transfer fails at the bank disbursement stage (e.g., incorrect account number), the funds will be automatically refunded to your REMMIT balance within 24-48 hours.",
  },
  {
    question: "What currencies and countries do you support?",
    answer:
      "Currently, we support sending USD, SGD, and AED to Indonesia (IDR) and Philippines (PHP). We're actively working on adding more corridors. The Indonesia corridor supports all major banks (BCA, BRI, Mandiri, BNI, CIMB) and popular e-wallets (DANA, OVO, GoPay).",
  },
  {
    question: "How do I add money to my REMMIT balance?",
    answer:
      "You can add money using local payment methods including bank transfer, virtual account, or debit card depending on your country. Simply tap 'Add Money' on your dashboard and follow the instructions. Funds are typically credited within minutes.",
  },
]

export function FAQSection() {
  return (
    <div className="bg-card text-card-foreground rounded-xl p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Header */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold text-card-foreground mb-4">FAQ's</h2>
          <p className="text-muted-foreground leading-relaxed">
            Everything you need to know about the product and other information. Can't find the answer you're looking
            for?
          </p>
        </div>

        {/* Right Column - Questions */}
        <div className="md:col-span-2">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-card-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
