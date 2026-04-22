import Image from "next/image"
import Link from "next/link"

import { ArrowSwapIcon, cn, lastSearchedFlightIcon } from "ui"

import type { RecentFlightSearchItem } from "../types/recent-flight-search"

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

type RecentSearchCardProps = {
  item: RecentFlightSearchItem
  copy: Pick<RecentlySearchedFlightsCopy, "detailsLabel" | "priceFromPrefix">
  className?: string
}

function RecentSearchCard({ item, copy, className }: RecentSearchCardProps) {
  return (
    <article
      className={cn(
        "box-border flex min-h-[100px] w-full shrink-0 flex-col rounded-[20px] border border-[#EAECF0] bg-white p-3",
        className
      )}
    >
      <div className="mb-2.5 flex items-center">
        <div className="relative size-8 shrink-0 overflow-hidden rounded-full border border-[#EAECF0] bg-white">
          <Image
            src={lastSearchedFlightIcon}
            alt="Last searched flight icon"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
        <p className="ml-2 min-w-0 flex-1 truncate text-base leading-5 font-medium text-gray-950">
          {item.airlineName}
        </p>
        <Link
          href={item.detailsHref}
          className="text-primary shrink-0 text-sm leading-5 font-normal"
        >
          {copy.detailsLabel}
        </Link>
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center text-xl leading-none font-bold text-gray-950">
            <span className="shrink-0">{item.fromCity}</span>
            <span
              className="text-primary inline-flex shrink-0 items-center"
              aria-hidden
            >
              <ArrowSwapIcon width={16} height={16} className="mx-1" />
            </span>
            <span className="min-w-0">{item.toCity}</span>
          </p>
          <div className="mt-1 text-sm leading-4 font-normal text-[#98A2B3]">
            {item.dateRange}
          </div>
          <div className="mt-1 text-sm leading-4 font-normal text-gray-400">
            {item.cabinClass}
          </div>
        </div>

        <div className="mt-auto self-end text-right">
          <p className="inline-flex items-baseline gap-1">
            <span className="text-sm leading-4 font-normal text-gray-400">
              {copy.priceFromPrefix}
            </span>
            <span className="text-xl leading-none font-bold text-gray-950">
              {item.priceDisplay}
            </span>
          </p>
        </div>
      </div>
    </article>
  )
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
        className="mb-6 font-['Druk_Text_Wide_Cyr',sans-serif] text-[36px] leading-[48px] font-medium tracking-[0] text-[#171717]"
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
