"use client"

import { useState } from "react"
import { cn, Input } from "ui"

import type { FlightsCheckoutContentCopy } from "../../types/flights-checkout-content-copy"

type FlightsCheckoutPromoCodeSectionProps = {
  copy: FlightsCheckoutContentCopy
}

export function FlightsCheckoutPromoCodeSection({
  copy,
}: FlightsCheckoutPromoCodeSectionProps) {
  const [promoCode, setPromoCode] = useState("")

  return (
    <section className="overflow-hidden rounded-3xl border border-[#EAECF0] bg-white shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04)]">
      <header className="border-b border-[#EAECF0] px-4 py-5 md:px-6">
        <h2 className="text-[20px] leading-5 font-bold text-[#0C111D]">
          {copy.promoCodeTitle}
        </h2>
      </header>

      <div className="p-4 md:p-6">
        <div
          className={cn(
            "flex h-[54px] w-full items-center rounded-xl border border-[#D0D5DD] bg-white px-3",
            "shadow-[0_1px_2px_rgba(16,24,40,0.05)]",
            "focus-within:border-[#667085]",
            "focus-within:shadow-[0_0_0_4px_rgba(102,112,133,0.14),0_1px_2px_rgba(16,24,40,0.05)]",
            "focus-within:outline-none"
          )}
        >
          <Input
            id="checkout-promo-code"
            name="promoCode"
            value={promoCode}
            onChange={(event) => setPromoCode(event.target.value)}
            placeholder={copy.promoCodePlaceholder}
            autoComplete="off"
            spellCheck={false}
            className="text-c-gray-900 placeholder:text-c-gray-400 h-auto min-w-0 flex-1 border-0 bg-transparent p-0 text-base leading-6 font-normal shadow-none focus:outline-none"
            aria-label={copy.promoCodePlaceholder}
          />
        </div>
      </div>
    </section>
  )
}
