import { type Dispatch, type SetStateAction, useEffect } from "react"

export function useOtpResendInterval(
  active: boolean,
  resendToken: number,
  setResendSeconds: Dispatch<SetStateAction<number>>
) {
  useEffect(() => {
    if (!active) return
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
  }, [active, resendToken, setResendSeconds])
}
