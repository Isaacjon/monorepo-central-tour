"use client"

import { RefreshCwIcon, XIcon } from "lucide-react"
import {
  CardsIcon,
  CarryingSuitcaseIcon,
  LuggageIcon,
  PrimaryButton,
  SecondaryGrayButton,
  TurkishAirlinesIcon,
} from "ui"

export function FlightsCheckoutDetailsView() {
  return (
    <main className="ct-container flex flex-1 flex-col py-8">
      <div className="flex w-full items-start gap-5">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="h-[186px] rounded-[16px] border border-[#EAECF0] bg-white p-4 text-left">
            <div className="flex h-full items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-5">
                <div className="flex flex-col gap-1.5">
                  <span className="inline-flex size-6 items-center justify-center rounded-[100px] bg-[#ECFDF3]">
                    <TurkishAirlinesIcon width={24} height={24} aria-hidden />
                  </span>
                  <span className="text-[15px] leading-[22px] font-normal text-[#5B6871]">
                    Turkish airlines
                  </span>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <span className="size-3 rounded-full border-2 border-[#D0D5DD]" />
                      <span className="h-9 w-px bg-[#D0D5DD]" />
                      <span className="size-3 rounded-full border-2 border-[#D0D5DD]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[16px] leading-[22px] font-bold text-[#000000]">
                        08:50{" "}
                        <span className="text-[15px] leading-[22px] font-normal text-[#111126]">
                          29 март, вс
                        </span>
                      </p>
                      <p className="text-[16px] leading-[22px] font-bold text-[#000000]">
                        14:10{" "}
                        <span className="text-[15px] leading-[22px] font-normal text-[#111126]">
                          29 март, вс
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex h-[74px] w-[155px] flex-col justify-between rounded-[12px] bg-[#F9FAFB] p-3">
                    <span className="text-[15px] leading-[22px] font-normal text-[#111126]">
                      Economy premium
                    </span>
                    <div className="flex items-center gap-[6px]">
                      <CarryingSuitcaseIcon
                        className="size-5 text-[#09A112]"
                        aria-hidden
                      />
                      <LuggageIcon
                        className="size-5 text-[#98A2B3]"
                        aria-hidden
                      />
                      <XIcon className="size-5 text-[#98A2B3]" aria-hidden />
                      <RefreshCwIcon
                        className="size-5 text-[#98A2B3]"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
              </div>

              <PrimaryButton className="h-12 rounded-xl px-6">
                Посмотреть детали
              </PrimaryButton>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <PrimaryButton className="rounded-xl">Скачать ваучер</PrimaryButton>
            <SecondaryGrayButton className="rounded-xl">
              Распечатать ваучер
            </SecondaryGrayButton>
            <PrimaryButton className="rounded-xl">
              Счет-фактура клиента
            </PrimaryButton>
            <SecondaryGrayButton className="rounded-xl">
              Распечатать счет-фактуру
            </SecondaryGrayButton>
          </div>
        </div>

        <aside className="w-[320px] overflow-hidden rounded-[16px] border border-[#EAECF0] bg-white">
          <header className="border-b border-[#EAECF0] px-4 py-5">
            <h3 className="text-[20px] leading-[100%] font-bold text-[#0C111D]">
              Информация о платеже
            </h3>
          </header>

          <div className="flex h-[128px] flex-col items-center justify-center gap-1 border-b border-[#EAECF0] p-4">
            <CardsIcon className="size-12 text-[#0C111D]" aria-hidden />
            <p className="text-center text-[16px] leading-5 font-medium text-[#98A2B3]">
              Оплачено через:
            </p>
            <p className="text-center text-[16px] leading-5 font-medium text-[#0C111D]">
              Баланс Агента
            </p>
          </div>

          <div className="flex h-[82px] flex-col items-center justify-center gap-[10px] p-4">
            <p className="text-center text-[16px] leading-5 font-medium text-[#0C111D]">
              Общая сумма
            </p>
            <p className="text-center text-[24px] leading-5 font-bold text-[#0C111D]">
              $ 344
            </p>
          </div>
        </aside>
      </div>
    </main>
  )
}
