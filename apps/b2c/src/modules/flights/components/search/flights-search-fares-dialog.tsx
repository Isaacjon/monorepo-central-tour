"use client"

import { XIcon } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useMemo } from "react"
import {
  ArrowRightIcon,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  PrimaryButton,
} from "ui"

import { FlightsSearchFaresDialogFareCards } from "./flights-search-fares-dialog-fare-cards"
import { FlightsSearchFaresDialogItinerary } from "./flights-search-fares-dialog-itinerary"
import {
  type FareCard,
  formatMiniRuleWeight,
  getFareTitleFromOffer,
} from "./flights-search-fares-dialog.utils"
import type { FlightOfferApi } from "../../types/flight-offers-search-api"
import {
  formatOfferPrice,
  formatRouteDurationMinutes,
} from "../../utils/flight-offer-ui-format"

type FlightsSearchFaresDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  offer: FlightOfferApi
  metaCurrency: string
}

export function FlightsSearchFaresDialog({
  open,
  onOpenChange,
  offer,
  metaCurrency,
}: FlightsSearchFaresDialogProps) {
  const params = useParams<{ lang?: string }>()
  const lang = params?.lang ?? "en"
  const firstDirection = offer.directions[0]

  const firstSegment = firstDirection?.segments[0]
  const lastSegment =
    firstDirection?.segments[firstDirection.segments.length - 1] ?? firstSegment

  const title = useMemo(() => {
    if (!firstSegment) return { from: "Рейс", to: "—" }
    const from =
      firstSegment.departure.cityName || firstSegment.departure.airportCode
    const to =
      lastSegment?.arrival.cityName || lastSegment?.arrival.airportCode || "—"
    return { from, to }
  }, [firstSegment, lastSegment])

  const dateLabel = firstSegment?.departure.date ?? "12 марта 2023 г"
  const routeDuration = firstSegment
    ? formatRouteDurationMinutes(firstSegment.routeDurationMinutes)
    : "10ч 55м"

  const fareCards = useMemo<FareCard[]>(() => {
    const currency = offer.price.currency || metaCurrency
    const directionRule = firstDirection?.miniRules

    const carryOnWeight = formatMiniRuleWeight(
      directionRule?.carry_on_baggage.weight ?? null
    )
    const checkedWeight = formatMiniRuleWeight(
      directionRule?.baggage.weight ?? null
    )
    const hasCarryOn = Boolean(directionRule?.carry_on_baggage.is_available)
    const hasChecked = Boolean(directionRule?.baggage.is_available)
    const refundRule = directionRule?.refund.before_departure
    const exchangeRule = directionRule?.exchange.before_departure
    const refundable = refundRule?.is_available ?? offer.rules.isRefundable
    const exchangeable = exchangeRule?.is_available ?? offer.rules.isChangeable

    const exchangeLabel = !exchangeable
      ? "Обмен недоступен"
      : exchangeRule?.is_free === false
        ? "Обмен со сбором"
        : "Обмен"

    return [
      {
        id: offer.offerId,
        title: getFareTitleFromOffer(offer),
        price: formatOfferPrice(offer.price.amount, currency),
        selected: true,
        features: [
          {
            label: carryOnWeight
              ? `Ручная кладь до ${carryOnWeight}`
              : "Ручная кладь",
            included: hasCarryOn,
            icon: "carry_on",
          },
          {
            label: checkedWeight ? `Багаж ${checkedWeight}` : "Багаж",
            included: hasChecked,
            icon: "checked_bag",
          },
          { label: "Без возврата", included: refundable, icon: "refund" },
          { label: exchangeLabel, included: exchangeable, icon: "exchange" },
        ],
      },
    ]
  }, [firstDirection, metaCurrency, offer])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex h-[min(669px,calc(100vh-3rem))] w-[min(856px,calc(100%-2rem))] max-w-none flex-col gap-0 overflow-hidden rounded-3xl border-none p-0 shadow-[0_25px_55px_rgba(16,24,40,0.2)] sm:max-w-[min(856px,calc(100%-2rem))]"
      >
        <div className="min-h-0 flex-1 overflow-y-auto bg-white p-6 pb-28">
          <div className="flex items-start justify-between gap-3">
            <div>
              <DialogTitle className="font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) text-[28px] leading-8 font-bold text-[#111126]">
                <span className="flex items-center gap-[6px]">
                  <span>{title.from}</span>
                  <span
                    className="inline-flex size-5 items-center justify-center"
                    aria-hidden
                  >
                    <ArrowRightIcon className="size-5 text-[#111126]" />
                  </span>
                  <span>{title.to}</span>
                </span>
              </DialogTitle>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[15px] leading-6 text-[#344054]">
                <span className="rounded-lg bg-[#415AF8] px-3 py-1 text-sm leading-5 font-medium text-white">
                  Билет
                </span>
                <span>{dateLabel}</span>
                <span aria-hidden>•</span>
                <span>Продолжительность: {routeDuration}</span>
              </div>
            </div>
            <DialogClose asChild>
              <button
                type="button"
                className="rounded-md p-2 text-[#98A2B3] transition-colors hover:bg-[#F2F4F7] hover:text-[#667085]"
                aria-label="Close"
              >
                <XIcon className="size-5" aria-hidden />
              </button>
            </DialogClose>
          </div>

          <FlightsSearchFaresDialogItinerary
            segments={firstDirection?.segments ?? []}
          />

          <FlightsSearchFaresDialogFareCards fareCards={fareCards} />
        </div>

        <footer className="absolute right-0 bottom-0 left-0 flex items-center justify-end gap-3 bg-[#F2F4F7] p-4">
          <p className="flex items-center gap-[6px] font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) text-2xl">
            <span className="leading-8 font-normal text-[#98A2B3]">от</span>
            <span className="leading-none font-bold text-[#0C111D]">
              {formatOfferPrice(
                offer.price.amount,
                offer.price.currency || metaCurrency
              )}
            </span>
          </p>
          <PrimaryButton
            asChild
            className="min-w-[190px] rounded-xl px-8 py-3 text-lg leading-6 font-medium"
          >
            <Link href={`/${lang}/flights/checkout`}>Продолжить</Link>
          </PrimaryButton>
        </footer>
      </DialogContent>
    </Dialog>
  )
}
