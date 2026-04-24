import { FlightsCheckoutErrorPage } from "@/modules/flights/pages/flights-checkout-error-page"

export default async function FlightsCheckoutErrorRoutePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return <FlightsCheckoutErrorPage lang={lang} />
}
