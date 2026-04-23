import { isAxiosError } from "axios"

import apiClient from "@/shared/api/api-client"
import { HttpError } from "@/shared/lib/http-error"

export type AirportOptionDto = {
  id: string
  label: string
}

type ApiAirport = {
  _class?: string
  _csv_row?: string
  iata?: string
  icao?: string
  airport_name?: string
  city?: string
  country?: string
  elevation?: number
  latitude?: number
  longitude?: number
  timezone?: string
  utc_offset?: number
}

type UCodeEnvelope = {
  data: {
    status?: string
    data?: {
      airports: ApiAirport[]
    }
  }
}

function mapAirports(airports: ApiAirport[]): AirportOptionDto[] {
  const out: AirportOptionDto[] = []
  for (const a of airports) {
    const id = (a.iata?.trim() || a.icao?.trim()) ?? ""
    if (!id) continue
    const city = a.city?.trim() ?? ""
    const name = a.airport_name?.trim() ?? ""
    const label = city && name ? `${city}, ${name}` : name || city || id
    out.push({ id, label })
  }
  return out
}

/** Fetches airports from U-Code (client-side; uses NEXT_PUBLIC_* env). */
export async function getAirports(): Promise<AirportOptionDto[]> {
  const functionName =
    process.env.NEXT_PUBLIC_U_CODE_FUNCTION_NAME?.trim() ||
    "centraltour-aggregators"
  const url = `/v2/invoke_function/${encodeURIComponent(functionName)}`

  try {
    const { data: json } = await apiClient.post<UCodeEnvelope>(url, {
      data: {
        method: "get_airports",
        object_data: {
          country: "Uzbekistan",
          city: "",
          airport_name: "",
          page: 1,
          limit: 50,
        },
      },
    })

    const airports = json.data?.data?.airports ?? []
    return mapAirports(airports)
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      const detail =
        typeof e.response.data === "string"
          ? e.response.data
          : JSON.stringify(e.response.data)
      throw new HttpError(e.response.status, detail.slice(0, 200))
    }
    throw e
  }
}
