import { showToast } from "ui"

import { getErrorMessage } from "./auth-flow-utils"

const OTP_ALREADY_SENT_ERROR = "otp already sent please wait"

type RegisterSendOtpErrorCopy = {
  userAlreadyExists: string
  invalidPhoneNumber: string
  otpAlreadySent: string
  sendOtpFailed: string
}

export function showRegisterSendOtpError(
  error: unknown,
  copy: RegisterSendOtpErrorCopy
) {
  const rawMessage = getErrorMessage(error)
  const message = rawMessage?.toLowerCase() ?? ""

  const invalidPhoneNumber = message.includes("invalid phone number format")
  const alreadyExists = message.includes("user with this phone already exists")
  const otpAlreadySent = message.includes(OTP_ALREADY_SENT_ERROR)

  if (alreadyExists) {
    showToast({
      title: copy.userAlreadyExists,
      type: "error",
    })
    return
  }

  if (invalidPhoneNumber) {
    showToast({
      title: copy.invalidPhoneNumber,
      type: "error",
    })
    return
  }

  if (otpAlreadySent) {
    showToast({
      title: copy.otpAlreadySent,
      type: "error",
    })
    return
  }

  showToast({
    title: copy.sendOtpFailed,
    description: getErrorMessage(error),
    type: "error",
  })
}
