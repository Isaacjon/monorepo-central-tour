import * as React from "react"

import { cn } from "../lib/utils"

type LanguageFlagSlotProps = {
  flag?: string
  FlagIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  className?: string
}

export function LanguageFlagSlot({
  flag,
  FlagIcon,
  className,
}: LanguageFlagSlotProps) {
  if (FlagIcon) {
    return (
      <span
        aria-hidden
        className={cn(
          "inline-flex h-6 w-6 shrink-0 items-center justify-center",
          className
        )}
      >
        <FlagIcon className="h-6 w-6" />
      </span>
    )
  }

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-8 w-6 shrink-0 items-center justify-center rounded-sm text-[22px] leading-none select-none",
        className
      )}
    >
      {flag}
    </span>
  )
}
