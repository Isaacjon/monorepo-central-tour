import Link from "next/link"
import { PrimaryButton } from "ui"

import { FlightsCheckoutShell } from "./flights-checkout-shell"

export async function FlightsCheckoutErrorPage({ lang }: { lang: string }) {
  return (
    <FlightsCheckoutShell lang={lang}>
      <main className="ct-container flex flex-1 items-center justify-center py-8">
        <section className="flex w-full max-w-[760px] flex-col items-center rounded-3xl border border-[#EAECF0] bg-white p-8 text-center">
          <h1 className="text-[28px] leading-[100%] font-bold text-[#B42318]">
            Ошибка оплаты
          </h1>
          <p className="mt-4 text-[20px] leading-[100%] font-normal text-[#667085]">
            Платеж не завершен. Пожалуйста, попробуйте еще раз.
          </p>

          <PrimaryButton
            asChild
            size="xl"
            className="mt-8 min-w-[220px] rounded-xl px-6"
          >
            <Link href={`/${lang}/flights/checkout`}>Вернуться к оплате</Link>
          </PrimaryButton>
        </section>
      </main>
    </FlightsCheckoutShell>
  )
}
