import { routing } from "./routing"

export const locales = routing.locales

export type Locale = (typeof routing.locales)[number]

export const defaultLocale: Locale = routing.defaultLocale

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale)
