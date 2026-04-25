import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios"

import {
  clearAuthSession,
  getAuthSession,
  updateAuthSessionTokens,
} from "@/shared/stores/auth-store"

type UCodeResponse = {
  data?: {
    data?: {
      access_token?: string
      refresh_token?: string
      [key: string]: unknown
    }
    [key: string]: unknown
  }
  [key: string]: unknown
}

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean }

type AuthInterceptorConfig = {
  baseURL?: string
  projectId?: string
  environmentId?: string
  iamFunctionName?: string
}

function extractRefreshedTokens(payload: UCodeResponse): {
  accessToken: string
  refreshToken: string
} | null {
  const layer = payload.data?.data
  const accessToken = layer?.access_token
  const refreshToken = layer?.refresh_token
  if (!accessToken || !refreshToken) return null
  return { accessToken, refreshToken }
}

export function installAuthInterceptors(
  client: AxiosInstance,
  config: AuthInterceptorConfig
): void {
  const {
    baseURL,
    projectId,
    environmentId,
    iamFunctionName = "centraltour-iam",
  } = config

  let refreshPromise: Promise<string | null> | null = null

  async function refreshAccessToken(): Promise<string | null> {
    const session = getAuthSession()
    if (!session?.refreshToken) return null

    const response = await axios.post<UCodeResponse>(
      `/v2/invoke_function/${encodeURIComponent(iamFunctionName)}`,
      {
        data: {
          method: "refresh_token",
          object_data: {
            refresh_token: session.refreshToken,
          },
        },
      },
      {
        baseURL,
        params: { "project-id": projectId },
        headers: {
          "Content-Type": "application/json",
          "environment-id": environmentId,
        },
      } satisfies AxiosRequestConfig
    )

    const tokens = extractRefreshedTokens(response.data)
    if (!tokens) return null
    updateAuthSessionTokens(tokens)
    return tokens.accessToken
  }

  client.interceptors.request.use(
    (requestConfig: InternalAxiosRequestConfig) => {
      const session = getAuthSession()
      if (!session?.accessToken) return requestConfig

      requestConfig.headers = requestConfig.headers ?? {}
      requestConfig.headers.Authorization = `Bearer ${session.accessToken}`
      return requestConfig
    }
  )

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalConfig = error.config as RetriableConfig | undefined
      const isUnauthorized = error.response?.status === 401

      if (!isUnauthorized || !originalConfig || originalConfig._retry) {
        return Promise.reject(error)
      }

      originalConfig._retry = true

      try {
        if (!refreshPromise) refreshPromise = refreshAccessToken()
        const refreshedAccessToken = await refreshPromise
        refreshPromise = null

        if (!refreshedAccessToken) {
          clearAuthSession()
          return Promise.reject(error)
        }

        originalConfig.headers = originalConfig.headers ?? {}
        originalConfig.headers.Authorization = `Bearer ${refreshedAccessToken}`
        return client(originalConfig)
      } catch (refreshError) {
        refreshPromise = null
        clearAuthSession()
        return Promise.reject(refreshError)
      }
    }
  )
}
