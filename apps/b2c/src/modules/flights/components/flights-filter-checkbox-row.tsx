"use client"

import { cn } from "ui"

type FlightsFilterCheckboxRowProps = {
  id: string
  label: string
  count?: number
  checked: boolean
  onCheckedChange: (v: boolean) => void
}

export function FlightsFilterCheckboxRow({
  id,
  label,
  count,
  checked,
  onCheckedChange,
}: FlightsFilterCheckboxRowProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between gap-2"
    >
      <span className="flex min-w-0 items-center gap-2">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className={cn(
            "size-4 shrink-0 appearance-none rounded border transition-colors",
            "border-[#EAECF0] bg-white",
            "checked:border-primary checked:bg-[#FEE4E2]",
            "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none"
          )}
        />
        <span className="text-sm leading-4 text-[#0C111D]">{label}</span>
      </span>
      {count != null && count > 0 && (
        <span className="shrink-0 text-xs leading-4 text-[#98A2B3] tabular-nums">
          {count}
        </span>
      )}
    </label>
  )
}
