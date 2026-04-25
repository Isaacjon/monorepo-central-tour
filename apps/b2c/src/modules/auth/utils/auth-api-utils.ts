import { HttpError } from "@/shared/lib/http-error"

import type {
  AuthTokens,
  ContactMethod,
  UCodeResponse,
} from "../services/auth/auth.types"

export function resolveIamFunctionName(): string {
  return (
    process.env.NEXT_PUBLIC_U_CODE_IAM_FUNCTION_NAME?.trim() ||
    "centraltour-iam"
  )
}

export function invokeFunctionUrl(): string {
  return `/v2/invoke_function/${encodeURIComponent(resolveIamFunctionName())}`
}

export function pickContact(method: ContactMethod, value: string) {
  const trimmedValue = value.trim()
  return method === "phone"
    ? { phone: trimmedValue }
    : { email: trimmedValue.toLowerCase() }
}

export function parseErrorPayload(payload: unknown): string {
  if (!payload) {
    return "Unknown server error"
  }
  if (typeof payload === "string") {
    return payload
  }
  if (typeof payload !== "object") {
    return "Unknown server error"
  }

  const o = payload as Record<string, unknown>
  const candidates = [
    o.custom_message,
    o.message,
    (o.data as { server_error?: unknown } | undefined)?.server_error,
  ]

  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) {
      return value.trim()
    }
  }

  return JSON.stringify(payload)
}

export function extractTokens(payload: UCodeResponse): AuthTokens {
  const layer = payload.data?.data
  const accessToken = layer?.access_token
  const refreshToken = layer?.refresh_token
  const userId = layer?.user_id

  if (!accessToken || !refreshToken || !userId) {
    throw new HttpError(500, "Invalid auth response payload")
  }

  return {
    accessToken,
    refreshToken,
    userId,
  }
}
