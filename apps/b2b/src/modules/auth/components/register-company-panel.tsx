"use client"

import { type FormEvent, useId } from "react"

import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"
import {
  FileUpload,
  InputField,
  PhoneCountryInput,
  PrimaryButton,
  SecondaryGrayButton,
} from "ui"

import { AuthFormLayout } from "./auth-form-layout"

const FORM_ID = "b2b-register-company-form"

type RegisterCompanyPanelProps = {
  copy: RegisterFormCopy
  companyName: string
  address: string
  phone: string
  licenseFiles: File[]
  certificateFiles: File[]
  companyNameError: string
  addressError: string
  phoneError: string
  loading: boolean
  onCompanyNameChange: (value: string) => void
  onAddressChange: (value: string) => void
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDialCodeChange: (dialCode: string) => void
  onLicenseChange: (files: File[]) => void
  onCertificateChange: (files: File[]) => void
  onSubmit: (e: FormEvent) => void
  onBack: () => void
}

export function RegisterCompanyPanel({
  copy,
  companyName,
  address,
  phone,
  licenseFiles,
  certificateFiles,
  companyNameError,
  addressError,
  phoneError,
  loading,
  onCompanyNameChange,
  onAddressChange,
  onPhoneChange,
  onDialCodeChange,
  onLicenseChange,
  onCertificateChange,
  onSubmit,
  onBack,
}: RegisterCompanyPanelProps) {
  const phoneFieldId = useId()
  const fieldNameSuffix = useId().replace(/:/g, "")

  return (
    <AuthFormLayout
      upper={
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[30px] leading-[38px] font-semibold text-[#101828]">
              {copy.companyTitle}
            </h1>
            <p className="text-[16px] leading-[24px] text-[#667085]">
              {copy.companySubtitle}
            </p>
          </div>

          <form
            id={FORM_ID}
            className="flex w-full flex-col gap-4"
            onSubmit={onSubmit}
            noValidate
          >
            <InputField
              name={`b2b-register-company-name-${fieldNameSuffix}`}
              label={copy.companyNameLabel}
              placeholder={copy.companyNamePlaceholder}
              value={companyName}
              onChange={(e) => onCompanyNameChange(e.target.value)}
              variant={companyNameError ? "error" : "default"}
              hintLeft={companyNameError || undefined}
              autoComplete="off"
            />
            <InputField
              name={`b2b-register-company-address-${fieldNameSuffix}`}
              label={copy.companyAddressLabel}
              placeholder={copy.companyAddressPlaceholder}
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
              variant={addressError ? "error" : "default"}
              hintLeft={addressError || undefined}
              autoComplete="off"
            />
            <PhoneCountryInput
              id={phoneFieldId}
              label={copy.companyPhoneLabel}
              value={phone}
              onChange={onPhoneChange}
              onDialCodeChange={onDialCodeChange}
              error={phoneError || undefined}
              autoComplete="off"
            />

            <div className="flex flex-col gap-1.5">
              <p className="text-c-gray-700 text-sm leading-5 font-medium">
                {copy.companyLicenseLabel}
              </p>
              <FileUpload onFilesChange={onLicenseChange} />
              {licenseFiles.length > 0 ? (
                <p className="text-c-gray-600 text-xs">
                  {licenseFiles.map((file) => file.name).join(", ")}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-c-gray-700 text-sm leading-5 font-medium">
                {copy.companyCertificateLabel}
              </p>
              <FileUpload onFilesChange={onCertificateChange} />
              {certificateFiles.length > 0 ? (
                <p className="text-c-gray-600 text-xs">
                  {certificateFiles.map((file) => file.name).join(", ")}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      }
      lower={
        <div className="flex flex-col gap-3 pt-4 lg:pt-0">
          <PrimaryButton
            type="submit"
            form={FORM_ID}
            size="lg"
            fullWidth
            className="rounded-xl"
            disabled={loading}
          >
            {copy.continue}
          </PrimaryButton>
          <SecondaryGrayButton
            type="button"
            fullWidth
            size="lg"
            onClick={onBack}
            disabled={loading}
          >
            {copy.back}
          </SecondaryGrayButton>
        </div>
      }
    />
  )
}
