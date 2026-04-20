"use client"

import InputMask from "@mona-health/react-input-mask"
import { Check, ChevronDown } from "lucide-react"
import { useId, useState } from "react"
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form"

import type { LoginFormCopy } from "@/modules/auth/types/login-form-copy"
import {
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  inputWrapperVariants,
} from "ui"

type PhoneCountry = {
  code: string
  flag: string
  dialCode: string
  mask: string
  placeholder: string
}

const PHONE_COUNTRIES: PhoneCountry[] = [
  {
    code: "UZ",
    flag: "🇺🇿",
    dialCode: "+998",
    mask: "(99) 999-99-99",
    placeholder: "(90) 123-45-67",
  },
  {
    code: "RU",
    flag: "🇷🇺",
    dialCode: "+7",
    mask: "(999) 999-99-99",
    placeholder: "(912) 345-67-89",
  },
  {
    code: "US",
    flag: "🇺🇸",
    dialCode: "+1",
    mask: "(999) 999-9999",
    placeholder: "(555) 123-4567",
  },
]

type LoginPhoneFieldProps<T extends FieldValues & { phone: string }> = {
  control: Control<T>
  copy: Pick<LoginFormCopy, "phoneLabel" | "countryDialPreview">
  tab: string
}

export function LoginPhoneField<T extends FieldValues & { phone: string }>({
  control,
  copy,
  tab,
}: LoginPhoneFieldProps<T>) {
  const [country, setCountry] = useState<PhoneCountry>(PHONE_COUNTRIES[0]!)
  const inputId = useId()

  if (tab !== "phone") return null

  return (
    <Controller
      control={control}
      name={"phone" as Path<T>}
      render={({ field, fieldState }) => {
        const hasError = Boolean(fieldState.error)
        return (
          <div className="flex w-full flex-col gap-1.5">
            <label
              htmlFor={inputId}
              className="font-[family-name:var(--font-inter-stack,Inter,ui-sans-serif,sans-serif)] text-sm leading-5 font-medium tracking-normal text-[color:var(--c-gray-700)]"
            >
              {copy.phoneLabel}
            </label>
            <div
              className={cn(
                inputWrapperVariants({
                  variant: hasError ? "error" : "default",
                }),
                "!gap-0 overflow-hidden !px-0"
              )}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "flex h-10 shrink-0 items-center gap-1.5 px-3 text-sm font-medium transition-colors outline-none",
                      "text-[color:var(--c-gray-900)] hover:bg-[#F9FAFB]",
                      hasError
                        ? "border-r border-[#DB003A]/35"
                        : "border-r border-[#D0D5DD]"
                    )}
                  >
                    <span aria-hidden className="text-base leading-none">
                      {country.flag}
                    </span>
                    <span>{country.code}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-[color:var(--c-gray-500)]" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-[180px] rounded-lg border border-[#E8E8E9] bg-white p-1.5 text-zinc-900 shadow-[0_4px_6px_-2px_rgba(16,24,40,0.03),0_12px_16px_-4px_rgba(16,24,40,0.08)]"
                >
                  {PHONE_COUNTRIES.map((c) => {
                    const selected = c.code === country.code
                    return (
                      <DropdownMenuItem
                        key={c.code}
                        className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors outline-none focus:bg-zinc-50 focus:text-zinc-900"
                        onSelect={() => {
                          setCountry(c)
                          field.onChange("")
                        }}
                      >
                        <span aria-hidden className="text-base leading-none">
                          {c.flag}
                        </span>
                        <span
                          className={
                            selected
                              ? "flex-1 font-semibold text-zinc-900"
                              : "flex-1 font-normal text-zinc-500"
                          }
                        >
                          {c.code}
                        </span>
                        <span className="text-xs text-zinc-400">
                          {c.dialCode}
                        </span>
                        {selected ? (
                          <Check
                            className="text-primary h-4 w-4 shrink-0"
                            strokeWidth={2.5}
                          />
                        ) : null}
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex min-h-0 min-w-0 flex-1 items-center gap-2 px-3">
                <span className="shrink-0 text-sm font-medium text-[color:var(--c-gray-900)] select-none">
                  {country.dialCode}
                </span>
                <InputMask
                  id={inputId}
                  ref={field.ref}
                  mask={country.mask}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder={country.placeholder}
                  inputMode="numeric"
                  autoComplete="tel"
                  className={cn(
                    "h-10 min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none outline-none",
                    "font-[family-name:var(--font-inter-stack,Inter,ui-sans-serif,sans-serif)] text-base leading-6 font-normal tracking-normal",
                    "text-[color:var(--c-gray-900)] placeholder:text-[color:var(--c-gray-500)]"
                  )}
                />
              </div>
            </div>
            {fieldState.error?.message ? (
              <p className="text-destructive text-sm">
                {fieldState.error.message}
              </p>
            ) : null}
          </div>
        )
      }}
    />
  )
}
