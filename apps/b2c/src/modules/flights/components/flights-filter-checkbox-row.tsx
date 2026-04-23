"use client"

import { Checkbox } from "ui"

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
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(v) => {
            if (typeof v === "boolean") onCheckedChange(v)
          }}
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
