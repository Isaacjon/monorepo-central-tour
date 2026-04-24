"use client"

import InputMask from "@mona-health/react-input-mask"
import { type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import * as React from "react"

import { stackedWrapperVariants } from "./stacked-input-field"
import AlertIcon from "../assets/icons/alert.svg"
import { cn } from "../lib/utils"

export interface MaskedInputFieldProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">,
    VariantProps<typeof stackedWrapperVariants> {
  /** Mask string. Use `9` for digit, `a` for letter, `*` for alphanumeric.
   *  Escape a literal mask character with `\` (e.g. `\\9` for a literal "9"). */
  mask: string
  /** Character shown in unfilled positions while focused. Pass `null` to hide. */
  maskPlaceholder?: string | null
  alwaysShowMask?: boolean
  label: string
  hintLeft?: string
  trailing?: React.ReactNode
  /** Shows an × button when the field has a value. Calls onChange with "". */
  clearable?: boolean
  wrapperClassName?: string
  inputClassName?: string
}

const MaskedInputField = React.forwardRef<
  HTMLInputElement,
  MaskedInputFieldProps
>(
  (
    {
      label,
      hintLeft,
      trailing,
      variant,
      wrapperClassName,
      inputClassName,
      disabled,
      id,
      mask,
      maskPlaceholder = "_",
      alwaysShowMask,
      clearable,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId

    const showClear = clearable && !disabled && value !== "" && value !== undefined && value !== null

    const handleClear = () => {
      onChange?.({
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>)
    }

    return (
      <div className="flex w-full flex-col gap-1.5">
        <div
          className={cn(
            stackedWrapperVariants({ variant }),
            disabled &&
              "cursor-not-allowed border-[#D0D5DD] bg-[#F9FAFB] shadow-none focus-within:border-[#D0D5DD] focus-within:shadow-none",
            wrapperClassName
          )}
        >
          <label
            htmlFor={inputId}
            className="cursor-pointer text-xs leading-[18px] font-normal text-[#98A2B3]"
          >
            {label}
          </label>

          <div className="flex items-center gap-2">
            <InputMask
              mask={mask}
              maskPlaceholder={maskPlaceholder}
              alwaysShowMask={alwaysShowMask}
              ref={ref}
              id={inputId}
              disabled={disabled}
              value={value}
              onChange={onChange}
              className={cn(
                "h-auto min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none outline-none",
                "text-base leading-6 font-normal",
                "text-c-gray-900 placeholder:text-c-gray-400",
                "disabled:text-c-gray-400 disabled:placeholder:text-c-gray-400 disabled:cursor-not-allowed",
                inputClassName
              )}
              {...props}
            />

            {(trailing != null || showClear || variant === "error") && (
              <div className="flex shrink-0 items-center gap-2">
                {trailing}
                {showClear && (
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={handleClear}
                    className="shrink-0 text-c-gray-700 transition-colors hover:text-c-gray-900 focus:outline-none"
                    aria-label="Clear"
                  >
                    <X className="size-4" />
                  </button>
                )}
                {variant === "error" && (
                  <AlertIcon
                    className="size-4 shrink-0 text-[#DB003A]"
                    aria-hidden
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {hintLeft && (
          <p
            className={cn(
              "text-sm text-[#667085]",
              variant === "error" && "text-[#DB003A]"
            )}
          >
            {hintLeft}
          </p>
        )}
      </div>
    )
  }
)
MaskedInputField.displayName = "MaskedInputField"

export { MaskedInputField }
