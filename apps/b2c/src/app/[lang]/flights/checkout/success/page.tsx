import { FlightsCheckoutSuccessPage } from "@/modules/flights/pages/flights-checkout-success-page"

export default async function FlightsCheckoutSuccessRoutePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return <FlightsCheckoutSuccessPage lang={lang} />
}
