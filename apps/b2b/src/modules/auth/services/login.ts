/**
 * Stub login service. Replace body with a real API call when auth is wired.
 * Throws on failure so callers can catch and show the error toast.
 */
export async function submitLogin(_credentials: {
  email: string
  password: string
}): Promise<void> {
  // Simulate network round-trip
  await new Promise((resolve) => setTimeout(resolve, 600))
  // TODO: replace with real API call; throw on non-2xx response
}
