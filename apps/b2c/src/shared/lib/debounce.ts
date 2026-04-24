/**
 * Returns a trailing-edge debounced function. Call `cancel()` to drop a pending run
 * (e.g. on unmount).
 */
export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  waitMs: number
): ((...args: TArgs) => void) & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  const debounced = (...args: TArgs) => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined
      fn(...args)
    }, waitMs)
  }

  const cancel = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
  }

  debounced.cancel = cancel
  return debounced as typeof debounced & { cancel: () => void }
}
