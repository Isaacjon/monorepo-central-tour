export const PRICE_GRAPH_COLUMN_PX = 36
export const PRICE_GRAPH_GAP_PX = 12
export const PRICE_GRAPH_MAX_HEIGHT_PX = 108

/** Must match chart area height in `FlightsSearchPriceGraphDayColumn`. */
export const PRICE_GRAPH_BAR_AREA_PX = PRICE_GRAPH_MAX_HEIGHT_PX
const MIN_BAR_PX = 12

/** Demo: calendar days with no price (magnifying glass + unknown tooltip). */
export function isDemoFlightPriceUnknown(calendarDay: number): boolean {
  return calendarDay === 5 || calendarDay === 21 || calendarDay === 23
}

/** Stable pseudo-price per calendar day (until API provides amounts). */
export function demoFlightPriceAmount(
  year: number,
  month: number,
  calendarDay: number
): number {
  const seed = (year % 10_000) * 10_000 + (month + 1) * 100 + calendarDay
  const hash = (Math.sin(seed * 12.9898) * 43758.5453) % 1
  const noise = Math.abs(hash)

  // Compose a realistic-looking curve: baseline + seasonal waves + deterministic jitter.
  const baseline = 2_150_000
  const waveSlow = Math.sin((calendarDay / 31) * Math.PI * 2) * 360_000
  const waveFast = Math.sin((calendarDay / 31) * Math.PI * 6 + 0.9) * 190_000
  const jitter = (noise - 0.5) * 520_000

  return Math.max(450_000, Math.round(baseline + waveSlow + waveFast + jitter))
}

export function formatFlightPriceAmount(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${amount.toLocaleString()} ${currency}`
  }
}

export type DayPricePoint = {
  calendarDay: number
  hasPrice: boolean
  amount: number | null
  formatted: string | null
  /** Pixel height of the bar; tallest = highest price in the month. */
  barHeightPx: number
}

export function buildDemoMonthPriceSeries(
  monthDates: Date[],
  currency: string,
  isUnknown: (calendarDay: number) => boolean
): DayPricePoint[] {
  if (monthDates.length === 0) return []

  const y = monthDates[0].getFullYear()
  const m = monthDates[0].getMonth()

  const points: DayPricePoint[] = monthDates.map((_, i) => {
    const calendarDay = i + 1
    if (isUnknown(calendarDay)) {
      return {
        calendarDay,
        hasPrice: false,
        amount: null,
        formatted: null,
        barHeightPx: PRICE_GRAPH_COLUMN_PX,
      }
    }
    const amount = demoFlightPriceAmount(y, m, calendarDay)
    return {
      calendarDay,
      hasPrice: true,
      amount,
      formatted: formatFlightPriceAmount(amount, currency),
      barHeightPx: MIN_BAR_PX,
    }
  })

  const amounts = points
    .filter((p): p is DayPricePoint & { amount: number } => p.amount != null)
    .map((p) => p.amount)
  if (amounts.length === 0) return points

  const min = Math.min(...amounts)
  const max = Math.max(...amounts)
  const spread = max - min || 1

  for (const p of points) {
    if (p.amount == null) continue
    const t = (p.amount - min) / spread
    p.barHeightPx = Math.round(
      MIN_BAR_PX + t * (PRICE_GRAPH_BAR_AREA_PX - MIN_BAR_PX)
    )
  }

  return points
}

export type CalendarMonthSnapshot = {
  todayDay: number
  monthDates: Date[]
}

export function createCalendarMonthSnapshot(): CalendarMonthSnapshot {
  const d = new Date()
  const y = d.getFullYear()
  const m = d.getMonth()
  const len = new Date(y, m + 1, 0).getDate()
  return {
    todayDay: d.getDate(),
    monthDates: Array.from({ length: len }, (_, i) => new Date(y, m, i + 1)),
  }
}
