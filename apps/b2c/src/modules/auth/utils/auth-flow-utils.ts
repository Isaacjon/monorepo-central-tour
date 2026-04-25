export function buildPhoneForApi(value: string, countryDialPreview: string): string {
  const localDigits = value.replace(/\D/g, "")
  const countryDigits = countryDialPreview.replace(/\D/g, "")
  return `+${countryDigits}${localDigits}`
}

export function getErrorMessage(error: unknown): string | undefined {
  return error instanceof Error ? error.message : undefined
}
