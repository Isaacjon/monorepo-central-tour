"use client"

import Image from "next/image"
import type { ReactNode } from "react"

import { HomeLanguageChanger } from "@/modules/home/components/home-language-changer"

const LOGO_SRC = "/icons/logo.svg"

type AuthFormLayoutProps = {
  lang: string
  logoWordmark: string
  upper: ReactNode
  lower: ReactNode
}

export function AuthFormLayout({
  lang,
  logoWordmark,
  upper,
  lower,
}: AuthFormLayoutProps) {
  return (
    <div className="flex w-full flex-1 flex-col gap-6 p-4">
      <header className="flex w-full items-center justify-between gap-4">
        <div>
          <Image
            src={LOGO_SRC}
            alt={logoWordmark}
            height={36}
            width={85}
            priority
            unoptimized
            className="h-9 w-auto object-contain object-left"
          />
        </div>
        <HomeLanguageChanger lang={lang} />
      </header>

      <div className="m-auto flex w-full max-w-[416px] flex-col gap-8 lg:min-h-[598px] lg:justify-between lg:gap-0">
        {upper}
        {lower}
      </div>
    </div>
  )
}
