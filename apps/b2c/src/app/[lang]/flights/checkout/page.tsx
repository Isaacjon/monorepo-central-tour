import { FlightsCheckoutPage } from "@/modules/flights/pages/flights-checkout-page"

export default async function FlightsCheckoutRoutePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const { lang } = await params
  const query = searchParams ? await searchParams : {}

  return (
    <FlightsCheckoutPage lang={lang} paymentStatus={query.paymentStatus} />
  )
}
