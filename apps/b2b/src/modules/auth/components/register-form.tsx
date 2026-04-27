"use client"

import { useRegisterForm } from "@/modules/auth/hooks/use-register-form"
import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"

import { RegisterCompanyPanel } from "./register-company-panel"
import { RegisterConditionsPanel } from "./register-conditions-panel"
import { RegisterContactPanel } from "./register-contact-panel"
import { RegisterOtpPanel } from "./register-otp-panel"
import { RegisterPasswordPanel } from "./register-password-panel"
import { RegisterSuccessPanel } from "./register-success-panel"

export type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"

type RegisterFormProps = {
  copy: RegisterFormCopy
}

export function RegisterForm({ copy }: RegisterFormProps) {
  const f = useRegisterForm(copy)

  if (f.step === "otp") {
    return (
      <RegisterOtpPanel
        copy={copy}
        email={f.email}
        otp={f.otp}
        otpInvalid={f.otpInvalid}
        resendSeconds={f.resendSeconds}
        onOtpChange={f.onOtpValueChange}
        onResend={f.restartOtpResendTimer}
        onConfirm={f.handleOtpConfirm}
        onBack={f.handleOtpBack}
      />
    )
  }

  if (f.step === "company") {
    return (
      <RegisterCompanyPanel
        copy={copy}
        companyName={f.companyName}
        address={f.address}
        phone={f.phone}
        licenseFiles={f.licenseFiles}
        certificateFiles={f.certificateFiles}
        companyNameError={f.companyNameError}
        addressError={f.addressError}
        phoneError={f.phoneError}
        loading={f.companyLoading}
        onCompanyNameChange={f.onCompanyNameChange}
        onAddressChange={f.onAddressChange}
        onPhoneChange={f.onPhoneInputChange}
        onDialCodeChange={f.setPhoneDialCode}
        onLicenseChange={f.setLicenseFiles}
        onCertificateChange={f.setCertificateFiles}
        onSubmit={f.handleCompanySubmit}
        onBack={f.handleCompanyBack}
      />
    )
  }

  if (f.step === "password") {
    return (
      <RegisterPasswordPanel
        copy={copy}
        password={f.password}
        confirmPassword={f.confirmPassword}
        passwordError={f.passwordError}
        confirmPasswordError={f.confirmPasswordError}
        loading={f.passwordLoading}
        onPasswordChange={f.setPassword}
        onConfirmPasswordChange={f.setConfirmPassword}
        onSubmit={f.handlePasswordSubmit}
        onBack={f.handlePasswordBack}
      />
    )
  }

  if (f.step === "conditions") {
    return (
      <RegisterConditionsPanel
        copy={copy}
        accepted={f.conditionsAccepted}
        loading={f.passwordLoading}
        onAcceptedChange={f.setConditionsAccepted}
        onBack={f.handleConditionsBack}
        onSubmit={f.handleConditionsSubmit}
      />
    )
  }

  if (f.step === "success") {
    return <RegisterSuccessPanel copy={copy} />
  }

  return (
    <RegisterContactPanel
      copy={copy}
      fullName={f.fullName}
      email={f.email}
      fullNameError={f.fullNameError}
      emailError={f.emailError}
      loading={f.contactLoading}
      onFullNameChange={f.onContactNameChange}
      onEmailChange={f.onContactEmailChange}
      onSubmit={f.handleContactSubmit}
    />
  )
}
