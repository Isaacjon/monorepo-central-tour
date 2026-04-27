"use client"

import Image from "next/image"
import { useLocale } from "next-intl"
import { type ReactNode, Suspense } from "react"

import { HomeLanguageChanger } from "@/modules/home/components/home-language-changer"

type AuthFormLayoutProps = {
  upper: ReactNode
  /** Omit when the screen pins actions/copy outside this layout (e.g. register success). */
  lower?: ReactNode
  /** Inner content max width in px (default matches narrow auth forms). */
  contentMaxWidth?: 416 | 532
}
const LOGO_SRC = "/icons/logo.svg"

export function AuthFormLayout({
  upper,
  lower,
  contentMaxWidth = 416,
}: AuthFormLayoutProps) {
  const lang = useLocale()
  const innerMaxClass =
    contentMaxWidth === 532 ? "max-w-[532px]" : "max-w-[416px]"
  const innerLayoutClass =
    lower != null
      ? `m-auto flex w-full ${innerMaxClass} flex-col gap-8 lg:min-h-[454px] lg:justify-between lg:gap-7`
      : `m-auto flex w-full ${innerMaxClass} flex-col gap-8`

  return (
    <div className="flex w-full flex-1 flex-col gap-6 p-4">
      <header className="flex w-full items-center justify-between gap-4">
        <div>
          <Image
            src={LOGO_SRC}
            alt="Centbed"
            width={137}
            height={36}
            priority
            unoptimized
            className="h-9 w-auto max-w-[200px] object-contain object-left"
          />
        </div>
        <Suspense>
          <HomeLanguageChanger lang={lang} />
        </Suspense>
      </header>

      <div className={innerLayoutClass}>
        {upper}
        {lower ?? null}
      </div>
    </div>
  )
}
