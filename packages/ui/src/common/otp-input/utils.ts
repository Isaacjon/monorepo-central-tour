export const OTP_LENGTH = 4

export type OtpStatus = "default" | "error" | "success"

export const toDigits = (value: string): string[] =>
  value.replace(/\D/g, "").slice(0, OTP_LENGTH).split("")

export const normalizeDigits = (digits: string[]): string[] =>
  Array.from({ length: OTP_LENGTH }, (_, index) => digits[index] ?? "")

export const areDigitsComplete = (digits: string[]): boolean =>
  digits.every((digit) => digit.length === 1)

export const joinDigits = (digits: string[]): string => digits.join("")
