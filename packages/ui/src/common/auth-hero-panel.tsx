"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image, { type StaticImageData } from "next/image"
import { useCallback, useState } from "react"

import { cn } from "../lib/utils"

export type AuthHeroSlide = {
  quote: string
  roleLabel: string
  name: string
}

type AuthHeroPanelProps = {
  /** Static import or public-folder URL for the background photo. */
  image: StaticImageData | string
  slides: AuthHeroSlide[]
  prevLabel: string
  nextLabel: string
}

export function AuthHeroPanel({
  image,
  slides,
  prevLabel,
  nextLabel,
}: AuthHeroPanelProps) {
  const safeSlides =
    slides.length > 0 ? slides : [{ quote: "", roleLabel: "", name: "" }]
  const len = safeSlides.length
  const [index, setIndex] = useState(0)
  const active = safeSlides[index % len]!

  const go = useCallback(
    (delta: number) => setIndex((prev) => (prev + delta + len) % len),
    [len]
  )

  return (
    <div className="relative flex w-full flex-1 flex-col overflow-hidden rounded-2xl">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover object-right"
        sizes="(max-width: 1023px) 100vw, min(672px, 46.667vw)"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
      />

      <div className="absolute top-6 right-6 left-6 flex gap-4">
        {safeSlides.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full bg-white/25 transition-colors",
              i === index && "bg-white"
            )}
          />
        ))}
      </div>

      <div className="absolute right-6 bottom-6 left-6 flex flex-col gap-5">
        <blockquote>
          <p className="text-[30px] leading-[38px] font-semibold text-white">
            {active.quote}
          </p>
        </blockquote>
        <div className="flex items-end justify-between gap-3">
          <footer className="flex flex-col gap-0.5">
            <span className="text-[16px] leading-[24px] text-white/80">
              {active.roleLabel}
            </span>
            <span className="text-[20px] leading-[30px] text-white/80">
              {active.name}
            </span>
          </footer>
          <div className="flex shrink-0 gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={prevLabel}
              className="flex size-14 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={nextLabel}
              className="flex size-14 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
