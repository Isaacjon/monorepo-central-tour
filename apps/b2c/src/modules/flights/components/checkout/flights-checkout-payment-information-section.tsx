"use client"

import { useState } from "react"
import {
  InputField,
  MaskedInputField,
  type SearchableCommandGroup,
  SearchableCommandPopover,
  Switch,
} from "ui"

const emptyIcon = <span className="size-5" aria-hidden />

const countryGroups: SearchableCommandGroup[] = [
  {
    options: [
      { value: "uz", label: "Uzbekistan", icon: emptyIcon },
      { value: "kz", label: "Kazakhstan", icon: emptyIcon },
      { value: "kg", label: "Kyrgyzstan", icon: emptyIcon },
    ],
  },
]

export function FlightsCheckoutPaymentInformationSection() {
  const [country, setCountry] = useState<string | null>(null)

  return (
    <section className="overflow-hidden rounded-3xl border border-[#EAECF0] bg-white shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04)]">
      <header className="border-b border-[#EAECF0] px-4 py-5 md:px-6">
        <h2 className="text-[20px] leading-5 font-bold text-[#0C111D]">
          Платежная информация
        </h2>
      </header>
      <div className="p-4 md:p-6">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="flex h-[72px] w-[132px] flex-col justify-between rounded-[12px] border border-[#F2F4F7] px-3 py-2.5 text-left"
          >
            <span className="ml-auto inline-flex size-6 items-center justify-center rounded-[7px] bg-[#1D4ED8] text-[14px] font-semibold text-white">
              U
            </span>
            <span className="text-[14px] leading-5 font-medium text-[#1D2939]">
              **1201
            </span>
          </button>

          <button
            type="button"
            className="flex h-[72px] w-[132px] flex-col justify-between rounded-[12px] border border-[#F2F4F7] px-3 py-2.5 text-left"
          >
            <span className="ml-auto inline-flex h-6 items-center justify-center rounded-[7px] bg-[#1D4ED8] px-1.5 text-[9px] font-semibold tracking-[0.06em] text-white uppercase">
              Visa
            </span>
            <span className="text-[14px] leading-5 font-medium text-[#1D2939]">
              **1201
            </span>
          </button>

          <button
            type="button"
            className="flex h-[72px] w-[132px] flex-col justify-between rounded-[12px] border border-[#F2F4F7] px-3 py-2.5 text-left"
          >
            <span className="ml-auto inline-flex size-6 items-center justify-center rounded-full bg-linear-to-r from-[#EA3943] to-[#F59E0B]" />
            <span className="text-[14px] leading-5 font-medium text-[#1D2939]">
              **1201
            </span>
          </button>

          <button
            type="button"
            className="flex h-[72px] w-[132px] flex-col justify-between rounded-[12px] border border-[#F2F4F7] px-3 py-2.5 text-left"
          >
            <span className="ml-auto inline-flex size-6 items-center justify-center rounded-[7px] bg-[#003B7A] text-[14px] font-semibold text-[#F6D860]">
              H
            </span>
            <span className="text-[14px] leading-5 font-medium text-[#1D2939]">
              **1201
            </span>
          </button>

          <button
            type="button"
            className="flex h-[72px] w-[132px] flex-col items-center justify-center rounded-[12px] border border-dashed border-[#98A2B3] text-center"
          >
            <span className="text-[24px] leading-6 font-light text-[#101828]">
              +
            </span>
            <span className="mt-1 text-[12px] leading-[18px] font-normal text-[#101828]">
              Добавить карту
            </span>
          </button>
        </div>

        <div className="mt-3 h-[80px] w-full max-w-[856px] rounded-[12px] border border-[#EAECF0] p-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] leading-[18px] font-normal text-[#98A2B3]">
              Комбинированная оплата
            </span>
            <Switch defaultChecked aria-label="Комбинированная оплата" />
          </div>

          <div className="mt-1 flex items-center gap-3">
            <span className="whitespace-nowrap text-[16px] leading-6 font-normal text-[#1D2939]">
              Использовать с баланса
            </span>
            <InputField
              defaultValue="18 000 000"
              wrapperClassName="h-8 w-[132px] rounded-[8px] border-[#EAECF0] px-3 shadow-none focus-within:shadow-none"
              inputClassName="text-center text-[16px] leading-6 font-normal text-[#1D2939]"
            />
            <span className="text-[16px] leading-6 font-normal text-[#1D2939]">
              UZS
            </span>
          </div>
        </div>

        <div className="mt-3">
          <MaskedInputField
            label="Номер карты"
            mask="9999 9999 9999 9999"
            maskPlaceholder={null}
            placeholder="1234 1234 1234 1234"
            inputMode="numeric"
          />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          <MaskedInputField
            label="Срок"
            mask="99 / 99"
            maskPlaceholder={null}
            placeholder="MM / YY"
            inputMode="numeric"
          />
          <MaskedInputField
            label="CVC"
            mask="999"
            maskPlaceholder={null}
            placeholder="CVC"
            inputMode="numeric"
          />
        </div>

        <div className="mt-3">
          <SearchableCommandPopover
            label="Страна"
            emptyLabel="Страна"
            searchPlaceholder="Найти страну"
            emptySearchLabel="Ничего не найдено"
            groups={countryGroups}
            value={country}
            onValueChange={setCountry}
          />
        </div>
      </div>
    </section>
  )
}
