export function buildPhoneForApi(value: string, countryDialPreview: string): string {
  const localDigits = value.replace(/\D/g, "")
  const countryDigits = countryDialPreview.replace(/\D/g, "")
  return `+${countryDigits}${localDigits}`
}

export function getErrorMessage(error: unknown): string | undefined {
  if (typeof error === "string") return error
  if (error instanceof Error) return error.message
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message
    return typeof message === "string" ? message : undefined
  }
  return undefined
}

export function hasErrorMessage(error: unknown, needle: string): boolean {
  const message = getErrorMessage(error)
  return message?.toLowerCase().includes(needle.toLowerCase()) ?? false
}
