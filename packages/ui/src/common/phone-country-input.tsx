"use client"

import InputMask from "@mona-health/react-input-mask"
import { Check, ChevronDown } from "lucide-react"
import * as React from "react"

import { inputWrapperVariants } from "./input-field"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { cn } from "../lib/utils"

export type PhoneCountryOption = {
  code: string
  flag: string
  dialCode: string
  mask: string
  placeholder: string
}

const DEFAULT_PHONE_COUNTRIES: PhoneCountryOption[] = [
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

export type PhoneCountryInputProps = {
  id?: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  error?: string
  /**
   * Called with the current dial code (+998, +7, +1) on mount and whenever the
   * user switches country. Lets parents build a full E.164-style number for copy.
   */
  onDialCodeChange?: (dialCode: string) => void
  countries?: PhoneCountryOption[]
  /**
   * HTML autocomplete on the number input. Use `"off"` (default) to limit browser
   * autofill on auth-style flows; use `"tel"` if you want normal telephone heuristics.
   */
  autoComplete?: string
}

const PhoneCountryInput = React.forwardRef<
  HTMLInputElement,
  PhoneCountryInputProps
>(function PhoneCountryInput(
  {
    id: idProp,
    label,
    value,
    onChange,
    onBlur,
    error,
    onDialCodeChange,
    countries = DEFAULT_PHONE_COUNTRIES,
    autoComplete = "off",
  },
  ref
) {
  const [country, setCountry] = React.useState<PhoneCountryOption>(
    countries[0]!
  )
  const generatedId = React.useId()
  const inputId = idProp ?? generatedId

  React.useEffect(() => {
    onDialCodeChange?.(country.dialCode)
  }, [country, onDialCodeChange])

  const hasError = Boolean(error)

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="font-[family-name:var(--font-inter-stack,Inter,ui-sans-serif,sans-serif)] text-sm leading-5 font-medium tracking-normal text-[color:var(--c-gray-700)]"
      >
        {label}
      </label>
      <div
        className={cn(
          inputWrapperVariants({ variant: hasError ? "error" : "default" }),
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
            {countries.map((c) => {
              const selected = c.code === country.code
              return (
                <DropdownMenuItem
                  key={c.code}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors outline-none focus:bg-zinc-50 focus:text-zinc-900"
                  onSelect={() => {
                    setCountry(c)
                    onChange({
                      target: { value: "" },
                      currentTarget: { value: "" },
                    } as React.ChangeEvent<HTMLInputElement>)
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
                  <span className="text-xs text-zinc-400">{c.dialCode}</span>
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
            inputRef={ref as React.Ref<HTMLInputElement> | undefined}
            mask={country.mask}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={country.placeholder}
            inputMode="numeric"
            autoComplete={autoComplete}
            className={cn(
              "h-10 min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none outline-none",
              "font-[family-name:var(--font-inter-stack,Inter,ui-sans-serif,sans-serif)] text-base leading-6 font-normal tracking-normal",
              "text-[color:var(--c-gray-900)] placeholder:text-[color:var(--c-gray-500)]"
            )}
          />
        </div>
      </div>
      {error ? <p className="text-destructive text-sm">{error}</p> : null}
    </div>
  )
})
PhoneCountryInput.displayName = "PhoneCountryInput"

export { DEFAULT_PHONE_COUNTRIES, PhoneCountryInput }
