import { useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"

type LoginStep = "credentials" | "otp"

export function useOtpResendInterval(
  step: LoginStep,
  resendToken: number,
  setResendSeconds: Dispatch<SetStateAction<number>>
) {
  useEffect(() => {
    if (step !== "otp") {
      return
    }
    const id = window.setInterval(() => {
      setResendSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(id)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [step, resendToken, setResendSeconds])
}
