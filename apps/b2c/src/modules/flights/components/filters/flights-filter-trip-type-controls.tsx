import { BezierCurveIcon } from "ui"

import type { TripType } from "./flights-filter.config"

type FlightsFilterTripTypeControlsProps = {
  complexRouteLabel: string
  tripTypeOptions: ReadonlyArray<{ id: TripType; label: string }>
  tripType: TripType
  onChange: (tripType: TripType) => void
}

export function FlightsFilterTripTypeControls({
  complexRouteLabel,
  tripTypeOptions,
  tripType,
  onChange,
}: FlightsFilterTripTypeControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        className="inline-flex h-12 items-center gap-2 text-base leading-4 font-normal text-[#101828]"
      >
        <BezierCurveIcon
          width={24}
          height={24}
          aria-hidden
          className="shrink-0"
        />
        {complexRouteLabel}
      </button>
      {tripTypeOptions.map((option) => (
        <label
          key={option.id}
          className="inline-flex h-12 cursor-pointer items-center gap-2 text-base leading-4 font-normal text-[#101828]"
        >
          <span
            className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
            style={{
              borderColor:
                tripType === option.id ? "var(--color-primary)" : "#D0D5DD",
            }}
          >
            {tripType === option.id && (
              <span className="bg-primary h-2.5 w-2.5 rounded-full" />
            )}
          </span>
          <input
            type="radio"
            name="trip-type"
            value={option.id}
            checked={tripType === option.id}
            onChange={() => onChange(option.id)}
            className="sr-only"
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}
