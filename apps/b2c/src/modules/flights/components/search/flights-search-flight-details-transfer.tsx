"use client"

import { useTranslations } from "next-intl"
import { CarryingSuitcaseIcon } from "ui"

type FlightsSearchFlightDetailsTransferProps = {
  cityName: string
  /** Layover in minutes; when missing, the duration is omitted on the right. */
  layoverMinutes?: number
}

export function FlightsSearchFlightDetailsTransfer({
  cityName,
  layoverMinutes,
}: FlightsSearchFlightDetailsTransferProps) {
  const t = useTranslations("flights")
  return (
    <div
      className="flex h-8 w-full min-w-0 items-center justify-between gap-2 rounded-[12px] bg-white px-3 py-1"
      role="status"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 text-[13px] leading-6 text-[#111126]">
        <CarryingSuitcaseIcon
          className="size-5 shrink-0"
          width={20}
          height={20}
          aria-hidden
        />
        <span className="min-w-0 truncate">
          {t("searchFlightTransferInCity", { city: cityName })}
        </span>
      </div>
      {layoverMinutes != null ? (
        <span className="shrink-0 text-[13px] leading-6 font-normal text-black">
          {t("searchFlightDetailsTransferDuration", {
            minutes: layoverMinutes,
          })}
        </span>
      ) : null}
    </div>
  )
}
