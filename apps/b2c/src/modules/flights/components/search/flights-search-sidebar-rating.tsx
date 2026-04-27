"use client"

import { RadioGroup, RadioGroupItem } from "ui"

import { FlightsSearchFilterCard } from "./flights-search-filter-card"
import { ratingKeys } from "./flights-search-sidebar-seeds"

type FlightsSearchSidebarRatingProps = {
  baseId: string
  title: string
  rating: string
  setRating: (value: string) => void
  translateRating: (key: (typeof ratingKeys)[number]) => string
}

export function FlightsSearchSidebarRating({
  baseId,
  title,
  rating,
  setRating,
  translateRating,
}: FlightsSearchSidebarRatingProps) {
  return (
    <FlightsSearchFilterCard>
      <h3 className="text-base leading-6 font-medium text-[#0C111D]">{title}</h3>
      <RadioGroup
        value={rating}
        onValueChange={setRating}
        className="mt-3 flex flex-col gap-2"
        aria-label={title}
      >
        {ratingKeys.map((k) => {
          const id = `${baseId}-rating-${k}`
          return (
            <div key={k} className="flex items-center gap-2">
              <RadioGroupItem value={k} id={id} />
              <label
                htmlFor={id}
                className="cursor-pointer text-sm text-[#0C111D]"
              >
                {translateRating(k)}
              </label>
            </div>
          )
        })}
      </RadioGroup>
    </FlightsSearchFilterCard>
  )
}
