"use client"

import * as React from "react"

import { StackedInputField, type StackedInputFieldProps } from "./stacked-input-field"

/** Allows only Latin and Cyrillic letters, spaces, and hyphens. Rejects digits and symbols. */
const STRIP_NON_LETTERS = /[^a-zA-ZА-Яа-яёЁ\s-]/g

export type LettersInputFieldProps = StackedInputFieldProps

const LettersInputField = React.forwardRef<HTMLInputElement, LettersInputFieldProps>(
  ({ onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const filtered = e.target.value.replace(STRIP_NON_LETTERS, "")
      if (filtered !== e.target.value) {
        e.target.value = filtered
      }
      onChange?.(e)
    }

    return <StackedInputField ref={ref} onChange={handleChange} {...props} />
  }
)
LettersInputField.displayName = "LettersInputField"

export { LettersInputField }
