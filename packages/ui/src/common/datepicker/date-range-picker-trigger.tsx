"use client"

import { X } from "lucide-react"
import * as React from "react"

import { cn } from "../../lib/utils"

interface DateRangePickerTriggerProps {
  fromLabel: string
  toLabel: string
  fromDisplayValue: string
  toDisplayValue: string
  hasFromValue: boolean
  hasToValue: boolean
  canClearValue: boolean
  disabled?: boolean
  isOpen: boolean
  className?: string
  onClear: (e: React.MouseEvent) => void
}

export const DateRangePickerTrigger = React.forwardRef<
  HTMLButtonElement,
  DateRangePickerTriggerProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(
  (
    {
      fromLabel,
      toLabel,
      fromDisplayValue,
      toDisplayValue,
      hasFromValue,
      hasToValue,
      canClearValue,
      disabled = false,
      isOpen,
      className,
      onClear,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          "relative flex h-[54px] w-full overflow-hidden rounded-xl border bg-white text-left transition-colors",
          isOpen ? "border-blue-400" : "border-[#D0D5DD]",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
          className
        )}
        data-slot="date-range-picker-trigger"
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        <div className="flex flex-1 flex-col justify-center px-3 py-2">
          <span className="text-xs leading-none text-[#667085]">
            {fromLabel}
          </span>
          <span
            className={cn(
              "mt-1 text-sm leading-none font-medium",
              hasFromValue ? "text-[#101828]" : "text-[#98A2B3]"
            )}
          >
            {fromDisplayValue}
          </span>
        </div>

        <div className="w-px shrink-0 bg-[#EAECF0]" />

        <div className="flex flex-1 flex-col justify-center px-3 py-2">
          <span className="text-xs leading-none text-[#667085]">{toLabel}</span>
          <span
            className={cn(
              "mt-1 text-sm leading-none font-medium",
              hasToValue ? "text-[#101828]" : "text-[#98A2B3]"
            )}
          >
            {toDisplayValue}
          </span>
        </div>

        {canClearValue && (
          <div
            className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              onClear(e)
            }}
          >
            <X className="size-3.5" />
          </div>
        )}
      </button>
    )
  }
)

DateRangePickerTrigger.displayName = "DateRangePickerTrigger"
