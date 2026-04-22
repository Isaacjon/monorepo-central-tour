"use client"

import Image from "next/image"
import { useLocale } from "next-intl"
import { type ReactNode, Suspense } from "react"

import { HomeLanguageChanger } from "@/modules/home/components/home-language-changer"

type AuthFormLayoutProps = {
  upper: ReactNode
  lower: ReactNode
}
const LOGO_SRC = "/icons/logo.svg"

export function AuthFormLayout({ upper, lower }: AuthFormLayoutProps) {
  const lang = useLocale()
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

      <div className="m-auto flex w-full max-w-[416px] flex-col gap-8 lg:min-h-[454px] lg:justify-between lg:gap-0">
        {upper}
        {lower}
      </div>
    </div>
  )
}
