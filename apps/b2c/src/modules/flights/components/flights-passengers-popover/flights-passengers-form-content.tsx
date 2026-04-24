"use client"

import { X } from "lucide-react"
import { useTranslations } from "next-intl"
import { ChevronDownIcon, RadioGroup, RadioGroupItem, cn } from "ui"

import type { FlightCabin } from "../../types/flight-passengers"
import {
  FLIGHT_CHILD_AGE_OPTIONS,
  FLIGHT_MAX_PASSENGERS_PER_TYPE,
} from "../../types/flight-passengers"
import { GuestPickerStepper } from "@/shared/components/guest-picker-stepper"

const CABIN_OPTIONS: FlightCabin[] = [
  "economy",
  "comfort",
  "business",
  "first",
]

const CABIN_MESSAGE_KEY: Record<
  FlightCabin,
  "cabinEconomy" | "cabinComfort" | "cabinBusiness" | "cabinFirst"
> = {
  economy: "cabinEconomy",
  comfort: "cabinComfort",
  business: "cabinBusiness",
  first: "cabinFirst",
}

type FlightsPassengersFormContentProps = {
  draftAdults: number
  draftChildren: number
  draftChildAges: (number | undefined)[]
  draftCabin: FlightCabin
  setDraftAdults: (delta: number) => void
  setDraftChildren: (delta: number) => void
  setDraftChildAge: (childIndex: number, age: number | undefined) => void
  setDraftCabin: (cabin: FlightCabin) => void
  save: () => void
}

const sectionTitleClass = "text-xl leading-6 font-bold text-[#0C111D]"

export function FlightsPassengersFormContent({
  draftAdults,
  draftChildren,
  draftChildAges,
  draftCabin,
  setDraftAdults,
  setDraftChildren,
  setDraftChildAge,
  setDraftCabin,
  save,
}: FlightsPassengersFormContentProps) {
  const t = useTranslations("flights")

  return (
    <>
      <div className="flex max-h-[min(70vh,640px)] flex-col overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          <h3 className={sectionTitleClass}>{t("passengersSectionTitle")}</h3>

          <div className="flex items-center justify-between gap-3">
            <span className="text-base leading-6 text-[#0C111D]">
              {t("guestPickerAdults")}
            </span>
            <GuestPickerStepper
              value={draftAdults}
              onDecrement={() => setDraftAdults(-1)}
              onIncrement={() => setDraftAdults(1)}
              canDecrement={draftAdults > 1}
              canIncrement={draftAdults < FLIGHT_MAX_PASSENGERS_PER_TYPE}
              decrementLabel={t("guestPickerAdultsDecrease")}
              incrementLabel={t("guestPickerAdultsIncrease")}
            />
          </div>

          <div
            className={cn(
              "flex gap-3",
              draftChildren > 0
                ? "items-start justify-between"
                : "items-center justify-between"
            )}
          >
            <div className="flex min-w-0 flex-col gap-1.5 text-left">
              <span className="text-base leading-6 text-[#0C111D]">
                {t("guestPickerChildren")}
              </span>
              <span className="text-xs leading-[18px] text-[#98A2B3]">
                {t("guestPickerChildrenAgeHint")}
              </span>
            </div>
            <GuestPickerStepper
              value={draftChildren}
              onDecrement={() => setDraftChildren(-1)}
              onIncrement={() => setDraftChildren(1)}
              canDecrement={draftChildren > 0}
              canIncrement={draftChildren < FLIGHT_MAX_PASSENGERS_PER_TYPE}
              decrementLabel={t("guestPickerChildrenDecrease")}
              incrementLabel={t("guestPickerChildrenIncrease")}
            />
          </div>

          {draftChildren > 0 && (
            <div className="flex flex-col gap-1.5">
              {draftChildAges.map((age, childIndex) => (
                <div key={childIndex}>
                  {age === undefined ? (
                    <label className="block">
                      <span className="sr-only">
                        {t("guestPickerChildAgeLabel", {
                          n: childIndex + 1,
                        })}
                      </span>
                      <div className="relative">
                        <select
                          className="w-full cursor-pointer appearance-none rounded-lg border border-[#EAECF0] bg-white px-3 py-3 pr-10 text-base text-[#0C111D] focus:border-[#4765FF] focus:ring-1 focus:ring-[#4765FF] focus:outline-none"
                          value=""
                          onChange={(e) => {
                            const v = e.target.value
                            if (v === "") return
                            setDraftChildAge(
                              childIndex,
                              Number.parseInt(v, 10)
                            )
                          }}
                        >
                          <option value="" disabled>
                            {t("guestPickerAgePlaceholder")}
                          </option>
                          {FLIGHT_CHILD_AGE_OPTIONS.map((a) => (
                            <option key={a} value={a}>
                              {t("guestPickerAgeOption", { age: a })}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon
                          width={20}
                          height={20}
                          aria-hidden
                          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#98A2B3]"
                        />
                      </div>
                    </label>
                  ) : (
                    <div className="flex items-center justify-between gap-2 rounded-lg border border-[#EAECF0] bg-white px-3 py-3">
                      <span className="text-base text-[#0C111D]">
                        {t("guestPickerAgeOption", { age })}
                      </span>
                      <button
                        type="button"
                        className="text-[#98A2B3] transition-colors hover:text-[#0C111D]"
                        onClick={() => setDraftChildAge(childIndex, undefined)}
                        aria-label={t("guestPickerClearChildAge")}
                      >
                        <X className="size-5" strokeWidth={1.5} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="my-4 h-px shrink-0 bg-[#EAECF0]" role="separator" />

        <div className="flex flex-col gap-4">
          <h3 className={sectionTitleClass}>
            {t("serviceClassSectionTitle")}
          </h3>
          <RadioGroup
            value={draftCabin}
            onValueChange={(v) => setDraftCabin(v as FlightCabin)}
            className={cn("flex flex-col gap-3")}
          >
            {CABIN_OPTIONS.map((cabin) => {
              const id = `flight-cabin-${cabin}`
              return (
                <label
                  key={cabin}
                  htmlFor={id}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <RadioGroupItem value={cabin} id={id} />
                  <span className="text-base leading-6 text-[#0C111D]">
                    {t(CABIN_MESSAGE_KEY[cabin])}
                  </span>
                </label>
              )
            })}
          </RadioGroup>
        </div>
      </div>

      <div className="border-t border-[#EAECF0] p-4">
        <button
          type="button"
          className="bg-primary hover:opacity-95 min-h-10 w-full rounded-xl px-[18px] py-2.5 text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          onClick={save}
        >
          {t("guestPickerSave")}
        </button>
      </div>
    </>
  )
}
