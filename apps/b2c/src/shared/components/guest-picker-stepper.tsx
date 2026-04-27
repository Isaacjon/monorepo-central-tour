"use client"

import { Minus, Plus } from "lucide-react"
import { cn } from "ui"

type GuestPickerStepperProps = {
  value: number
  onDecrement: () => void
  onIncrement: () => void
  canDecrement: boolean
  canIncrement: boolean
  decrementLabel: string
  incrementLabel: string
}

export function GuestPickerStepper({
  value,
  onDecrement,
  onIncrement,
  canDecrement,
  canIncrement,
  decrementLabel,
  incrementLabel,
}: GuestPickerStepperProps) {
  return (
    <div className="flex w-[136px] shrink-0 items-center justify-between">
      <button
        type="button"
        onClick={onDecrement}
        disabled={!canDecrement}
        aria-label={decrementLabel}
        className={cn(
          "flex items-center justify-center rounded-lg p-2 transition-colors",
          canDecrement
            ? "focus-visible:ring-primary bg-[#F9FAFB] hover:bg-[#F2F4F7] focus-visible:ring-2"
            : "cursor-not-allowed bg-[#F2F4F7] opacity-50"
        )}
      >
        <Minus className="size-6 text-[#0C111D]" strokeWidth={1.5} />
      </button>
      <span className="text-lg font-medium text-[#0C111D] tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={!canIncrement}
        aria-label={incrementLabel}
        className={cn(
          "flex items-center justify-center rounded-lg p-2 transition-colors",
          canIncrement
            ? "focus-visible:ring-primary bg-[#F9FAFB] hover:bg-[#F2F4F7] focus-visible:ring-2"
            : "cursor-not-allowed bg-[#F2F4F7] opacity-50"
        )}
      >
        <Plus className="size-6 text-[#0C111D]" strokeWidth={1.5} />
      </button>
    </div>
  )
}
