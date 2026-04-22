"use client"

import * as React from "react"

import { InputField, type InputFieldProps } from "./input-field"
import EyeOffIcon from "../assets/icons/eye-off.svg"
import EyeIcon from "../assets/icons/eye.svg"

export interface PasswordInputFieldProps extends Omit<
  InputFieldProps,
  "type" | "trailing"
> {
  showPasswordLabel?: string
  hidePasswordLabel?: string
  trailing?: React.ReactNode
}

export const PasswordInputField = React.forwardRef<
  HTMLInputElement,
  PasswordInputFieldProps
>(
  (
    {
      showPasswordLabel = "Show password",
      hidePasswordLabel = "Hide password",
      trailing,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

    return (
      <InputField
        ref={ref}
        type={isPasswordVisible ? "text" : "password"}
        disabled={disabled}
        trailing={
          <>
            {trailing}
            <button
              type="button"
              disabled={disabled}
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="text-[#667085] transition-opacity hover:opacity-70 disabled:opacity-50"
              aria-label={
                isPasswordVisible ? hidePasswordLabel : showPasswordLabel
              }
            >
              {isPasswordVisible ? (
                <EyeOffIcon className="size-4" aria-hidden />
              ) : (
                <EyeIcon className="size-4" aria-hidden />
              )}
            </button>
          </>
        }
        {...props}
      />
    )
  }
)

PasswordInputField.displayName = "PasswordInputField"
