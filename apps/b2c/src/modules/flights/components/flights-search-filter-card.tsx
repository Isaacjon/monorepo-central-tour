import type { ReactNode } from "react"

export function FlightsSearchFilterCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`flex w-64 flex-col gap-0 rounded-[20px] bg-white p-4 ${className ?? ""}`}
    >
      {children}
    </div>
  )
}
