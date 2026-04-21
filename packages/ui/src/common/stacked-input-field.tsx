import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import * as React from "react"

import AlertIcon from "../assets/icons/alert.svg"
import { Input, type InputProps } from "../components/ui/input"
import { cn } from "../lib/utils"

const stackedWrapperVariants = cva(
  [
    "flex h-[54px] w-full flex-col justify-center rounded-xl border px-3 py-[6px] transition-all",
    "focus-within:outline-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white border-[#D0D5DD]",
          "shadow-[0_1px_2px_rgba(16,24,40,0.05)]",
          "focus-within:border-[#667085]",
          "focus-within:shadow-[0_0_0_4px_rgba(102,112,133,0.14),0_1px_2px_rgba(16,24,40,0.05)]",
        ],
        error: [
          "bg-white border-[#DB003A]/70",
          "shadow-[0_1px_2px_rgba(16,24,40,0.05)]",
          "focus-within:border-[#DB003A]/70",
          "focus-within:shadow-[0_0_0_4px_rgba(219,0,58,0.24),0_1px_2px_rgba(16,24,40,0.05)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface StackedInputFieldProps
  extends
    Omit<InputProps, "className">,
    VariantProps<typeof stackedWrapperVariants> {
  label: string
  hintLeft?: string
  trailing?: React.ReactNode
  /** Shows an × button when the field has a value. Calls onChange with "". */
  clearable?: boolean
  wrapperClassName?: string
  inputClassName?: string
}

const StackedInputField = React.forwardRef<
  HTMLInputElement,
  StackedInputFieldProps
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
      clearable,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId

    const showClear =
      clearable &&
      !disabled &&
      value !== "" &&
      value !== undefined &&
      value !== null

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
            className="text-c-gray-400 cursor-pointer text-xs leading-[18px] font-normal"
          >
            {label}
          </label>

          <div className="flex items-center gap-2">
            <Input
              ref={ref}
              id={inputId}
              disabled={disabled}
              value={value}
              onChange={onChange}
              className={cn(
                "h-auto min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none",
                "text-base leading-6 font-normal",
                "text-c-gray-900 placeholder:text-c-gray-400",
                "disabled:text-c-gray-400 disabled:placeholder:text-c-gray-400",
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
                    className="text-c-gray-700 hover:text-c-gray-900 shrink-0 transition-colors focus:outline-none"
                    aria-label="Clear"
                  >
                    <X className="size-5" />
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
StackedInputField.displayName = "StackedInputField"

export { StackedInputField, stackedWrapperVariants }
