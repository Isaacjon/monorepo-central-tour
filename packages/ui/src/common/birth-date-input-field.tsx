"use client"

import * as React from "react"

import { MaskedInputField, type MaskedInputFieldProps } from "./masked-input-field"

/**
 * Birth date field: DD.MM.YY → e.g. 01.01.24
 * Accepts only digits; dots are inserted automatically by the mask.
 */
const BIRTH_DATE_MASK = "99.99.99"

export type BirthDateInputFieldProps = Omit<MaskedInputFieldProps, "mask">

const BirthDateInputField = React.forwardRef<HTMLInputElement, BirthDateInputFieldProps>(
  (props, ref) => (
    <MaskedInputField
      ref={ref}
      mask={BIRTH_DATE_MASK}
      maskPlaceholder={null}
      autoComplete="bday"
      inputMode="numeric"
      {...props}
    />
  )
)
BirthDateInputField.displayName = "BirthDateInputField"

export { BirthDateInputField }
