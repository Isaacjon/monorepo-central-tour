export const DAY_MINUTES = 24 * 60
/** Wrap for `minutes` display (0–59:0–59, total seconds, 59:59 → 00:00). */
export const MS_MOD = 60 * 60

export function pad2(n: number) {
  return n.toString().padStart(2, "0")
}

export function digitsToDisplay(s: string) {
  const d = s.replace(/\D/g, "").slice(0, 4)
  if (d.length === 0) return ""
  if (d.length <= 2) return d
  if (d.length === 3) return `${d.slice(0, 2)}:${d[2]}`
  return `${d.slice(0, 2)}:${d.slice(2, 4)}`
}

export function padPartialToFour(s: string) {
  const d = s.replace(/\D/g, "")
  if (d.length === 0) return ""
  if (d.length === 1) return `0${d}00`
  if (d.length === 2) return `${d}00`
  if (d.length === 3) return `${d}0`
  return d.slice(0, 4)
}

export type TimeFieldMode = "hour" | "minutes"

/**
 * - `hour`: 24h (…23:59 → 00:00) via `total = MM % 24h` on parsed digits.
 * - `minutes`: each segment 0–59, value is total seconds in range (59:59 → 00:00).
 */
export function parseFour(d4: string, mode: TimeFieldMode) {
  if (d4.length !== 4) return { min: 0, sec: 0 }
  const a = Number(d4.slice(0, 2))
  const b = Number(d4.slice(2, 4))
  if (mode === "hour") {
    const total = a * 60 + b
    const m = ((total % DAY_MINUTES) + DAY_MINUTES) % DAY_MINUTES
    return { min: m, sec: 0 }
  }
  const s1 = a % 60
  const s2 = b % 60
  const totalSec = s1 * 60 + s2
  const sec = ((totalSec % MS_MOD) + MS_MOD) % MS_MOD
  return { min: 0, sec }
}

export function valueMinutesToDigits(m: number) {
  const t = ((m % DAY_MINUTES) + DAY_MINUTES) % DAY_MINUTES
  const h = Math.floor(t / 60) % 24
  const min = t % 60
  return `${pad2(h)}${pad2(min)}`
}

export function valueSecondsToDigits(totalSec: number) {
  const t = ((totalSec % MS_MOD) + MS_MOD) % MS_MOD
  const a = Math.floor(t / 60) % 60
  const b = t % 60
  return `${pad2(a)}${pad2(b)}`
}

export function snapInRange(n: number, min: number, max: number, step: number) {
  const s = min + Math.round((n - min) / step) * step
  return Math.max(min, Math.min(max, s))
}

/** Props to forward to `InputField` (time-specific keys removed). */
export function pluckTimeInputFieldRest(
  props: object,
  isHour: boolean
): Record<string, unknown> {
  const rest: Record<string, unknown> = { ...props }
  if (isHour) {
    delete rest.valueMinutes
    delete rest.onValueMinutesChange
    delete rest.minMinutes
    delete rest.maxMinutes
    delete rest.stepMinutes
  } else {
    delete rest.valueSeconds
    delete rest.onValueSecondsChange
    delete rest.minSeconds
    delete rest.maxSeconds
    delete rest.stepSeconds
  }
  delete rest.timeMode
  delete rest.className
  delete rest.inputClassName
  delete rest.wrapperClassName
  delete rest.onBlur
  delete rest.onFocus
  return rest
}
