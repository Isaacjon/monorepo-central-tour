"use client"

import { useState } from "react"

import {
  airlineSeed,
  classSeed,
  mealSeed,
  stopsSeed,
} from "./flights-search-sidebar-seeds"

export function useFlightsSearchSidebarState() {
  const [favorites, setFavorites] = useState(false)
  const [stops, setStops] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        stopsSeed.map((r) => [r.key, r.key === "all"])
      ) as Record<string, boolean>
  )
  const [airlines, setAirlines] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        airlineSeed.map((r) => [r.key, r.key === "all"])
      ) as Record<string, boolean>
  )
  const [cabin, setCabin] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(classSeed.map((k) => [k, k === "economy"])) as Record<
        string,
        boolean
      >
  )
  const [meals, setMeals] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(mealSeed.map((k) => [k, k === "all"])) as Record<
        string,
        boolean
      >
  )
  const [cities, setCities] = useState<Record<string, boolean>>({ dubai: true })
  const [rating, setRating] = useState<string>("any")

  return {
    favorites,
    setFavorites,
    stops,
    setStops,
    airlines,
    setAirlines,
    cabin,
    setCabin,
    meals,
    setMeals,
    cities,
    setCities,
    rating,
    setRating,
  }
}
