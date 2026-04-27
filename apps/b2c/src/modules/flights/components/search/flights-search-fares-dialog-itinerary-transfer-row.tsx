"use client"

import { CircleAlert } from "lucide-react"
import {
  ArrowSwapIcon,
  ShieldPlusIcon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "ui"

import { ITINERARY_TRACK_GRID } from "./flights-search-fares-dialog-itinerary-layout"
import { formatRouteDurationMinutes } from "../../utils/flight-offer-ui-format"

export type FlightsSearchFaresDialogItineraryTransferRowProps = {
  cityName: string | undefined
  transferDurationMinutes: number | null | undefined
  baggageRecheck: boolean
  /** Airport name (or code) in the tooltip after the main sentence. */
  recheckAirportLabel: string
}

export function FlightsSearchFaresDialogItineraryTransferRow({
  cityName,
  transferDurationMinutes,
  baggageRecheck,
  recheckAirportLabel,
}: FlightsSearchFaresDialogItineraryTransferRowProps) {
  const baggageRecheckTooltip = `Требуется получить и повторно зарегистрировать багаж (${recheckAirportLabel})`

  return (
    <div className={ITINERARY_TRACK_GRID}>
      <div className="min-w-0 shrink-0" aria-hidden />
      <div
        className="relative flex min-h-0 w-full min-w-0 flex-col items-center self-stretch overflow-visible"
        aria-hidden
      >
        <span className="min-h-0 w-0 flex-1 shrink-0 border-l border-dashed border-[#98A2B3]" />
        <div className="relative z-1 flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-solid border-[#98A2B3] bg-white text-[#98A2B3]">
          <ArrowSwapIcon width={12} height={12} />
        </div>
        <span className="min-h-0 w-0 flex-1 shrink-0 border-l border-dashed border-[#98A2B3]" />
      </div>
      <div className="my-5 min-w-0">
        <div className="box-border flex min-h-[61px] w-[min(100%,424px)] shrink-0 flex-col gap-1 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-3 py-2 font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif)">
          <p className="text-[14px] leading-5 font-medium tracking-normal text-[#98A2B3]">
            Самостоятельная стыковка в г. {cityName ?? "—"}{" "}
            {transferDurationMinutes != null && transferDurationMinutes > 0
              ? formatRouteDurationMinutes(transferDurationMinutes)
              : ""}
          </p>
          {baggageRecheck ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="decoration-c-error-500 focus-visible:ring-c-error-500/30 inline-flex max-w-full cursor-help items-center gap-1 rounded-sm border-0 bg-transparent p-0 text-left underline underline-offset-2 outline-none focus-visible:ring-2"
                >
                  <CircleAlert
                    className="text-c-error-500 size-4 shrink-0"
                    aria-hidden
                  />
                  <span className="text-c-error-500 text-[12px] leading-[18px] font-medium tracking-normal">
                    Требуется получить и повторно зарегистрировать багаж
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="start"
                className="z-100 flex w-[333px] flex-col gap-3 rounded-xl border-0 bg-white px-4 py-3 font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) text-sm leading-5 font-medium tracking-normal text-black shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04),0px_2px_8px_0px_rgba(0,0,0,0.08)]"
              >
                {baggageRecheckTooltip}
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-1 text-[#17B26A]">
              <ShieldPlusIcon
                width={16}
                height={16}
                className="shrink-0 text-[#17B26A]"
                aria-hidden
              />
              <span className="text-[12px] leading-[18px] font-medium tracking-normal">
                Гарантия безопасной поездки
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
