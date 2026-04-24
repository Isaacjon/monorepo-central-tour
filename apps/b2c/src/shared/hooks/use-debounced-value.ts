import { useEffect, useMemo, useState } from "react"

import { debounce } from "@/shared/lib/debounce"

/**
 * Trailing debounce of a value — useful for search inputs driving network requests.
 * Implemented with {@link debounce} so pending updates are cancelled on unmount.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)

  const scheduleFlush = useMemo(
    () => debounce((next: T) => setDebounced(next), delayMs),
    [delayMs]
  )

  useEffect(() => {
    scheduleFlush(value)
    return () => scheduleFlush.cancel()
  }, [value, scheduleFlush])

  return debounced
}
