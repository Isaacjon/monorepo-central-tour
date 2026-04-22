"use client"

import * as React from "react"

import { LanguageFlagSlot } from "./language-flag-slot"
import CheckedIcon from "../assets/icons/checked.svg"
import ChevronDownIcon from "../assets/icons/chevron-down.svg"
import EnFlagIcon from "../assets/icons/en-flag.svg"
import RuFlagIcon from "../assets/icons/ru-flag.svg"
import UzFlagIcon from "../assets/icons/uz-flag.svg"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { cn } from "../lib/utils"

export type LanguageOption = {
  value: string
  label: string
  flag?: string
  FlagIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

/** Shared locale rows for `LanguageChanger` (b2c + b2b). Values must match app routing locales. */
export const languageChangerOptions: LanguageOption[] = [
  { value: "uz", label: "O'zbek", flag: "🇺🇿" },
  { value: "ru", label: "Русский", flag: "🇷🇺" },
  { value: "en", label: "English", flag: "🇺🇸" },
]

/** Profile header locale rows with SVG flags from UI assets. */
export const languageChangerProfileOptions: LanguageOption[] = [
  { value: "ru", label: "Русский язык", FlagIcon: RuFlagIcon },
  { value: "uz", label: "O'zbek tili", FlagIcon: UzFlagIcon },
  { value: "en", label: "English", FlagIcon: EnFlagIcon },
]

type LanguageChangerProps = {
  options: LanguageOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  variant?: "default" | "profile"
  dropdownTitle?: string
  className?: string
  contentClassName?: string
}

export function LanguageChanger({
  options = languageChangerOptions,
  value,
  defaultValue,
  onValueChange,
  variant = "default",
  dropdownTitle,
  className,
  contentClassName,
}: LanguageChangerProps) {
  const fallbackValue = defaultValue ?? options[0]?.value ?? ""
  const [internalValue, setInternalValue] = React.useState(fallbackValue)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const selectedValue = value ?? internalValue

  const selectedOption: LanguageOption | undefined =
    options.find((option) => option.value === selectedValue) ?? options[0]

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue)
      }
      onValueChange?.(nextValue)
    },
    [onValueChange, value]
  )

  if (!selectedOption) {
    return null
  }

  const isProfile = variant === "profile"

  return (
    <DropdownMenu onOpenChange={setDropdownOpen} open={dropdownOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            isProfile
              ? "inline-flex h-10 shrink-0 items-center justify-between gap-2 rounded-lg px-2 py-2 text-left text-[#0C111D] focus-visible:ring-2 focus-visible:outline-none"
              : "border-c-greyscale-200 bg-c-surface focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-10 w-[135px] shrink-0 items-center justify-between gap-2 rounded-lg border py-2 pr-2 pl-3 text-left focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            className
          )}
          type="button"
        >
          <span className="flex min-w-0 flex-1 items-center gap-1.5">
            <LanguageFlagSlot
              flag={selectedOption.flag}
              FlagIcon={selectedOption.FlagIcon}
              className={isProfile ? undefined : "h-8 w-6"}
            />
            <span
              className={cn(
                "min-w-13",
                isProfile
                  ? "text-[16px] leading-6 font-medium text-[#0C111D]"
                  : "text-c-greyscale-800 text-sm leading-none font-normal"
              )}
            >
              {selectedOption.label}
            </span>
          </span>
          <ChevronDownIcon
            aria-hidden
            className={cn(
              "text-c-gray-500 size-6 shrink-0 origin-center transition-transform duration-200 ease-out",
              dropdownOpen && "rotate-180"
            )}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={cn(
          isProfile
            ? "bg-c-surface h-auto w-[224px] min-w-0 rounded-lg border border-[#D0D5DD] p-0 shadow-none"
            : "border-c-greyscale-200 bg-c-surface h-auto w-[172px] min-w-0 rounded-lg border p-1 shadow-none",
          contentClassName
        )}
      >
        {isProfile && dropdownTitle ? (
          <div className="border-b border-[#EAECF0] px-3 py-2.5">
            <p className="text-c-gray-700 leading-5 font-medium">
              {dropdownTitle}
            </p>
          </div>
        ) : null}

        <div className={cn(isProfile ? "space-y-1 p-1" : "")}>
          {options.map((option) => {
            const isSelected = option.value === selectedOption.value

            return (
              <DropdownMenuItem
                className={cn(
                  isProfile
                    ? "flex w-[216px] items-center rounded-md px-2 py-3 transition-colors outline-none"
                    : "flex h-11 items-center rounded-md px-2 text-sm leading-none font-normal transition-colors outline-none",
                  isProfile
                    ? isSelected
                      ? "bg-primary/10 focus:bg-primary/10 data-highlighted:bg-primary/10 text-[#0C111D] focus:text-[#0C111D] data-highlighted:text-[#0C111D]"
                      : "focus:bg-muted data-highlighted:bg-muted text-[#0C111D] focus:text-[#0C111D] data-highlighted:text-[#0C111D]"
                    : isSelected
                      ? "bg-c-selected text-c-greyscale-800 focus:bg-c-selected focus:text-c-greyscale-800 data-highlighted:bg-c-selected data-highlighted:text-c-greyscale-800"
                      : "text-c-greyscale-500 focus:bg-muted focus:text-c-greyscale-500 data-highlighted:bg-muted data-highlighted:text-c-greyscale-500"
                )}
                key={option.value}
                onSelect={() => handleValueChange(option.value)}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="flex min-w-0 flex-1 items-center gap-2">
                    <LanguageFlagSlot
                      flag={option.flag}
                      FlagIcon={option.FlagIcon}
                      className={isProfile ? undefined : "h-8 w-6"}
                    />
                    <span
                      className={cn(
                        "truncate",
                        isProfile
                          ? "text-[16px] leading-6 font-medium text-[#0C111D]"
                          : "text-sm leading-none font-normal"
                      )}
                    >
                      {option.label}
                    </span>
                  </span>
                  {isSelected ? (
                    <CheckedIcon
                      aria-hidden
                      className={cn(
                        "size-4 shrink-0",
                        isProfile ? "text-primary" : "text-c-highlight"
                      )}
                    />
                  ) : null}
                </div>
              </DropdownMenuItem>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
