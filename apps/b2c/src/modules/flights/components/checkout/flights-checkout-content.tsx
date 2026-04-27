"use client"

import { useRouter } from "@central-tour/config/i18n/navigation"
import { useState } from "react"

import {
  ChevronDownIcon,
  PhoneInputField,
  PrimaryButton,
  StackedInputField,
} from "ui"

import { FlightsCheckoutAdditionalServicesField } from "./flights-checkout-additional-services-field"
import { FlightsCheckoutBaggageAllowanceSection } from "./flights-checkout-baggage-allowance-section"
import { FlightsCheckoutFlightCard } from "./flights-checkout-flight-card"
import { FlightsCheckoutOtpDialog } from "./flights-checkout-otp-dialog"
import { FlightsCheckoutPaymentInformationSection } from "./flights-checkout-payment-information-section"
import { FlightsCheckoutTravelerForm } from "./flights-checkout-traveler-form"
import { useCheckoutAuthFlow } from "../../hooks/use-checkout-auth-flow"
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
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [fatherName, setFatherName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const {
    isOtpOpen,
    otp,
    otpInvalid,
    otpDestination,
    resendSeconds,
    isSendingOtp,
    isConfirmingOtp,
    beginAuthentication,
    onOtpChange,
    confirmOtp,
    resendOtp,
    closeOtp,
  } = useCheckoutAuthFlow(() => {
    router.push(checkoutResultHref)
  })

  async function handleCompleteBooking() {
    await beginAuthentication({
      firstName,
      lastName,
      middleName: fatherName,
      phone,
      email,
    })
  }

  return (
    <>
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
              <FlightsCheckoutTravelerForm
                firstName={firstName}
                lastName={lastName}
                fatherName={fatherName}
                onFirstNameChange={setFirstName}
                onLastNameChange={setLastName}
                onFatherNameChange={setFatherName}
              />
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
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                  <StackedInputField
                    label={copy.emailLabel}
                    type="email"
                    autoComplete="email"
                    placeholder={copy.emailPlaceholder}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
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

            <FlightsCheckoutBaggageAllowanceSection copy={copy} />

            <FlightsCheckoutPaymentInformationSection />

            <PrimaryButton
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
              onClick={handleCompleteBooking}
              disabled={isSendingOtp || isConfirmingOtp}
            >
              {copy.completeBooking}
            </PrimaryButton>
          </div>
          <div>{/* right side   */}</div>
        </div>
      </main>

      <FlightsCheckoutOtpDialog
        open={isOtpOpen}
        otp={otp}
        otpInvalid={otpInvalid}
        otpDestination={otpDestination}
        resendSeconds={resendSeconds}
        isSendingOtp={isSendingOtp}
        isConfirmingOtp={isConfirmingOtp}
        onOtpChange={onOtpChange}
        onConfirm={confirmOtp}
        onResend={resendOtp}
        onClose={closeOtp}
      />
    </>
  )
}
