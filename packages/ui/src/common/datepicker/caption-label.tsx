import * as React from "react"

import { ChevronDown, ChevronUp } from "lucide-react"

interface CaptionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
  enableYearMonthPicker?: boolean
  isYearView: boolean
  onToggleYearView: () => void
}

export default function CaptionLabel({
  children,
  enableYearMonthPicker,
  isYearView,
  onToggleYearView,
}: CaptionLabelProps) {
  if (!enableYearMonthPicker) {
    return (
      <span className="caption_label text-base font-semibold text-gray-700 capitalize">
        {children}
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={onToggleYearView}
      className="relative z-[2] flex items-center gap-2 text-base font-semibold text-gray-700 capitalize transition-colors hover:text-gray-900"
      data-state={isYearView ? "open" : "closed"}
    >
      {children}
      {isYearView ? (
        <ChevronUp className="h-4 w-4 transition-transform" />
      ) : (
        <ChevronDown className="h-4 w-4 transition-transform" />
      )}
    </button>
  )
}
