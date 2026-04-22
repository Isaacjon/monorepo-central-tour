import { routing } from "@central-tour/config/i18n/routing"
import createMiddleware from "next-intl/middleware"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { IS_B2B_AUTHENTICATED } from "@/modules/auth/constants/session-stub"

const intlMiddleware = createMiddleware(routing)

const AUTH_PATH_PREFIXES = ["/login", "/register", "/forgot-password"] as const

function isPublicAuthPath(pathnameWithoutLocale: string): boolean {
  return AUTH_PATH_PREFIXES.some(
    (prefix) =>
      pathnameWithoutLocale === prefix ||
      pathnameWithoutLocale.startsWith(`${prefix}/`),
  )
}

function getLocaleAndSubpath(pathname: string): { locale: string; withoutLocale: string } {
  const segments = pathname.split("/").filter(Boolean)
  const first = segments[0]
  const isKnownLocale = first
    ? (routing.locales as readonly string[]).includes(first)
    : false

  if (isKnownLocale && first) {
    const rest = segments.slice(1)
    return {
      locale: first,
      withoutLocale: rest.length ? `/${rest.join("/")}` : "/",
    }
  }

  return {
    locale: routing.defaultLocale,
    withoutLocale: pathname === "/" ? "/" : `/${segments.join("/")}`,
  }
}

export default function proxy(request: NextRequest) {
  const intlResponse = intlMiddleware(request)

  if (intlResponse.status >= 300 && intlResponse.status < 400) {
    return intlResponse
  }

  if (IS_B2B_AUTHENTICATED) {
    return intlResponse
  }

  const { locale, withoutLocale } = getLocaleAndSubpath(request.nextUrl.pathname)

  if (isPublicAuthPath(withoutLocale)) {
    return intlResponse
  }

  return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
