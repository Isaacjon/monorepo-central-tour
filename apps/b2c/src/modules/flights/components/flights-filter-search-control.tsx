import Link from "next/link"
import { cn } from "ui"

type FlightsFilterSearchControlProps = {
  canSubmitSearch: boolean
  searchHrefWithParams: string
  searchLabel: string
  searchDisabledHint: string
}

export function FlightsFilterSearchControl({
  canSubmitSearch,
  searchHrefWithParams,
  searchLabel,
  searchDisabledHint,
}: FlightsFilterSearchControlProps) {
  const searchControlClassName = cn(
    "flex min-h-[54px] min-w-[120px] shrink-0 items-center justify-center rounded-xl px-8 text-base font-semibold transition-colors",
    canSubmitSearch
      ? "bg-primary text-white hover:bg-primary/90"
      : "bg-primary pointer-events-none cursor-not-allowed text-white opacity-40"
  )

  if (canSubmitSearch) {
    return (
      <Link href={searchHrefWithParams} className={searchControlClassName}>
        {searchLabel}
      </Link>
    )
  }

  return (
    <button
      type="button"
      disabled
      className={searchControlClassName}
      title={searchDisabledHint}
    >
      {searchLabel}
    </button>
  )
}
