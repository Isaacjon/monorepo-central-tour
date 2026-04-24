import { FlightsSearchPage } from "@/modules/flights/pages/flights-search-page"

/** Query string must be read per request (layout uses `generateStaticParams` for `[lang]`). */
export const dynamic = "force-dynamic"

export default async function FlightsSearchRoutePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const { lang } = await params
  const query = searchParams ? await searchParams : {}

  return <FlightsSearchPage lang={lang} searchQuery={query} />
}
