import { isAxiosError } from "axios"

import {
  extractTokens,
  invokeFunctionUrl,
  parseErrorPayload,
  pickContact,
} from "@/modules/auth/utils/auth-api-utils"
import apiClient from "@/shared/api/api-client"
import { HttpError } from "@/shared/lib/http-error"

import type {
  AuthTokens,
  InvokeMethod,
  LoginClientInput,
  RegisterClientInput,
  SendOtpInput,
  UCodeResponse,
} from "./auth.types"

async function invokeIamMethod<TObjectData extends Record<string, unknown>>(
  method: InvokeMethod,
  objectData: TObjectData
): Promise<UCodeResponse> {
  try {
    const { data } = await apiClient.post<UCodeResponse>(invokeFunctionUrl(), {
      data: {
        method,
        object_data: objectData,
      },
    })
    return data
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      throw new HttpError(
        e.response.status,
        parseErrorPayload(e.response.data).slice(0, 500)
      )
    }
    throw e
  }
}

export type { AuthTokens, LoginClientInput, RegisterClientInput, SendOtpInput }

export async function sendOtp(input: SendOtpInput): Promise<void> {
  await invokeIamMethod("send_otp", {
    ...pickContact(input.method, input.value),
    registration: input.mode === "register",
  })
}

export async function registerClient(
  input: RegisterClientInput
): Promise<AuthTokens> {
  const response = await invokeIamMethod("register_client", {
    first_name: input.firstName.trim(),
    second_name: input.middleName.trim(),
    last_name: input.lastName.trim(),
    otp: input.otp.trim(),
    ...pickContact(input.contactMethod, input.contactValue),
  })

  return extractTokens(response)
}

export async function loginClient(
  input: LoginClientInput
): Promise<AuthTokens> {
  const response = await invokeIamMethod("login_client", {
    otp: input.otp.trim(),
    ...pickContact(input.contactMethod, input.contactValue),
  })

  return extractTokens(response)
}
