import type {
  FlightMiniRulesApi,
  FlightOfferDirectionApi,
  FlightOfferSegmentApi,
} from "../../types/flight-offers-search-api"

const defaultMiniRules: FlightMiniRulesApi = {
  accessories: { comment: "", dimensions: null, is_available: false, piece: null, status: null, weight: null },
  baggage: { comment: "", dimensions: null, is_available: true, piece: 1, status: null, weight: { unit: "kg", value: 23 } },
  carry_on_baggage: { comment: "", dimensions: null, is_available: true, piece: 1, status: null, weight: { unit: "kg", value: 8 } },
  exchange: { before_departure: { comment: "", is_available: true, is_free: false, is_mini_rules_exist: true, status: "available" } },
  refund: { before_departure: { comment: "", is_available: false, is_free: false, is_mini_rules_exist: true, status: "restricted" } },
}

function createSegment(
  partial: Pick<
    FlightOfferSegmentApi,
    | "segmentIndex"
    | "flightNumber"
    | "durationMinutes"
    | "routeDurationMinutes"
    | "transferDurationMinutes"
    | "marketingCarrier"
    | "carrier"
    | "departure"
    | "arrival"
  >
): FlightOfferSegmentApi {
  return {
    aircraft: { code: "320", name: "Airbus A320" },
    baggage: { piece: 1, unit: "kg", weight: 23 },
    baggageRecheck: false,
    brandNames: [],
    cabinClass: { bookingClass: "Y", serviceClass: "Эконом" },
    carryOnBaggage: { piece: 1, unit: "kg", weight: 8 },
    directionIndex: 0,
    isBaggageIncluded: true,
    isChangeable: true,
    isRefundable: false,
    miniRules: defaultMiniRules,
    seats: 9,
    technicalStops: [],
    validatingCarrier: partial.marketingCarrier,
    ...partial,
  }
}

export const checkoutDirection: FlightOfferDirectionApi = {
  directionIndex: 0,
  miniRules: defaultMiniRules,
  segments: [
    createSegment({
      segmentIndex: 0,
      flightNumber: "HY423",
      durationMinutes: 170,
      routeDurationMinutes: 555,
      transferDurationMinutes: 220,
      marketingCarrier: { code: "HY", name: "Узбекские авиалинии" },
      carrier: { code: "HY", name: "Узбекские авиалинии" },
      departure: { airportCode: "TAS", airportName: "TAS Международный Аэропорт имени Ислама Каримова T2", cityCode: "NYC", cityName: "Нью-Йорк", countryCode: "US", countryName: "США", date: "Пн, Март 2", terminal: "T2", time: "12:45", timestamp: 0 },
      arrival: { airportCode: "DEL", airportName: "DEL Международный аэропорт Индиры Ганди T3", cityCode: "DEL", cityName: "Нью-Дели", countryCode: "IN", countryName: "Индия", date: "Пн, Март 2", terminal: "T3", time: "15:35", timestamp: 0 },
    }),
    createSegment({
      segmentIndex: 1,
      flightNumber: "6E1081",
      durationMinutes: 265,
      routeDurationMinutes: 555,
      transferDurationMinutes: null,
      marketingCarrier: { code: "TK", name: "IndiGo" },
      carrier: { code: "TK", name: "IndiGo" },
      departure: { airportCode: "DEL", airportName: "DEL Международный аэропорт Индиры Ганди T3", cityCode: "DEL", cityName: "Нью-Дели", countryCode: "IN", countryName: "Индия", date: "Пн, Март 2", terminal: "T3", time: "19:15", timestamp: 0 },
      arrival: { airportCode: "HKT", airportName: "HKT Международный аэропорт Пхукета I", cityCode: "MIA", cityName: "Майами", countryCode: "US", countryName: "США", date: "Ср, Март 4", terminal: "I", time: "21:05", timestamp: 0 },
    }),
  ],
}
