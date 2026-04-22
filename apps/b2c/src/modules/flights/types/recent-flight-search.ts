export type RecentFlightSearchItem = {
  id: string
  airlineName: string
  fromCity: string
  toCity: string
  dateRange: string
  cabinClass: string
  /** Full price line as shown, e.g. "$ 314" (spacing per design). */
  priceDisplay: string
  detailsHref: string
}
