import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

import { cn } from "../lib/utils"

export type ServiceTabItem = {
  id: string
  label: string
  icon: ReactNode
  href: string
}

type HomeBannerProps = {
  bannerImageSrc: StaticImageData | string
  title: string
  serviceTabs: ServiceTabItem[]
  activeTabId: string
  children: ReactNode
}

export function HomeBanner({
  bannerImageSrc,
  title,
  serviceTabs,
  activeTabId,
  children,
}: HomeBannerProps) {
  return (
    <div className="mx-auto min-h-[480px] max-w-[1440px] px-6">
      <div className="min-h-inherit relative">
        {/* Layer 1: banner background — fixed height, never pushed by content */}
        <div className="min-h-inherit pointer-events-none absolute inset-x-0 top-0 h-[480px] overflow-hidden rounded-[32px]">
          <Image
            src={bannerImageSrc}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="min(1392px, calc(100vw - 48px))"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(142.7% 142.7% at 50% 59.96%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.72) 100%)",
            }}
          />
        </div>

        {/* Layer 2: content — flows naturally, can exceed banner height */}
        <div className="relative z-10 flex flex-col items-center pb-1">
          <h1 className="mt-[132px] mb-24 text-center font-['Druk_Text_Wide_Cyr',sans-serif] text-[40px] leading-[48px] font-medium tracking-[0.04em] text-white">
            {title}
          </h1>

          <div className="ct-container">
            <div className="flex items-center gap-3">
              {serviceTabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={cn(
                    "inline-flex h-12 items-center gap-[7px] rounded-[24px] px-5 text-base leading-[19.7px] font-medium transition-colors",
                    tab.id === activeTabId
                      ? "bg-primary text-white"
                      : "text-c-gray-950 bg-white hover:bg-white/90"
                  )}
                >
                  <span
                    className={cn(
                      "flex shrink-0 items-center",
                      tab.id === activeTabId ? "text-white" : "text-c-gray-950"
                    )}
                    style={{ width: 20, height: 20 }}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="ct-container mt-3">
            <div
              className="rounded-[24px] bg-white p-5"
              style={{
                boxShadow: "0px 12px 100px 0px rgba(0,0,0,0.04)",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
