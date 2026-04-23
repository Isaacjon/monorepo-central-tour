"use client"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, Minus } from "lucide-react"
import * as React from "react"

import { cn } from "../../lib/utils"

function Checkbox({
  className,
  indeterminate = false,
  checked,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  indeterminate?: boolean
}) {
  const resolvedChecked: React.ComponentProps<
    typeof CheckboxPrimitive.Root
  >["checked"] = indeterminate ? "indeterminate" : checked
  const showMinus = indeterminate || resolvedChecked === "indeterminate"

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "group peer size-4 shrink-0 cursor-pointer rounded border border-[#EAECF0] bg-white transition-colors",
        "data-[state=checked]:border-primary data-[state=checked]:bg-[#FEE4E2]",
        "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-[#FEE4E2]",
        "disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100",
        "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
        className
      )}
      data-indeterminate={indeterminate}
      checked={resolvedChecked}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        {showMinus ? (
          <Minus
            className="text-primary size-3.5 group-disabled:text-gray-300"
            strokeWidth={2.5}
          />
        ) : (
          <Check
            className="text-primary size-3.5 group-disabled:text-gray-300"
            strokeWidth={2.5}
          />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
