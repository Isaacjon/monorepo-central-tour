import Link from "next/link"

import {
  ChevronDownIcon,
  PhoneInputField,
  PrimaryButton,
  StackedInputField,
} from "ui"

import { FlightsCheckoutAdditionalServicesField } from "./flights-checkout-additional-services-field"
import { FlightsCheckoutFlightCard } from "./flights-checkout-flight-card"
import { FlightsCheckoutPaymentInformationSection } from "./flights-checkout-payment-information-section"
import { FlightsCheckoutTravelerForm } from "./flights-checkout-traveler-form"
import type { FlightsCheckoutContentCopy } from "../../types/flights-checkout-content-copy"

type FlightsCheckoutContentProps = {
  lang: string
  checkoutResultHref: string
  copy: FlightsCheckoutContentCopy
}

export function FlightsCheckoutContent({
  lang,
  checkoutResultHref,
  copy,
}: FlightsCheckoutContentProps) {
  return (
    <main className="ct-container flex flex-1 flex-col gap-6 py-8">
      <FlightsCheckoutFlightCard lang={lang} />
      <div className="flex gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <section className="overflow-hidden rounded-3xl border border-[#EAECF0] bg-white shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04)]">
            <header className="border-b border-[#EAECF0] px-4 py-5 md:px-6">
              <h2 className="text-[20px] leading-5 font-bold text-[#0C111D]">
                {copy.travelersTitle}
              </h2>
            </header>
            <FlightsCheckoutTravelerForm />
          </section>

          <section className="overflow-hidden rounded-3xl border border-[#EAECF0] bg-white shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04)]">
            <header className="border-b border-[#EAECF0] px-4 py-5 md:px-6">
              <h2 className="text-[20px] leading-5 font-bold text-[#0C111D]">
                {copy.contactTitle}
              </h2>
            </header>
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <PhoneInputField
                  label={copy.phoneLabel}
                  placeholder={copy.phonePlaceholder}
                  clearable
                />
                <StackedInputField
                  label={copy.emailLabel}
                  type="email"
                  autoComplete="email"
                  placeholder={copy.emailPlaceholder}
                />
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-3xl border border-[#EAECF0] bg-white shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04)]">
            <header className="border-b border-[#EAECF0] px-4 py-5 md:px-6">
              <h2 className="text-[20px] leading-5 font-bold text-[#0C111D]">
                {copy.additionalServicesTitle}
              </h2>
            </header>
            <div className="p-4 md:p-6">
              <FlightsCheckoutAdditionalServicesField />
            </div>
          </section>

          <FlightsCheckoutPaymentInformationSection />

          <PrimaryButton
            asChild
            size="xl"
            fullWidth
            trailingIcon={
              <ChevronDownIcon
                className="-rotate-90"
                width={20}
                height={20}
                aria-hidden
              />
            }
            className="rounded-full"
          >
            <Link href={checkoutResultHref}>
              {copy.completeBooking}
            </Link>
          </PrimaryButton>
        </div>
        <div>{/* right side   */}</div>
      </div>
    </main>
  )
}
