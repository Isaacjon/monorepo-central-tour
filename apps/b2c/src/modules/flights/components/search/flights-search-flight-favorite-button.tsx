"use client"

import { cn, HeartIcon } from "ui"

type FlightsSearchFlightFavoriteButtonProps = {
  pressed: boolean
  onPressedChange: (value: boolean) => void
  "aria-label": string
  className?: string
}

export function FlightsSearchFlightFavoriteButton({
  pressed,
  onPressedChange,
  "aria-label": ariaLabel,
  className,
}: FlightsSearchFlightFavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onPressedChange(!pressed)}
      className={cn(
        "text-c-gray-400 hover:text-primary shrink-0 p-0.5 transition-colors",
        className
      )}
      aria-pressed={pressed}
      aria-label={ariaLabel}
    >
      <HeartIcon
        className={cn("size-5", pressed && "text-primary fill-current")}
        width={20}
        height={20}
        aria-hidden
      />
    </button>
  )
}
