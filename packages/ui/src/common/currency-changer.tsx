"use client"

import * as React from "react"

import { CurrencyItem } from "./currency-changer-item"
import type { CurrencyOption } from "./currency-types"
import ChevronDownIcon from "../assets/icons/chevron-down.svg"
import CurrencyIcon from "../assets/icons/currency-icon.svg"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { cn } from "../lib/utils"

export type { CurrencyOption }

const inter =
  "font-[family-name:var(--font-inter-stack,Inter,ui-sans-serif,sans-serif)]"

/** Overrides for shadcn `DialogContent` built-in close (matches 20px padding, 24px icon). */
const currencyDialogCloseCn =
  "*:data-[slot=dialog-close]:top-5 *:data-[slot=dialog-close]:right-5 " +
  "*:data-[slot=dialog-close]:size-6 *:data-[slot=dialog-close]:rounded-md " +
  "*:data-[slot=dialog-close]:p-0 *:data-[slot=dialog-close]:opacity-100 " +
  "*:data-[slot=dialog-close]:text-[#667085] " +
  "*:data-[slot=dialog-close]:hover:bg-[#F9FAFB] " +
  "*:data-[slot=dialog-close]:hover:text-c-gray-950 " +
  "[&>[data-slot=dialog-close]>svg]:size-6!"

type CurrencyChangerProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (code: string) => void
  options: CurrencyOption[]
  featuredOptions?: CurrencyOption[]
  modalTitle: string
  featuredSectionTitle?: string
  allSectionTitle?: string
  className?: string
}

export function CurrencyChanger({
  value,
  defaultValue,
  onValueChange,
  options,
  featuredOptions,
  modalTitle,
  featuredSectionTitle,
  allSectionTitle,
  className,
}: CurrencyChangerProps) {
  const fallback = defaultValue ?? options[0]?.code ?? ""
  const [internal, setInternal] = React.useState(fallback)
  const [open, setOpen] = React.useState(false)
  const selected = value ?? internal

  const handleSelect = React.useCallback(
    (code: string) => {
      if (value === undefined) setInternal(code)
      onValueChange?.(code)
      setOpen(false)
    },
    [value, onValueChange]
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "text-c-gray-950 inline-flex h-10 shrink-0 items-center justify-between gap-2 rounded-lg px-2 py-2 text-left focus-visible:ring-2 focus-visible:outline-none",
            className
          )}
        >
          <span className="flex min-w-0 flex-1 items-center gap-1.5">
            <CurrencyIcon
              width={24}
              height={24}
              aria-hidden
              className="shrink-0"
            />
            <span className="text-c-gray-950 text-[16px] leading-6 font-medium">
              {selected}
            </span>
          </span>
          <ChevronDownIcon
            aria-hidden
            className={cn(
              "text-c-gray-500 size-6 shrink-0 origin-center transition-transform duration-200 ease-out",
              open && "rotate-180"
            )}
          />
        </button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          inter,
          "flex h-[min(669px,calc(100vh-3rem))] w-[min(856px,calc(100%-2rem))] max-w-none flex-col gap-6 rounded-[24px] border-0 bg-white p-5 shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04)] outline-none sm:max-w-[min(856px,calc(100%-2rem))]",
          currencyDialogCloseCn
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-[24px]">
          <DialogTitle
            className={cn(
              inter,
              "text-c-gray-950 m-0 pr-12 text-[24px] leading-none font-bold tracking-normal"
            )}
          >
            {modalTitle}
          </DialogTitle>

          <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto">
            {featuredOptions && featuredOptions.length > 0 ? (
              <section className="flex flex-col gap-4">
                {featuredSectionTitle ? (
                  <p
                    className={cn(
                      inter,
                      "text-c-gray-950 text-[20px] leading-none font-medium"
                    )}
                  >
                    {featuredSectionTitle}
                  </p>
                ) : null}
                <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                  {featuredOptions.map((opt) => (
                    <CurrencyItem
                      key={opt.code}
                      option={opt}
                      isSelected={opt.code === selected}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            <section className="flex flex-col gap-4">
              {allSectionTitle ? (
                <p
                  className={cn(
                    inter,
                    "text-c-gray-950 text-[20px] leading-none font-medium"
                  )}
                >
                  {allSectionTitle}
                </p>
              ) : null}
              <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                {options.map((opt) => (
                  <CurrencyItem
                    key={opt.code}
                    option={opt}
                    isSelected={opt.code === selected}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
