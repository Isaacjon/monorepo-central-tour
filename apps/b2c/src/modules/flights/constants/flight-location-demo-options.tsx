"use client"

import { AirplaneIcon, BuildingIcon } from "ui"

import type { FlightLocationOption } from "../types/flight-location"

const city = () => (
  <BuildingIcon
    width={24}
    height={24}
    aria-hidden
    className="size-6 shrink-0 rounded-[3px] text-[#101828]"
  />
)

const airport = () => (
  <AirplaneIcon
    width={24}
    height={24}
    aria-hidden
    className="size-6 shrink-0 rounded-[3px] text-[#101828]"
  />
)

/** Demo data until airport/city search API is wired. */
export const FLIGHT_LOCATION_CITY_OPTIONS: FlightLocationOption[] = [
  { id: "tas-city", label: "Tashkent", icon: city() },
  { id: "nyc-city", label: "New York", icon: city() },
  { id: "par-city", label: "Paris", icon: city() },
  { id: "mun-city", label: "Munich", icon: city() },
  { id: "bcn-city", label: "Barcelona", icon: city() },
]

export const FLIGHT_LOCATION_AIRPORT_OPTIONS: FlightLocationOption[] = [
  {
    id: "tas-tas",
    label: "Tashkent, Islam Karimov International Airport",
    icon: airport(),
  },
  {
    id: "ncu",
    label: "Nukus International Airport",
    icon: airport(),
  },
  {
    id: "jfk",
    label: "New York, John F. Kennedy International Airport",
    icon: airport(),
  },
  { id: "dxb", label: "Dubai, DXB", icon: airport() },
]
