"use client"

import Image from "next/image"
import Link from "next/link"
import { checkoutSuccessIcon, PrimaryButton } from "ui"

type FlightsCheckoutSuccessViewProps = {
  detailsHref: string
}

export function FlightsCheckoutSuccessView({
  detailsHref,
}: FlightsCheckoutSuccessViewProps) {
  return (
    <main className="ct-container flex flex-1 items-center justify-center py-8">
      <section className="flex w-full max-w-[760px] flex-col items-center text-center">
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

        <PrimaryButton asChild size="xl" className="mt-8 min-w-[220px] rounded-xl px-6">
          <Link href={detailsHref}>Продолжить</Link>
        </PrimaryButton>
      </section>
    </main>
  )
}
