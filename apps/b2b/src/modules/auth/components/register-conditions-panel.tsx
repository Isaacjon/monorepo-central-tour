"use client"

import Image from "next/image"
import { useLocale } from "next-intl"
import { Suspense } from "react"

import { RegisterConditionsTermsRu } from "@/modules/auth/components/register-conditions-terms-ru"
import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"
import { HomeLanguageChanger } from "@/modules/home/components/home-language-changer"
import { Checkbox, PrimaryButton, SecondaryGrayButton } from "ui"

const LOGO_SRC = "/icons/logo.svg"

type RegisterConditionsPanelProps = {
  copy: RegisterFormCopy
  accepted: boolean
  loading: boolean
  onAcceptedChange: (next: boolean) => void
  onBack: () => void
  onSubmit: () => void
}

export function RegisterConditionsPanel({
  copy,
  accepted,
  loading,
  onAcceptedChange,
  onBack,
  onSubmit,
}: RegisterConditionsPanelProps) {
  const lang = useLocale()

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="ct-container py-4">
          <header className="mb-4 flex w-full items-center justify-between gap-4">
            <Image
              src={LOGO_SRC}
              alt="Centbed"
              width={159}
              height={36}
              priority
              unoptimized
              className="h-9 w-auto object-contain object-left"
            />
            <Suspense>
              <HomeLanguageChanger lang={lang} />
            </Suspense>
          </header>

          <section className="bg-c-gray-25 border-c-gray-200 flex w-full flex-col gap-4 rounded-2xl border p-6">
            <Image
              src={LOGO_SRC}
              alt="Centbed"
              width={159}
              height={36}
              unoptimized
              className="h-9 w-auto object-contain object-left"
            />
            <h1 className="text-c-greyscale-800 text-2xl leading-8 font-semibold">
              {copy.conditionsTitle}
            </h1>
            <RegisterConditionsTermsRu />
          </section>
        </div>
      </div>

      <footer className="border-c-gray-200 fixed inset-x-0 bottom-0 h-[72px] border-t bg-white">
        <div className="ct-container flex items-center justify-between gap-4 py-4">
          <label className="flex items-center gap-2">
            <Checkbox
              className="size-6"
              checked={accepted}
              onCheckedChange={(next) => onAcceptedChange(next === true)}
            />
            <span className="text-c-gray-500 text-base leading-6 font-normal">
              {copy.conditionsAgreement}
            </span>
          </label>

          <div className="flex items-center gap-5">
            <SecondaryGrayButton type="button" size="md" onClick={onBack}>
              {copy.back}
            </SecondaryGrayButton>
            <PrimaryButton
              type="button"
              size="md"
              onClick={onSubmit}
              disabled={!accepted || loading}
            >
              {copy.conditionsSubmit}
            </PrimaryButton>
          </div>
        </div>
      </footer>
    </div>
  )
}
