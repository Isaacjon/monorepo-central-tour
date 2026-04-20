"use client"

import * as React from "react"

import { OtpDigitsRow } from "./digits"
import {
  areDigitsComplete,
  joinDigits,
  normalizeDigits,
  OTP_LENGTH,
  type OtpStatus,
  toDigits,
} from "./utils"
import { cn } from "../../lib/utils"

export type { OtpStatus }

export interface OtpInputProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  name?: string
  status?: OtpStatus
  invalid?: boolean
  disabled?: boolean
  readOnly?: boolean
  autoFocus?: boolean
  inputClassName?: string
}

const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      className,
      inputClassName,
      value,
      defaultValue = "",
      onChange,
      onComplete,
      name,
      status = "default",
      invalid = false,
      disabled = false,
      readOnly = false,
      autoFocus = false,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined
    const [internalDigits, setInternalDigits] = React.useState<string[]>(() =>
      normalizeDigits(toDigits(defaultValue))
    )
    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([])
    const digits = isControlled
      ? normalizeDigits(toDigits(value ?? ""))
      : internalDigits
    const emitValue = React.useCallback(
      (nextDigits: string[]) => {
        const nextValue = joinDigits(nextDigits)
        onChange?.(nextValue)
        if (areDigitsComplete(nextDigits)) {
          onComplete?.(nextValue)
        }
      },
      [onChange, onComplete]
    )
    const setDigits = React.useCallback(
      (nextDigits: string[]) => {
        if (!isControlled) {
          setInternalDigits(nextDigits)
        }
        emitValue(nextDigits)
      },
      [emitValue, isControlled]
    )
    const focusIndex = React.useCallback(
      (index: number) => {
        const safeIndex = Math.max(0, Math.min(OTP_LENGTH - 1, index))
        inputRefs.current[safeIndex]?.focus()
        inputRefs.current[safeIndex]?.select()
      },
      [inputRefs]
    )
    React.useEffect(() => {
      if (!autoFocus || disabled || readOnly) {
        return
      }
      const firstEmptyIndex = digits.findIndex((digit) => digit === "")
      focusIndex(firstEmptyIndex === -1 ? OTP_LENGTH - 1 : firstEmptyIndex)
    }, [autoFocus, disabled, readOnly, digits, focusIndex])
    const resolvedStatus: OtpStatus = invalid ? "error" : status

    return (
      <div
        ref={ref}
        className={cn("flex w-fit items-center gap-[20px]", className)}
        {...props}
      >
        {name ? (
          <input
            type="hidden"
            name={name}
            value={joinDigits(digits)}
            readOnly
          />
        ) : null}
        <OtpDigitsRow
          digits={digits}
          resolvedStatus={resolvedStatus}
          disabled={disabled}
          readOnly={readOnly}
          inputClassName={inputClassName}
          inputRefs={inputRefs}
          setDigits={setDigits}
          focusIndex={focusIndex}
        />
      </div>
    )
  }
)
OtpInput.displayName = "OtpInput"
export { OtpInput, OTP_LENGTH }
