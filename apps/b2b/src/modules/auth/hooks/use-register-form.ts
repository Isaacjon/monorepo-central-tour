import { useState } from "react"

import { useRegisterFormCompanyOnwards } from "@/modules/auth/hooks/use-register-form-company-onwards"
import { useRegisterFormContactOtp } from "@/modules/auth/hooks/use-register-form-contact-otp"
import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"
import type { RegisterFormStep } from "@/modules/auth/types/register-form-step"

export function useRegisterForm(copy: RegisterFormCopy) {
  const [step, setStep] = useState<RegisterFormStep>("contact")

  const contactOtp = useRegisterFormContactOtp(copy, step, setStep)
  const companyOnwards = useRegisterFormCompanyOnwards(
    copy,
    setStep,
    contactOtp.email,
    contactOtp.otp
  )

  return {
    step,
    ...contactOtp,
    ...companyOnwards,
  }
}
