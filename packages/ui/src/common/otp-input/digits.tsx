"use client"

import * as React from "react"

import {
  BASE_CELL_CLASS,
  DISABLED_CELL_CLASS,
  EMPTY_CELL_CLASS,
  FILLED_CLASS,
  FOCUS_CLASS,
} from "./styles"
import { OTP_LENGTH, type OtpStatus, toDigits } from "./utils"
import { cn } from "../../lib/utils"

export interface OtpDigitsRowProps {
  digits: string[]
  resolvedStatus: OtpStatus
  disabled: boolean
  readOnly: boolean
  inputClassName?: string | undefined
  inputRefs: React.MutableRefObject<Array<HTMLInputElement | null>>
  setDigits: (next: string[]) => void
  focusIndex: (index: number) => void
}

export function OtpDigitsRow({
  digits,
  resolvedStatus,
  disabled,
  readOnly,
  inputClassName,
  inputRefs,
  setDigits,
  focusIndex,
}: OtpDigitsRowProps) {
  return (
    <>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            inputRefs.current[index] = node
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          enterKeyHint="done"
          maxLength={1}
          disabled={disabled}
          readOnly={readOnly}
          tabIndex={readOnly ? -1 : undefined}
          value={digit}
          placeholder="-"
          className={cn(
            BASE_CELL_CLASS,
            readOnly && "cursor-default",
            disabled
              ? DISABLED_CELL_CLASS
              : digit.length > 0
                ? FILLED_CLASS[resolvedStatus]
                : EMPTY_CELL_CLASS,
            !disabled && !readOnly && FOCUS_CLASS[resolvedStatus],
            inputClassName
          )}
          aria-label={`OTP digit ${index + 1} of ${OTP_LENGTH}`}
          onChange={(event) => {
            if (readOnly) {
              return
            }
            const nextDigit = event.currentTarget.value
              .replace(/\D/g, "")
              .slice(-1)
            const nextDigits = [...digits]
            nextDigits[index] = nextDigit
            setDigits(nextDigits)
            if (nextDigit && index < OTP_LENGTH - 1) {
              focusIndex(index + 1)
            }
          }}
          onKeyDown={(event) => {
            if (readOnly) {
              return
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault()
              focusIndex(index - 1)
              return
            }
            if (event.key === "ArrowRight") {
              event.preventDefault()
              focusIndex(index + 1)
              return
            }
            if (event.key === "Backspace") {
              event.preventDefault()
              const nextDigits = [...digits]
              if (nextDigits[index]) {
                nextDigits[index] = ""
                setDigits(nextDigits)
              } else if (index > 0) {
                nextDigits[index - 1] = ""
                setDigits(nextDigits)
                focusIndex(index - 1)
              }
            }
          }}
          onPaste={(event) => {
            if (readOnly) {
              return
            }
            event.preventDefault()
            const pastedDigits = toDigits(event.clipboardData.getData("text"))
            if (pastedDigits.length === 0) {
              return
            }
            const nextDigits = [...digits]
            let targetIndex = index
            for (const pastedDigit of pastedDigits) {
              if (targetIndex >= OTP_LENGTH) {
                break
              }
              nextDigits[targetIndex] = pastedDigit
              targetIndex += 1
            }
            setDigits(nextDigits)
            focusIndex(Math.min(targetIndex, OTP_LENGTH - 1))
          }}
          onFocus={(event) => {
            if (!readOnly) {
              event.currentTarget.select()
            }
          }}
        />
      ))}
    </>
  )
}
