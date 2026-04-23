import type { FlightsFilterCopy } from "../components/flights-filter.config"

/** Pass `t` from `getTranslations("flights")` (server) or `useTranslations("flights")` (client). */
export function getFlightsFilterCopy(
  t: (key: string) => string
): FlightsFilterCopy {
  return {
    fromLabel: t("filterFrom"),
    toLabel: t("filterTo"),
    toPlaceholder: t("filterToPlaceholder"),
    locationSearchPlaceholder: t("filterToPlaceholder"),
    noLocationResults: t("filterNoLocationResults"),
    airportsGroupLabel: t("filterAirportsGroup"),
    departureLabel: t("filterDeparture"),
    departurePlaceholder: t("filterDeparturePlaceholder"),
    returnLabel: t("filterReturn"),
    returnPlaceholder: t("filterReturnPlaceholder"),
    passengersLabel: t("filterPassengers"),
    searchLabel: t("filterSearch"),
    complexRouteLabel: t("filterComplexRoute"),
    roundTripLabel: t("filterRoundTrip"),
    oneWayLabel: t("filterOneWay"),
    noStopsLabel: t("filterNoStops"),
  }
}

export function getFlightsSearchRouteHref(lang: string) {
  return `/${lang}/flights/search`
}
