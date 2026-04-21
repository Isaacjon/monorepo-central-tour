"use client"

import * as React from "react"

import { MaskedInputField, type MaskedInputFieldProps } from "./masked-input-field"

/**
 * Passport field: 2 uppercase letters + 6 digits → e.g. AD000000
 * Mask: `a` = any letter, `9` = any digit.
 * The onChange handler auto-uppercases the letter portion.
 */
const PASSPORT_MASK = "aa999999"

export type PassportInputFieldProps = Omit<MaskedInputFieldProps, "mask">

const PassportInputField = React.forwardRef<HTMLInputElement, PassportInputFieldProps>(
  ({ onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = e.target.value.toUpperCase()
      onChange?.(e)
    }

    return (
      <MaskedInputField
        ref={ref}
        mask={PASSPORT_MASK}
        maskPlaceholder={null}
        autoComplete="off"
        onChange={handleChange}
        {...props}
      />
    )
  }
)
PassportInputField.displayName = "PassportInputField"

export { PassportInputField }
