import Image from "next/image"

import { emptyBoxImage } from "ui"

type FlightsSearchEmptyStateCopy = {
  title: string
  imageAlt: string
}

export function FlightsSearchEmptyState({
  copy,
}: {
  copy: FlightsSearchEmptyStateCopy
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <Image
        src={emptyBoxImage}
        alt={copy.imageAlt}
        width={280}
        height={280}
        className="h-auto w-[min(280px,70vw)] max-w-full object-contain"
        priority
      />
      <p className="text-center text-lg font-bold text-[#101828]">
        {copy.title}
      </p>
    </div>
  )
}
