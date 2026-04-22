import { FlightsPage } from "@/modules/flights/pages/flights-page"

export default async function FlightsRoutePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return <FlightsPage lang={lang} />
}
