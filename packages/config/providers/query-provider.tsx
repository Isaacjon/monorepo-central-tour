"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useState } from "react"

function getErrorStatus(error: unknown): number | undefined {
  if (error && typeof error === "object" && "status" in error) {
    const s = (error as { status: unknown }).status
    if (typeof s === "number" && Number.isFinite(s)) return s
  }
  return undefined
}

type QueryProviderProps = {
  children: ReactNode
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // How long data is considered fresh (1 minute)
            staleTime: 60 * 1000,

            // How long inactive queries stay in cache (5 minutes)
            // In v3 this was cacheTime; in v4+ it was renamed to gcTime
            gcTime: 5 * 60 * 1000,

            // Do not refetch when the window regains focus
            refetchOnWindowFocus: false,

            // Refetch when the network reconnects
            refetchOnReconnect: true,

            // Refetch when the component mounts
            refetchOnMount: true,

            // Retry policy: skip retries for 4xx client errors
            retry: (failureCount, error) => {
              const status = getErrorStatus(error)
              if (status !== undefined && status >= 400 && status < 500) {
                return false
              }
              return failureCount < 3
            },

            // Exponential backoff between retries (1s, 2s, 4s, max 30s)
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            retry: (failureCount, error) => {
              const status = getErrorStatus(error)
              if (status !== undefined && status >= 400 && status < 500) {
                return false
              }
              return failureCount < 1
            },
            retryDelay: 1000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
