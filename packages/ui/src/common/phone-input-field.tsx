"use client"

import * as React from "react"

import {
  MaskedInputField,
  type MaskedInputFieldProps,
} from "./masked-input-field"

/**
 * Uzbekistan phone field: +998 (XX) XXX-XX-XX
 * The `\9` sequences are literal "9" characters in the mask (escaped from digit placeholder).
 */
const UZ_PHONE_MASK = "+\\9\\98 (99) 999-99-99"

export type PhoneInputFieldProps = Omit<MaskedInputFieldProps, "mask">

const PhoneInputField = React.forwardRef<
  HTMLInputElement,
  PhoneInputFieldProps
>((props, ref) => (
  <MaskedInputField
    ref={ref}
    mask={UZ_PHONE_MASK}
    maskPlaceholder={null}
    type="tel"
    autoComplete="tel"
    {...props}
  />
))
PhoneInputField.displayName = "PhoneInputField"

export { PhoneInputField }
