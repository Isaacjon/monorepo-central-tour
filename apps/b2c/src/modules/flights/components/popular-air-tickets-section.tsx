import { cn } from "ui"

import {
  RecentSearchCard,
  type RecentSearchCardCopy,
} from "./recent-search-card"
import type { RecentFlightSearchItem } from "../types/recent-flight-search"

export type PopularAirTicketsCopy = RecentSearchCardCopy & {
  sectionTitle: string
  sectionSubtitle: string
}

type PopularAirTicketsSectionProps = {
  copy: PopularAirTicketsCopy
  items: RecentFlightSearchItem[]
  className?: string
}

export function PopularAirTicketsSection({
  copy,
  items,
  className,
}: PopularAirTicketsSectionProps) {
  const { sectionTitle, sectionSubtitle, detailsLabel, priceFromPrefix } = copy
  const cardCopy: RecentSearchCardCopy = { detailsLabel, priceFromPrefix }

  return (
    <section
      className={cn("ct-container mt-12", className)}
      aria-labelledby="popular-air-tickets-heading"
    >
      <h2
        id="popular-air-tickets-heading"
        className="font-['Druk_Text_Wide_Cyr',sans-serif] text-[48px] leading-[72px] font-medium tracking-[0] text-[#171717]"
      >
        {sectionTitle}
      </h2>
      <p className="mt-4 mb-8 font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) text-[20px] leading-[100%] font-normal tracking-[0] text-[#171717]">
        {sectionSubtitle}
      </p>

      <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <RecentSearchCard key={item.id} item={item} copy={cardCopy} />
        ))}
      </div>
    </section>
  )
}
