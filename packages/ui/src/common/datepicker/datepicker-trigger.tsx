import { CalendarIcon, X } from "lucide-react"
import * as React from "react"

import { cn } from "../../lib/utils"

interface DatepickerTriggerProps {
  displayValue: string
  canClearValue: boolean
  disabled?: boolean
  isOpen: boolean
  className?: string
  "aria-invalid"?: boolean
  selected?: Date
  tempSelected?: Date
  onClear: (e: React.MouseEvent) => void
}

export const DatepickerTrigger = React.forwardRef<
  HTMLButtonElement,
  DatepickerTriggerProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(
  (
    {
      displayValue,
      canClearValue,
      disabled = false,
      isOpen,
      className,
      "aria-invalid": ariaInvalid,
      selected,
      tempSelected,
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
        aria-invalid={ariaInvalid}
        className={cn(
          "flex h-10 w-full items-center rounded-lg border bg-white px-3 py-2 transition-all duration-200 ease-in-out",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-error-400 cursor-pointer shadow-none",
          isOpen ? "border-blue-400" : "border-gray-300",
          className,
          selected ? "text-gray-900" : "text-gray-500",
          tempSelected && "text-gray-500",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:[&_svg]:text-gray-300"
        )}
        data-slot="datepicker-trigger"
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        <span className="flex-1 text-left text-base">{displayValue}</span>

        {canClearValue ? (
          <div
            className="flex w-5 justify-center text-gray-500"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              onClear(e)
            }}
          >
            <X className="size-4" />
          </div>
        ) : (
          <CalendarIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>
    )
  }
)

DatepickerTrigger.displayName = "DatepickerTrigger"
