import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"

import { isLocale, locales } from "@/shared/lib/i18n/config"
import { Toaster } from "ui"

import "../globals.css"

const inter = Inter({
  variable: "--font-inter-stack",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Centbed",
  description: "Centbed — partner console for Central Tour.",
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  if (!isLocale(lang)) {
    notFound()
  }

  setRequestLocale(lang)
  const messages = await getMessages()

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages} locale={lang}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
