import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import AlertIcon from "../assets/icons/alert.svg"
import { Input, type InputProps } from "../components/ui/input"
import { cn } from "../lib/utils"

const inputWrapperVariants = cva(
  [
    "flex h-10 w-full items-center gap-2 rounded-[12px] border px-3 py-0 transition-all",
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

export interface InputFieldProps
  extends
    Omit<InputProps, "className">,
    VariantProps<typeof inputWrapperVariants> {
  label?: string
  hintLeft?: string
  hintRight?: string
  /** Extra controls to the right of the text (e.g. password visibility). Shown left of the error alert icon when `variant` is `error`. */
  trailing?: React.ReactNode
  wrapperClassName?: string
  inputClassName?: string
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      hintLeft,
      hintRight,
      trailing,
      variant,
      wrapperClassName,
      inputClassName,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="font-[family-name:var(--font-inter-stack,Inter,ui-sans-serif,sans-serif)] text-sm leading-5 font-medium tracking-normal text-[color:var(--c-gray-700)]"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            inputWrapperVariants({ variant }),
            disabled &&
              "cursor-not-allowed border-[#D0D5DD] bg-[#F9FAFB] shadow-none focus-within:border-[#D0D5DD] focus-within:shadow-none",
            wrapperClassName
          )}
        >
          <Input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none",
              "font-[family-name:var(--font-inter-stack,Inter,ui-sans-serif,sans-serif)] text-base leading-6 font-normal tracking-normal",
              "text-[color:var(--c-gray-900)] placeholder:text-[color:var(--c-gray-500)]",
              "disabled:text-[#98A2B3] disabled:placeholder:text-[#98A2B3]",
              inputClassName
            )}
            {...props}
          />
          {(trailing != null || variant === "error") && (
            <div className="flex shrink-0 items-center gap-2">
              {trailing}
              {variant === "error" && (
                <AlertIcon
                  className="size-5 shrink-0 text-[#DB003A]"
                  aria-hidden
                />
              )}
            </div>
          )}
        </div>

        {(hintLeft ?? hintRight) && (
          <div className="flex items-start justify-between gap-2">
            {hintLeft && (
              <p
                className={cn(
                  "text-muted-foreground text-sm",
                  variant === "error" && "text-destructive"
                )}
              >
                {hintLeft}
              </p>
            )}
            {hintRight && (
              <p className="text-muted-foreground ml-auto text-sm">
                {hintRight}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)
InputField.displayName = "InputField"

export { InputField, inputWrapperVariants }
