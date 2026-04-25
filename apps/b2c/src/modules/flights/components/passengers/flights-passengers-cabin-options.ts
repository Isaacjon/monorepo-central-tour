import type { FlightCabin } from "../../types/flight-passengers"

export const CABIN_OPTIONS: FlightCabin[] = [
  "economy",
  "comfort",
  "business",
  "first",
]

export const CABIN_MESSAGE_KEY: Record<
  FlightCabin,
  "cabinEconomy" | "cabinComfort" | "cabinBusiness" | "cabinFirst"
> = {
  economy: "cabinEconomy",
  comfort: "cabinComfort",
  business: "cabinBusiness",
  first: "cabinFirst",
}
