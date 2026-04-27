"use client"

import { useTranslations } from "next-intl"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  ChevronDownIcon,
  cn,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "ui"

import { FlightsPassengersFormContent } from "./flights-passengers-form-content"
import {
  type FlightCabin,
  type FlightPassengersSelection,
  normalizeFlightPassengersSelection,
} from "../../../types/flight-passengers"

export type { FlightCabin, FlightPassengersSelection }

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

type FlightsPassengersPopoverProps = {
  passengersLabel: string
  className?: string
  triggerClassName?: string
  minWidth?: number
  /** Seeds saved/draft state on mount (e.g. from URL). */
  initialPassengers?: FlightPassengersSelection
  onChange?: (value: FlightPassengersSelection) => void
}

export function FlightsPassengersPopover({
  passengersLabel,
  className,
  triggerClassName,
  minWidth = 160,
  initialPassengers,
  onChange,
}: FlightsPassengersPopoverProps) {
  const t = useTranslations("flights")
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState<FlightPassengersSelection>(() =>
    normalizeFlightPassengersSelection(initialPassengers)
  )
  const [draft, setDraft] = useState<FlightPassengersSelection>(() =>
    normalizeFlightPassengersSelection(initialPassengers)
  )

  const openPopover = useCallback(
    (next: boolean) => {
      setOpen(next)
      if (next) {
        setDraft({ ...saved })
      }
    },
    [saved]
  )

  const summaryTotal = useMemo(
    () => saved.adults + saved.children,
    [saved.adults, saved.children]
  )

  useEffect(() => {
    onChange?.({ ...saved })
  }, [onChange, saved])

  const setDraftAdults = (delta: number) => {
    setDraft((prev) => ({
      ...prev,
      adults: clamp(prev.adults + delta, 1, 9),
    }))
  }

  const setDraftChildren = (delta: number) => {
    setDraft((prev) => {
      const nextChildren = clamp(prev.children + delta, 0, 9)
      let childAges = [...prev.childAges]
      if (nextChildren < childAges.length) {
        childAges = childAges.slice(0, nextChildren)
      } else {
        while (childAges.length < nextChildren) {
          childAges.push(undefined)
        }
      }
      return { ...prev, children: nextChildren, childAges }
    })
  }

  const setDraftChildAge = (childIndex: number, age: number | undefined) => {
    setDraft((prev) => {
      const childAges = [...prev.childAges]
      childAges[childIndex] = age
      return { ...prev, childAges }
    })
  }

  const setDraftCabin = (cabin: FlightCabin) => {
    setDraft((prev) => ({ ...prev, cabin }))
  }

  const save = () => {
    setSaved({ ...draft })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={openPopover}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex min-h-[54px] max-w-[220px] min-w-0 shrink-0 flex-col justify-center rounded-xl border border-[#D0D5DD] bg-white px-3 py-2 text-left transition-colors",
            "focus-visible:ring-primary hover:border-[#98A2B3] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            triggerClassName,
            className
          )}
          style={{ minWidth }}
        >
          <span className="text-xs leading-none text-[#667085]">
            {passengersLabel}
          </span>
          <div className="mt-1 flex min-w-0 items-center justify-between gap-2">
            <span className="min-w-0 flex-1 truncate text-sm leading-none font-medium text-[#101828]">
              {t("filterPassengersCount", { count: summaryTotal })}
            </span>
            <ChevronDownIcon
              width={20}
              height={20}
              aria-hidden
              className="text-c-gray-950 shrink-0"
            />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        className="w-[min(100vw-24px,336px)] border-[#EAECF0] p-0 shadow-[0px_12px_16px_0px_rgba(16,24,40,0.08),0px_4px_6px_0px_rgba(16,24,40,0.03)]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <FlightsPassengersFormContent
          draftAdults={draft.adults}
          draftChildren={draft.children}
          draftChildAges={draft.childAges}
          draftCabin={draft.cabin}
          setDraftAdults={setDraftAdults}
          setDraftChildren={setDraftChildren}
          setDraftChildAge={setDraftChildAge}
          setDraftCabin={setDraftCabin}
          save={save}
        />
      </PopoverContent>
    </Popover>
  )
}
