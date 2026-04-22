/**
 * Stub forgot-password service. Replace with real API when auth is wired.
 */

const NETWORK_MS = 600

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export type CheckPhoneForResetResult =
  | { found: true }
  | { found: false; reason: "user_not_found" }

/**
 * Simulates a lookup. Random split so both paths can be tested before backend exists.
 * When a real API exists: return `{ found: false }` for 404 / unknown number.
 */
export async function checkPhoneForReset(
  _phone: string
): Promise<CheckPhoneForResetResult> {
  await delay(NETWORK_MS)
  if (Math.random() < 0.45) {
    return { found: false, reason: "user_not_found" }
  }
  return { found: true }
}

/**
 * Simulates final password change. Succeeds or fails at random (50/50) until the API is integrated.
 * Throws on failure so callers can show an error toast.
 */
export async function completePasswordReset(_params: {
  phone: string
  otp: string
  newPassword: string
}): Promise<void> {
  await delay(800)
  if (Math.random() < 0.5) {
    throw new Error("RESET_FAILED")
  }
}
