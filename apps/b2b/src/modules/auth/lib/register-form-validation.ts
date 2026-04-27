import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"

export function getRegisterContactFieldErrors(
  fullName: string,
  email: string,
  copy: RegisterFormCopy
): { fullNameError: string; emailError: string } | null {
  let fullNameError = ""
  let emailError = ""

  if (!fullName.trim()) {
    fullNameError = copy.validationFullNameRequired
  }
  if (!email.trim()) {
    emailError = copy.validationEmailRequired
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    emailError = copy.validationEmailInvalid
  }

  if (!fullNameError && !emailError) return null
  return { fullNameError, emailError }
}

export function getRegisterCompanyFieldErrors(
  companyName: string,
  address: string,
  phone: string,
  copy: RegisterFormCopy
): {
  companyNameError: string
  addressError: string
  phoneError: string
} | null {
  let companyNameError = ""
  let addressError = ""
  let phoneError = ""

  if (!companyName.trim()) {
    companyNameError = copy.validationCompanyNameRequired
  }
  if (!address.trim()) {
    addressError = copy.validationAddressRequired
  }

  const phoneDigits = phone.replace(/\D/g, "")
  if (!phoneDigits) {
    phoneError = copy.validationPhoneRequired
  } else if (phoneDigits.length < 9) {
    phoneError = copy.validationPhoneInvalid
  }

  if (!companyNameError && !addressError && !phoneError) return null
  return { companyNameError, addressError, phoneError }
}

export function getRegisterPasswordFieldErrors(
  password: string,
  confirmPassword: string,
  copy: RegisterFormCopy
): {
  passwordError: string
  confirmPasswordError: string
} | null {
  let passwordError = ""
  let confirmPasswordError = ""

  if (!password.trim()) {
    passwordError = copy.validationPasswordRequired
  }
  if (!confirmPassword.trim()) {
    confirmPasswordError = copy.validationConfirmPasswordRequired
  }

  if (!passwordError && !confirmPasswordError) {
    if (password !== confirmPassword) {
      return {
        passwordError: "",
        confirmPasswordError: copy.validationPasswordsMismatch,
      }
    }
    return null
  }

  return { passwordError, confirmPasswordError }
}
