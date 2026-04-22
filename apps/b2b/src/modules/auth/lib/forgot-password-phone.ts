export function formatPhoneForSubtitle(local: string, dialCode: string) {
  const localDigits = local.replace(/\D/g, "")
  if (!localDigits) {
    return "—"
  }
  const prefix = dialCode.replace(/\D/g, "")
  return `+${prefix}${localDigits}`
}

export function getFullPhoneDigits(local: string, dialCode: string) {
  return `${dialCode.replace(/\D/g, "")}${local.replace(/\D/g, "")}`
}
