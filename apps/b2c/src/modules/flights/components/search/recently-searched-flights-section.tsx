import { cn } from "ui"

import { RecentSearchCard } from "./recent-search-card"
import type { RecentFlightSearchItem } from "../../types/recent-flight-search"

export type RecentlySearchedFlightsCopy = {
  sectionTitle: string
  detailsLabel: string
  priceFromPrefix: string
}

type RecentlySearchedFlightsSectionProps = {
  copy: RecentlySearchedFlightsCopy
  items: RecentFlightSearchItem[]
  className?: string
}

export function RecentlySearchedFlightsSection({
  copy,
  items,
  className,
}: RecentlySearchedFlightsSectionProps) {
  return (
    <section
      className={cn("ct-container mt-[14px]", className)}
      aria-labelledby="recent-flights-searches-heading"
    >
      <h2
        id="recent-flights-searches-heading"
        className="font-druk mb-6 text-[36px] leading-[48px] font-medium tracking-[0] text-[#171717]"
      >
        {copy.sectionTitle}
      </h2>

      <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <RecentSearchCard key={item.id} item={item} copy={copy} />
        ))}
      </div>
    </section>
  )
}
