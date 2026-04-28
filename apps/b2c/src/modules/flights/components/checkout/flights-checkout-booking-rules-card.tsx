import { Check } from "lucide-react"

import type { FlightsCheckoutContentCopy } from "../../types/flights-checkout-content-copy"

type FlightsCheckoutBookingRulesCardProps = {
  copy: FlightsCheckoutContentCopy
}

export function FlightsCheckoutBookingRulesCard({
  copy,
}: FlightsCheckoutBookingRulesCardProps) {
  return (
    <section className="rounded-[20px] border border-[#EAECF0] bg-white p-5 shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-4">
        <h2 className="text-c-gray-950 text-[20px] leading-5 font-bold">
          {copy.bookingRulesTitle}
        </h2>

        <div className="flex gap-4">
          <Check
            className="text-c-gray-950 size-6 shrink-0"
            strokeWidth={2.25}
            aria-hidden
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="text-c-gray-950 text-sm leading-5 font-bold">
              {copy.bookingRulesFreeCancellationTitle}
            </p>
            <p className="text-c-gray-950 text-[13.7px] leading-5 font-normal">
              {copy.bookingRulesFreeCancellationBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
