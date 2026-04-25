"use client"

import { X } from "lucide-react"
import { useTranslations } from "next-intl"
import { GuestPickerStepper } from "@/shared/components/guest-picker-stepper"
import { ChevronDownIcon, cn } from "ui"

import {
  AGE_OPTIONS,
  type HotelRoomGuests,
  MAX_PER_ROOM,
  MAX_ROOMS,
} from "./hotel-room-guests"

type HotelsGuestPickerContentProps = {
  draftRooms: HotelRoomGuests[]
  setAdults: (index: number, delta: number) => void
  setChildren: (index: number, delta: number) => void
  setChildAge: (
    roomIndex: number,
    childIndex: number,
    age: number | undefined
  ) => void
  addRoom: () => void
  save: () => void
}

export function HotelsGuestPickerContent({
  draftRooms,
  setAdults,
  setChildren,
  setChildAge,
  addRoom,
  save,
}: HotelsGuestPickerContentProps) {
  const t = useTranslations("hotels")

  return (
    <>
      <div className="flex max-h-[min(70vh,640px)] flex-col overflow-y-auto p-4">
        {draftRooms.map((room, roomIndex) => (
          <div
            key={roomIndex}
            className={cn(
              "flex flex-col gap-4",
              roomIndex > 0 && "mt-4 border-t border-[#EAECF0] pt-4"
            )}
          >
            <h3 className="text-xl leading-6 font-bold text-[#0C111D]">
              {t("guestPickerRoomLabel", { n: roomIndex + 1 })}
            </h3>

            <div className="flex items-center justify-between gap-3">
              <span className="text-base leading-6 text-[#0C111D]">
                {t("guestPickerAdults")}
              </span>
              <GuestPickerStepper
                value={room.adults}
                onDecrement={() => setAdults(roomIndex, -1)}
                onIncrement={() => setAdults(roomIndex, 1)}
                canDecrement={room.adults > 0}
                canIncrement={room.adults < MAX_PER_ROOM}
                decrementLabel={t("guestPickerAdultsDecrease")}
                incrementLabel={t("guestPickerAdultsIncrease")}
              />
            </div>

            <div
              className={cn(
                "flex gap-3",
                room.children > 0
                  ? "items-start justify-between"
                  : "items-center justify-between"
              )}
            >
              <div className="flex w-[168px] flex-col gap-1.5 text-left">
                <span className="text-base leading-6 text-[#0C111D]">
                  {t("guestPickerChildren")}
                </span>
                <span className="text-xs leading-[18px] text-[#98A2B3]">
                  {t("guestPickerChildrenAgeHint")}
                </span>
              </div>
              <GuestPickerStepper
                value={room.children}
                onDecrement={() => setChildren(roomIndex, -1)}
                onIncrement={() => setChildren(roomIndex, 1)}
                canDecrement={room.children > 0}
                canIncrement={room.children < MAX_PER_ROOM}
                decrementLabel={t("guestPickerChildrenDecrease")}
                incrementLabel={t("guestPickerChildrenIncrease")}
              />
            </div>

            {room.children > 0 && (
              <div className="flex flex-col gap-1.5">
                {room.childAges.map((age, childIndex) => (
                  <div key={childIndex}>
                    {age === undefined ? (
                      <label className="block">
                        <span className="sr-only">
                          {t("guestPickerChildAgeLabel", {
                            n: childIndex + 1,
                          })}
                        </span>
                        <div className="relative">
                          <select
                            className="w-full cursor-pointer appearance-none rounded-lg border border-[#EAECF0] bg-white px-3 py-3 pr-10 text-base text-[#0C111D] focus:border-[#4765FF] focus:ring-1 focus:ring-[#4765FF] focus:outline-none"
                            value=""
                            onChange={(e) => {
                              const v = e.target.value
                              if (v === "") return
                              setChildAge(
                                roomIndex,
                                childIndex,
                                Number.parseInt(v, 10)
                              )
                            }}
                          >
                            <option value="" disabled>
                              {t("guestPickerAgePlaceholder")}
                            </option>
                            {AGE_OPTIONS.map((a) => (
                              <option key={a} value={a}>
                                {t("guestPickerAgeOption", { age: a })}
                              </option>
                            ))}
                          </select>
                          <ChevronDownIcon
                            width={20}
                            height={20}
                            aria-hidden
                            className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#98A2B3]"
                          />
                        </div>
                      </label>
                    ) : (
                      <div className="flex items-center justify-between gap-2 rounded-lg border border-[#EAECF0] bg-white px-3 py-3">
                        <span className="text-base text-[#0C111D]">
                          {t("guestPickerAgeOption", { age })}
                        </span>
                        <button
                          type="button"
                          className="text-[#98A2B3] transition-colors hover:text-[#0C111D]"
                          onClick={() =>
                            setChildAge(roomIndex, childIndex, undefined)
                          }
                          aria-label={t("guestPickerClearChildAge")}
                        >
                          <X className="size-5" strokeWidth={1.5} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-[#EAECF0] p-4">
        <div className="flex gap-[19px]">
          <button
            type="button"
            className={cn(
              "min-h-10 flex-1 rounded-xl border border-[#D0D5DD] bg-white px-3.5 py-2.5 text-base font-medium text-[#344054] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]",
              "hover:bg-gray-50 focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none",
              draftRooms.length >= MAX_ROOMS && "pointer-events-none opacity-40"
            )}
            onClick={addRoom}
            disabled={draftRooms.length >= MAX_ROOMS}
          >
            {t("guestPickerAddRoom")}
          </button>
          <button
            type="button"
            className="bg-primary min-h-10 min-w-0 flex-1 rounded-xl px-[18px] py-2.5 text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors hover:opacity-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            onClick={save}
          >
            {t("guestPickerSave")}
          </button>
        </div>
      </div>
    </>
  )
}
