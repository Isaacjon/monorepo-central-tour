"use client"

import { Check } from "lucide-react"
import * as React from "react"

import ChevronDownIcon from "../assets/icons/chevron-down.svg"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import { cn } from "../lib/utils"

export type SearchableCommandOption = {
  value: string
  label: string
  icon: React.ReactNode
}

export type SearchableCommandGroup = {
  heading?: string
  options: SearchableCommandOption[]
}

export type SearchableCommandPopoverProps = {
  label: string
  emptyLabel: string
  searchPlaceholder: string
  emptySearchLabel: string
  groups: SearchableCommandGroup[]
  value: string | null
  onValueChange: (value: string) => void
  searchValue?: string
  onSearchValueChange?: (value: string) => void
  /** Tailwind width class for panel (trigger still flex-1). */
  contentClassName?: string
  align?: "start" | "center" | "end"
}

function findLabel(
  groups: SearchableCommandGroup[],
  selected: string | null
): string | null {
  if (!selected) return null
  for (const g of groups) {
    const hit = g.options.find((o) => o.value === selected)
    if (hit) return hit.label
  }
  return null
}

export function SearchableCommandPopover({
  label,
  emptyLabel,
  searchPlaceholder,
  emptySearchLabel,
  groups,
  value,
  onValueChange,
  searchValue,
  onSearchValueChange,
  contentClassName,
  align = "start",
}: SearchableCommandPopoverProps) {
  const [open, setOpen] = React.useState(false)
  const [cmdKey, setCmdKey] = React.useState(0)
  const [internalSearchValue, setInternalSearchValue] = React.useState("")

  const selectedLabel = findLabel(groups, value)
  const displayLabel = selectedLabel ?? emptyLabel
  const displayMuted = !selectedLabel
  const effectiveSearchValue = searchValue ?? internalSearchValue

  const handleSearchValueChange = (next: string) => {
    if (searchValue === undefined) {
      setInternalSearchValue(next)
    }
    onSearchValueChange?.(next)
  }

  const onOpenChange = (next: boolean) => {
    if (next) setCmdKey((k) => k + 1)
    setOpen(next)
  }

  const nonEmptyGroups = groups.filter((g) => g.options.length > 0)

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex min-h-[54px] w-full flex-col justify-center rounded-xl border border-[#D0D5DD] bg-white px-3 py-2 text-left transition-colors outline-none hover:border-[#98A2B3] focus-visible:ring-2 focus-visible:ring-[#4765FF] focus-visible:ring-offset-2"
        >
          <span className="text-xs leading-none text-[#667085]">{label}</span>
          <div className="mt-1 flex items-center justify-between gap-2">
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-sm leading-tight font-medium",
                displayMuted ? "text-[#98A2B3]" : "text-[#101828]"
              )}
            >
              {displayLabel}
            </span>
            <ChevronDownIcon
              width={20}
              height={20}
              aria-hidden
              className={cn(
                "text-c-gray-950 shrink-0 transition-transform",
                open && "rotate-180"
              )}
            />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className={cn(
          "w-(--radix-popover-trigger-width) min-w-[277px] rounded-lg border border-[#D0D5DD] p-0 shadow-lg",
          contentClassName
        )}
      >
        <Command key={cmdKey} className="rounded-lg border-none shadow-none">
          <CommandInput
            placeholder={searchPlaceholder}
            value={effectiveSearchValue}
            onValueChange={handleSearchValueChange}
            className="h-12 text-base leading-6 text-[#101828] placeholder:text-[#98A2B3]"
          />
          <CommandList className="max-h-[min(320px,50vh)]">
            <CommandEmpty className="ml-3 py-4 text-base leading-6 text-[#667085]">
              {emptySearchLabel}
            </CommandEmpty>
            {nonEmptyGroups.map((group, gi) => (
              <React.Fragment key={`search-cmd-group-${gi}`}>
                {gi > 0 ? <CommandSeparator className="bg-[#EAECF0]" /> : null}
                <CommandGroup
                  heading={group.heading}
                  className="p-0 **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-[#667085]"
                >
                  {group.options.map((opt) => {
                    const isPicked = value === opt.value
                    return (
                      <CommandItem
                        key={opt.value}
                        value={opt.value}
                        keywords={[opt.label, opt.value]}
                        onSelect={() => {
                          onValueChange(opt.value)
                          setOpen(false)
                        }}
                        className={cn(
                          "mx-2 my-1 box-border flex h-12 cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-base leading-6 font-normal text-[#101828]",
                          "aria-selected:bg-[#F9FAFB] data-[selected=true]:bg-[#F9FAFB]",
                          !isPicked && "hover:bg-[#F9FAFB]",
                          isPicked && "bg-[#F9FAFB]"
                        )}
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center [&_svg]:size-6">
                          {opt.icon}
                        </span>
                        <span className="min-w-0 flex-1 truncate">
                          {opt.label}
                        </span>
                        {isPicked ? (
                          <Check
                            className="size-5 shrink-0 text-(--color-control-accent)"
                            strokeWidth={2}
                            aria-hidden
                          />
                        ) : null}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
