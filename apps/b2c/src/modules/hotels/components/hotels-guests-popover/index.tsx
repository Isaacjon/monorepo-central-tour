"use client"

import { useTranslations } from "next-intl"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  ChevronDownIcon,
  cn,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "ui"

import {
  cloneRooms,
  defaultAdditionalRoom,
  defaultFirstRoom,
  type HotelRoomGuests,
  MAX_PER_ROOM,
  MAX_ROOMS,
  totalGuests,
} from "./hotel-room-guests"
import { HotelsGuestPickerContent } from "./hotels-guest-picker-content"

export type { HotelRoomGuests }

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

type HotelsGuestsPopoverProps = {
  guestsLabel: string
  className?: string
  triggerClassName?: string
  minWidth?: number
  onChange?: (value: { rooms: HotelRoomGuests[]; totalGuests: number }) => void
}

export function HotelsGuestsPopover({
  guestsLabel,
  className,
  triggerClassName,
  minWidth = 160,
  onChange,
}: HotelsGuestsPopoverProps) {
  const t = useTranslations("hotels")
  const [open, setOpen] = useState(false)
  const [savedRooms, setSavedRooms] = useState<HotelRoomGuests[]>([
    defaultFirstRoom(),
  ])
  const [draftRooms, setDraftRooms] = useState<HotelRoomGuests[]>(() =>
    cloneRooms([defaultFirstRoom()])
  )

  const openPopover = useCallback(
    (next: boolean) => {
      setOpen(next)
      if (next) {
        setDraftRooms(cloneRooms(savedRooms))
      }
    },
    [savedRooms]
  )

  const summaryTotal = useMemo(() => totalGuests(savedRooms), [savedRooms])

  useEffect(() => {
    onChange?.({
      rooms: cloneRooms(savedRooms),
      totalGuests: summaryTotal,
    })
  }, [onChange, savedRooms, summaryTotal])

  const updateDraftRoom = (
    index: number,
    updater: (r: HotelRoomGuests) => HotelRoomGuests
  ) => {
    setDraftRooms((prev) => prev.map((r, i) => (i === index ? updater(r) : r)))
  }

  const setAdults = (index: number, delta: number) => {
    updateDraftRoom(index, (r) => {
      const adults = clamp(r.adults + delta, 0, MAX_PER_ROOM)
      return { ...r, adults }
    })
  }

  const setChildren = (index: number, delta: number) => {
    updateDraftRoom(index, (r) => {
      const children = clamp(r.children + delta, 0, MAX_PER_ROOM)
      let childAges = [...r.childAges]
      if (children < childAges.length) {
        childAges = childAges.slice(0, children)
      } else {
        while (childAges.length < children) {
          childAges.push(undefined)
        }
      }
      return { ...r, children, childAges }
    })
  }

  const setChildAge = (
    roomIndex: number,
    childIndex: number,
    age: number | undefined
  ) => {
    updateDraftRoom(roomIndex, (r) => {
      const childAges = [...r.childAges]
      childAges[childIndex] = age
      return { ...r, childAges }
    })
  }

  const addRoom = () => {
    setDraftRooms((prev) => {
      if (prev.length >= MAX_ROOMS) return prev
      return [...prev, defaultAdditionalRoom()]
    })
  }

  const save = () => {
    setSavedRooms(cloneRooms(draftRooms))
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={openPopover}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex min-h-[54px] max-w-[220px] min-w-0 shrink-0 flex-col justify-center rounded-xl border border-[#D0D5DD] bg-white px-3 py-2 text-left transition-colors",
            "focus-visible:ring-primary hover:border-[#98A2B3] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            triggerClassName,
            className
          )}
          style={{ minWidth }}
        >
          <span className="text-xs leading-none text-[#667085]">
            {guestsLabel}
          </span>
          <div className="mt-1 flex min-w-0 items-center justify-between gap-2">
            <span className="min-w-0 flex-1 truncate text-sm leading-none font-medium text-[#101828]">
              {t("guestPickerSummary", { count: summaryTotal })}
            </span>
            <ChevronDownIcon
              width={20}
              height={20}
              aria-hidden
              className="text-c-gray-950 shrink-0"
            />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        className="w-[min(100vw-24px,336px)] border-[#EAECF0] p-0 shadow-[0px_12px_16px_0px_rgba(16,24,40,0.08),0px_4px_6px_0px_rgba(16,24,40,0.03)]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <HotelsGuestPickerContent
          draftRooms={draftRooms}
          setAdults={setAdults}
          setChildren={setChildren}
          setChildAge={setChildAge}
          addRoom={addRoom}
          save={save}
        />
      </PopoverContent>
    </Popover>
  )
}
