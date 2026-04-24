"use client"

import {
  BriefcaseBusinessIcon,
  CheckIcon,
  RefreshCwIcon,
  XIcon,
} from "lucide-react"
import { PrimaryButton, cn } from "ui"

import type { FareCard, FareFeature } from "./flights-search-fares-dialog.utils"

function FareFeatureRow({ feature }: { feature: FareFeature }) {
  const positive = feature.included
  return (
    <li
      className={cn(
        "flex items-center gap-2",
        positive ? "text-[#079455]" : "text-[#98A2B3]"
      )}
    >
      {feature.icon === "luggage" || feature.icon === "checked" ? (
        <BriefcaseBusinessIcon className="size-[18px] shrink-0" aria-hidden />
      ) : feature.icon === "exchange" ? (
        <RefreshCwIcon className="size-[18px] shrink-0" aria-hidden />
      ) : positive ? (
        <CheckIcon className="size-[18px] shrink-0" aria-hidden />
      ) : (
        <XIcon className="size-[18px] shrink-0" aria-hidden />
      )}
      <span className="text-base leading-[22px] font-normal">{feature.label}</span>
    </li>
  )
}

function FareCardItem({ fare }: { fare: FareCard }) {
  return (
    <article
      className={cn(
        "min-w-[270px] flex-1 rounded-2xl border bg-[#F8FAFC] p-4",
        fare.selected
          ? "border-primary bg-white shadow-[0_0_0_1px_rgba(65,90,248,0.2)]"
          : "border-[#EAECF0]"
      )}
    >
      <p className="text-2xl leading-6 font-medium text-[#111126]">{fare.title}</p>
      <p className="mt-2 text-[38px] leading-[38px] font-bold text-[#111126]">
        {fare.price}
      </p>
      <ul className="mt-3 space-y-2">
        {fare.features.map((feature) => (
          <FareFeatureRow key={`${fare.title}-${feature.label}`} feature={feature} />
        ))}
      </ul>
      <PrimaryButton className="mt-4 w-full rounded-xl py-3 text-lg leading-6 font-medium">
        Выбрать
      </PrimaryButton>
    </article>
  )
}

type FlightsSearchFaresDialogFareCardsProps = {
  fareCards: FareCard[]
}

export function FlightsSearchFaresDialogFareCards({
  fareCards,
}: FlightsSearchFaresDialogFareCardsProps) {
  return (
    <section className="mt-8 overflow-x-auto pb-1">
      <div className="flex min-w-[320px] gap-4">
        {fareCards.map((fare) => (
          <FareCardItem key={`${fare.title}-${fare.price}`} fare={fare} />
        ))}
      </div>
    </section>
  )
}
