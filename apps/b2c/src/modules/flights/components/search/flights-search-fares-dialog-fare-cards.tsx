"use client"

import { RefreshCwIcon, XIcon } from "lucide-react"
import { BaggageIcon, CarryOnBagIcon, cn, PrimaryButton } from "ui"

import type { FareCard, FareFeature } from "./flights-search-fares-dialog.utils"

const successActive = "text-[#079455]"

function FareFeatureRow({ feature }: { feature: FareFeature }) {
  const active = feature.included
  const tone = active ? successActive : "text-[#98A2B3]"

  const icon = (() => {
    const iconClass = cn("size-5 shrink-0", tone)
    switch (feature.icon) {
      case "checked_bag":
        return <BaggageIcon className={iconClass} aria-hidden />
      case "carry_on":
        return <CarryOnBagIcon className={iconClass} aria-hidden />
      case "exchange":
        return active ? (
          <RefreshCwIcon className={iconClass} aria-hidden />
        ) : (
          <XIcon className={iconClass} aria-hidden />
        )
      case "refund":
        return <XIcon className={iconClass} aria-hidden />
      default:
        return null
    }
  })()

  return (
    <li className={cn("flex items-center gap-3", tone)}>
      {icon}
      <span className="text-sm leading-4 font-medium">{feature.label}</span>
    </li>
  )
}

function FareCardItem({
  fare,
  onSelect,
}: {
  fare: FareCard
  onSelect: (id: string) => void
}) {
  return (
    <article
      className={cn(
        "flex w-[270px] shrink-0 flex-col gap-4 rounded-xl bg-white p-4",
        fare.selected
          ? "border-primary border shadow-[0_0_0_1px_rgba(65,90,248,0.2)]"
          : "border border-[#EAECF0]"
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p className="font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) text-[15px] leading-[22px] font-normal text-[#111126]">
            {fare.title}
          </p>
          <p className="font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) text-[22px] leading-8 font-bold text-[#111126]">
            {fare.price}
          </p>
        </div>
        <ul className="flex flex-col gap-0.5">
          {fare.features.map((feature) => (
            <FareFeatureRow
              key={`${fare.id}-${feature.icon}-${feature.label}`}
              feature={feature}
            />
          ))}
        </ul>
      </div>
      <PrimaryButton
        fullWidth
        type="button"
        onClick={() => onSelect(fare.id)}
        className="h-10 rounded-[10px] px-2 py-2 font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) text-base leading-6 font-medium"
      >
        Выбрать
      </PrimaryButton>
    </article>
  )
}

type FlightsSearchFaresDialogFareCardsProps = {
  fareCards: FareCard[]
  onSelectFare: (fareId: string) => void
}

export function FlightsSearchFaresDialogFareCards({
  fareCards,
  onSelectFare,
}: FlightsSearchFaresDialogFareCardsProps) {
  return (
    <section className="mt-8 pb-1">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[minmax(270px,1fr)_minmax(270px,1fr)_minmax(270px,1fr)]">
        {fareCards.map((fare) => (
          <FareCardItem key={fare.id} fare={fare} onSelect={onSelectFare} />
        ))}
      </div>
    </section>
  )
}
