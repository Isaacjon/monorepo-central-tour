"use client"

import { useTranslations } from "next-intl"
import { useCallback, useState } from "react"

import { cn, Slider, TimeInputField } from "ui"

const MIN_MINUTES = 8 * 60
const MAX_MINUTES = 22 * 60
const STEP = 15

type FlightsDualTimeRangeProps = {
  /** Accessible name for the control group */
  a11yLabel: string
  className?: string
}

/**
 * Min/max time window (8:00–22:00) with a dual thumb control.
 */
export function FlightsDualTimeRange({
  a11yLabel,
  className,
}: FlightsDualTimeRangeProps) {
  const [lo, setLo] = useState(MIN_MINUTES)
  const [hi, setHi] = useState(MAX_MINUTES)
  const t = useTranslations("flights")

  const onLo = useCallback(
    (v: number) => {
      const n = Math.min(v, hi - STEP)
      setLo(Math.max(MIN_MINUTES, n))
    },
    [hi]
  )
  const onHi = useCallback(
    (v: number) => {
      const n = Math.max(v, lo + STEP)
      setHi(Math.min(MAX_MINUTES, n))
    },
    [lo]
  )

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex h-10 items-center justify-between gap-3 text-sm font-normal text-[#0C111D]">
        <TimeInputField
          valueMinutes={lo}
          onValueMinutesChange={onLo}
          minMinutes={MIN_MINUTES}
          maxMinutes={hi - STEP}
          stepMinutes={STEP}
          aria-label={t("searchSidebarTimeEarliest")}
        />
        <TimeInputField
          valueMinutes={hi}
          onValueMinutesChange={onHi}
          minMinutes={lo + STEP}
          maxMinutes={MAX_MINUTES}
          stepMinutes={STEP}
          aria-label={t("searchSidebarTimeLatest")}
        />
      </div>
      <div
        className="mx-auto w-full max-w-56 pt-0.5"
        role="group"
        aria-label={a11yLabel}
      >
        <Slider
          className="w-full"
          min={MIN_MINUTES}
          max={MAX_MINUTES}
          step={STEP}
          value={[lo, hi]}
          onValueChange={([a, b]) => {
            const nextLo = Math.max(MIN_MINUTES, Math.min(a, b - STEP))
            const nextHi = Math.min(MAX_MINUTES, Math.max(b, a + STEP))
            setLo(nextLo)
            setHi(nextHi)
          }}
        />
      </div>
    </div>
  )
}
