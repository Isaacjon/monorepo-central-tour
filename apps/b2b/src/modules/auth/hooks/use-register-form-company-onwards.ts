import {
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react"

import {
  getRegisterCompanyFieldErrors,
  getRegisterPasswordFieldErrors,
} from "@/modules/auth/lib/register-form-validation"
import { getFullPhoneDigitsE164 } from "@/modules/auth/lib/register-phone"
import {
  completeRegister,
  submitRegisterCompany,
} from "@/modules/auth/services/register"
import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"
import type { RegisterFormStep } from "@/modules/auth/types/register-form-step"
import { showToast } from "ui"

export function useRegisterFormCompanyOnwards(
  copy: RegisterFormCopy,
  setStep: Dispatch<SetStateAction<RegisterFormStep>>,
  email: string,
  otp: string
) {
  const [companyName, setCompanyName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [phoneDialCode, setPhoneDialCode] = useState("+998")
  const [licenseFiles, setLicenseFiles] = useState<File[]>([])
  const [certificateFiles, setCertificateFiles] = useState<File[]>([])
  const [companyNameError, setCompanyNameError] = useState("")
  const [addressError, setAddressError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [companyLoading, setCompanyLoading] = useState(false)

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [conditionsAccepted, setConditionsAccepted] = useState(false)

  function onCompanyNameChange(value: string) {
    setCompanyName(value)
    if (companyNameError) setCompanyNameError("")
  }

  function onAddressChange(value: string) {
    setAddress(value)
    if (addressError) setAddressError("")
  }

  const onPhoneInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
    if (phoneError) setPhoneError("")
  }

  async function handleCompanySubmit(e: FormEvent) {
    e.preventDefault()
    const fieldErrors = getRegisterCompanyFieldErrors(
      companyName,
      address,
      phone,
      copy
    )
    if (fieldErrors) {
      setCompanyNameError(fieldErrors.companyNameError)
      setAddressError(fieldErrors.addressError)
      setPhoneError(fieldErrors.phoneError)
      return
    }
    setCompanyNameError("")
    setAddressError("")
    setPhoneError("")

    setCompanyLoading(true)
    try {
      await submitRegisterCompany({
        companyName,
        address,
        phone: getFullPhoneDigitsE164(phone, phoneDialCode),
        licenseFiles,
        certificateFiles,
      })
      setStep("password")
    } catch {
      showToast({ title: copy.registerErrorToast, type: "error" })
    } finally {
      setCompanyLoading(false)
    }
  }

  function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault()
    const fieldErrors = getRegisterPasswordFieldErrors(
      password,
      confirmPassword,
      copy
    )
    if (fieldErrors) {
      setPasswordError(fieldErrors.passwordError)
      setConfirmPasswordError(fieldErrors.confirmPasswordError)
      return
    }
    setPasswordError("")
    setConfirmPasswordError("")
    setStep("conditions")
  }

  function handleCompanyBack() {
    setStep("otp")
  }

  function handlePasswordBack() {
    setStep("company")
  }

  function handleConditionsBack() {
    setStep("password")
  }

  async function handleConditionsSubmit() {
    if (!conditionsAccepted) return
    setPasswordLoading(true)
    try {
      await completeRegister({ email: email.trim(), otp, password })
      setStep("success")
    } catch {
      showToast({ title: copy.registerErrorToast, type: "error" })
    } finally {
      setPasswordLoading(false)
    }
  }

  return {
    companyName,
    address,
    phone,
    phoneError,
    companyNameError,
    addressError,
    companyLoading,
    licenseFiles,
    certificateFiles,
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    passwordLoading,
    conditionsAccepted,
    onCompanyNameChange,
    onAddressChange,
    onPhoneInputChange,
    setPhoneDialCode,
    setLicenseFiles,
    setCertificateFiles,
    handleCompanySubmit,
    handleCompanyBack,
    setPassword,
    setConfirmPassword,
    handlePasswordSubmit,
    handlePasswordBack,
    setConditionsAccepted,
    handleConditionsBack,
    handleConditionsSubmit,
  }
}
