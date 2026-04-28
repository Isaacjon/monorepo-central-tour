"use client"

import { useState } from "react"
import { Checkbox } from "ui"

import type { FlightsCheckoutContentCopy } from "../../types/flights-checkout-content-copy"

type FlightsCheckoutBaggageProtectionSectionProps = {
  copy: FlightsCheckoutContentCopy
}

export function FlightsCheckoutBaggageProtectionSection({
  copy,
}: FlightsCheckoutBaggageProtectionSectionProps) {
  const [checked, setChecked] = useState(false)

  return (
    <section className="overflow-hidden rounded-3xl border border-[#EAECF0] bg-white shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04)]">
      <header className="border-b border-[#EAECF0] px-4 py-5 md:px-6">
        <h2 className="text-[20px] leading-5 font-bold text-[#0C111D]">
          {copy.baggageProtectionTitle}
        </h2>
      </header>

      <div className="p-4 md:p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="max-w-[640px] text-[14px] leading-5 font-normal tracking-normal text-[#111126]">
            {copy.baggageProtectionIntro}
            <strong className="font-semibold">
              {copy.baggageProtectionCompensation}
            </strong>
            {copy.baggageProtectionOutro}{" "}
            <button
              type="button"
              className="cursor-pointer text-primary hover:underline"
            >
              {copy.baggageProtectionMore}
            </button>
          </p>

          <div className="flex shrink-0 items-center justify-end gap-3 md:justify-start">
            <span className="text-[16px] leading-6 font-semibold tracking-normal">
              <span className="text-primary">{copy.baggageProtectionPriceAmount}</span>
              <span className="text-c-gray-950">{copy.baggageProtectionPriceSuffix}</span>
            </span>
            <Checkbox
              checked={checked}
              onCheckedChange={(value) => setChecked(value === true)}
              className="size-6 rounded border border-[#EAECF0]"
              aria-label={copy.baggageProtectionCheckboxAria}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
