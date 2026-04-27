/** E.164-style full number for API payloads (register company step). */
export function getFullPhoneDigitsE164(localPhone: string, dialCode: string) {
  const localDigits = localPhone.replace(/\D/g, "")
  const dialDigits = dialCode.replace(/\D/g, "")
  return `+${dialDigits}${localDigits}`
}
