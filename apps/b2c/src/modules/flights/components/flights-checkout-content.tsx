"use client"

import Image from "next/image"
import {
  CarryingSuitcaseIcon,
  ChevronDownIcon,
  LuggageIcon,
  PrimaryButton,
  PhoneInputField,
  StackedInputField,
  TurkishAirlinesIcon,
  checkoutSuccessIcon,
} from "ui"
import { RefreshCwIcon, XIcon } from "lucide-react"

import { FlightsCheckoutAdditionalServicesField } from "./flights-checkout-additional-services-field"
import { FlightsCheckoutFlightCard } from "./flights-checkout-flight-card"
import { FlightsCheckoutPaymentInformationSection } from "./flights-checkout-payment-information-section"
import { FlightsCheckoutTravelerForm } from "./flights-checkout-traveler-form"
import { useState } from "react"

type FlightsCheckoutContentProps = {
  lang: string
}

export function FlightsCheckoutContent({ lang }: FlightsCheckoutContentProps) {
  const [isConfirmed, setIsConfirmed] = useState(false)

  if (isConfirmed) {
    return (
      <main className="ct-container flex flex-1 items-center justify-center py-8">
        <section className="flex w-full max-w-[936px] flex-col items-center text-center">
          <Image
            src={checkoutSuccessIcon}
            alt="Booking confirmed"
            width={132}
            height={132}
            priority
          />
          <h1 className="mt-6 text-[28px] leading-[100%] font-bold text-[#101828]">
            Ваше бронирование подтверждено
          </h1>
          <p className="mt-4 text-[20px] leading-[100%] font-normal text-[#667085]">
            Ваше бронирование подтверждено, и ваш регистрационный номер - CBH06310
          </p>

          <PrimaryButton size="xl" className="mt-8 min-w-[220px] rounded-xl px-6">
            Продолжить
          </PrimaryButton>

          <div className="mt-9 h-[106px] w-full rounded-[16px] border border-[#EAECF0] bg-white p-4 text-left">
            <div className="flex h-full items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-6 items-center justify-center rounded-[100px] bg-[#ECFDF3]">
                    <TurkishAirlinesIcon width={24} height={24} aria-hidden />
                  </span>
                  <span className="text-[15px] leading-[22px] font-normal text-[#5B6871]">
                    Turkish airlines
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="size-3 rounded-full border-2 border-[#D0D5DD]" />
                    <span className="h-9 w-px bg-[#D0D5DD]" />
                    <span className="size-3 rounded-full border-2 border-[#D0D5DD]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[16px] leading-[22px] font-bold text-[#000000]">
                      08:50{" "}
                      <span className="text-[15px] leading-[22px] font-normal text-[#111126]">
                        29 март, вс
                      </span>
                    </p>
                    <p className="text-[16px] leading-[22px] font-bold text-[#000000]">
                      14:10{" "}
                      <span className="text-[15px] leading-[22px] font-normal text-[#111126]">
                        29 март, вс
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex h-[74px] w-[155px] flex-col justify-between rounded-[12px] bg-[#F9FAFB] p-3">
                <span className="text-[15px] leading-[22px] font-normal text-[#111126]">
                  Economy premium
                </span>
                <div className="flex items-center gap-[6px]">
                  <CarryingSuitcaseIcon
                    className="size-5 text-[#09A112]"
                    aria-hidden
                  />
                  <LuggageIcon className="size-5 text-[#98A2B3]" aria-hidden />
                  <XIcon className="size-5 text-[#98A2B3]" aria-hidden />
                  <RefreshCwIcon className="size-5 text-[#98A2B3]" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="ct-container flex flex-1 flex-col gap-6 py-8">
      <FlightsCheckoutFlightCard lang={lang} />
      <div className="flex gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <section className="overflow-hidden rounded-3xl border border-[#EAECF0] bg-white shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04)]">
            <header className="border-b border-[#EAECF0] px-4 py-5 md:px-6">
              <h2 className="text-[20px] leading-5 font-bold text-[#0C111D]">
                Кто путешествует?
              </h2>
            </header>
            <FlightsCheckoutTravelerForm />
          </section>

          <section className="overflow-hidden rounded-3xl border border-[#EAECF0] bg-white shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04)]">
            <header className="border-b border-[#EAECF0] px-4 py-5 md:px-6">
              <h2 className="text-[20px] leading-5 font-bold text-[#0C111D]">
                Контактные данные
              </h2>
            </header>
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <PhoneInputField
                  label="Номер телефона"
                  placeholder="+998 (__) ___-__-__"
                  clearable
                />
                <StackedInputField
                  label="Почта"
                  type="email"
                  autoComplete="email"
                  placeholder="example@mail.com"
                />
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-3xl border border-[#EAECF0] bg-white shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04)]">
            <header className="border-b border-[#EAECF0] px-4 py-5 md:px-6">
              <h2 className="text-[20px] leading-5 font-bold text-[#0C111D]">
                Дополнительные услуги
              </h2>
            </header>
            <div className="p-4 md:p-6">
              <FlightsCheckoutAdditionalServicesField />
            </div>
          </section>

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
            onClick={() => setIsConfirmed(true)}
          >
            Завершить бронирование
          </PrimaryButton>
        </div>
        <div>{/* right side   */}</div>
      </div>
    </main>
  )
}
