/**
 * Stub register service. Replace with real API calls once auth is wired.
 * Throws on failure so callers can catch and show error toasts.
 */

const NETWORK_MS = 600

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function submitRegisterContact(_payload: {
  fullName: string
  email: string
}): Promise<void> {
  await delay(NETWORK_MS)
}

export async function submitRegisterCompany(_payload: {
  companyName: string
  address: string
  phone: string
  licenseFiles: File[]
  certificateFiles: File[]
}): Promise<void> {
  await delay(NETWORK_MS)
}

export async function completeRegister(_payload: {
  email: string
  otp: string
  password: string
}): Promise<void> {
  await delay(800)
}
