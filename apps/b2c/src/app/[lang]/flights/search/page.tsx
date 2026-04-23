import { FlightsSearchPage } from "@/modules/flights/pages/flights-search-page"
import { getFlightSearchResults } from "@/modules/flights/services/flight-search/get-flight-search-results"

export default async function FlightsSearchRoutePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const { lang } = await params
  const query = searchParams ? await searchParams : {}
  const results = await getFlightSearchResults(query)

  return <FlightsSearchPage lang={lang} results={results} />
}
