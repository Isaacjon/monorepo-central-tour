"use client"

import { cn } from "../lib/utils"

import type { CurrencyOption } from "./currency-types"

const inter =
  "font-[family-name:var(--font-inter-stack,Inter,ui-sans-serif,sans-serif)]"

type CurrencyItemProps = {
  option: CurrencyOption
  isSelected: boolean
  onSelect: (code: string) => void
}

export function CurrencyItem({
  option,
  isSelected,
  onSelect,
}: CurrencyItemProps) {
  const fullLabel = `${option.code} - ${option.label}`

  return (
    <button
      type="button"
      title={fullLabel}
      onClick={() => onSelect(option.code)}
      className={cn(
        inter,
        "flex h-14 w-full min-w-0 items-center gap-2.5 rounded-[14px] p-4 text-left transition-colors",
        isSelected ? "bg-primary/10" : "hover:bg-[#F9FAFB]"
      )}
    >
      <span
        className={cn(
          "shrink-0 text-[20px] leading-none font-bold tracking-normal",
          isSelected ? "text-primary" : "text-c-gray-950"
        )}
      >
        {option.code}
      </span>
      <span className="min-w-0 flex-1 truncate text-[20px] leading-none font-medium tracking-normal text-[#667085]">
        - {option.label}
      </span>
    </button>
  )
}
