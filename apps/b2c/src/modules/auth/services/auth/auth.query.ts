import { useMutation } from "@tanstack/react-query"

import {
  type AuthTokens,
  loginClient,
  type LoginClientInput,
  registerClient,
  type RegisterClientInput,
  sendOtp,
  type SendOtpInput,
} from "./auth.api"

export const authKeys = {
  all: ["auth"] as const,
  otp: () => [...authKeys.all, "otp"] as const,
  register: () => [...authKeys.all, "register"] as const,
  login: () => [...authKeys.all, "login"] as const,
} as const

export function useSendOtpMutation() {
  return useMutation<void, Error, SendOtpInput>({
    mutationKey: authKeys.otp(),
    mutationFn: (input) => sendOtp(input),
  })
}

export function useRegisterClientMutation() {
  return useMutation<AuthTokens, Error, RegisterClientInput>({
    mutationKey: authKeys.register(),
    mutationFn: (input) => registerClient(input),
  })
}

export function useLoginClientMutation() {
  return useMutation<AuthTokens, Error, LoginClientInput>({
    mutationKey: authKeys.login(),
    mutationFn: (input) => loginClient(input),
  })
}
