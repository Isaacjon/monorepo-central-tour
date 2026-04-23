"use client"

import { useCallback, useState } from "react"

import { cn } from "ui"

const MIN_MINUTES = 8 * 60
const MAX_MINUTES = 22 * 60
const STEP = 15

function formatTime(totalMinutes: number) {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return `${h}:${m.toString().padStart(2, "0")}`
}

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

  const span = MAX_MINUTES - MIN_MINUTES
  const leftPct = ((lo - MIN_MINUTES) / span) * 100
  const rightPct = ((MAX_MINUTES - hi) / span) * 100

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between gap-2 text-sm font-normal text-[#0C111D]">
        <time className="rounded-lg border border-[#EAECF0] bg-white px-2 py-1.5 leading-4">
          {formatTime(lo)}
        </time>
        <time className="rounded-lg border border-[#EAECF0] bg-white px-2 py-1.5 leading-4">
          {formatTime(hi)}
        </time>
      </div>
      <div className="relative h-8 pt-1" aria-label={a11yLabel} role="group">
        <div
          className="pointer-events-none absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-[#EAECF0]"
          aria-hidden
        />
        <div
          className="bg-primary pointer-events-none absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full"
          style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
          aria-hidden
        />
        <input
          type="range"
          min={MIN_MINUTES}
          max={MAX_MINUTES}
          step={STEP}
          value={lo}
          onChange={(e) => onLo(Number(e.target.value))}
          className="range-thumb pointer-events-auto absolute top-0 z-20 h-8 w-full cursor-pointer appearance-none bg-transparent"
        />
        <input
          type="range"
          min={MIN_MINUTES}
          max={MAX_MINUTES}
          step={STEP}
          value={hi}
          onChange={(e) => onHi(Number(e.target.value))}
          className="range-thumb pointer-events-auto absolute top-0 z-10 h-8 w-full cursor-pointer appearance-none bg-transparent"
        />
      </div>
    </div>
  )
}
