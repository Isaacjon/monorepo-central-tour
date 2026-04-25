"use client"

import { HeartIcon, Switch } from "ui"

type FlightsSearchSidebarFavoritesBarProps = {
  label: string
  favorites: boolean
  onFavoritesChange: (value: boolean) => void
}

export function FlightsSearchSidebarFavoritesBar({
  label,
  favorites,
  onFavoritesChange,
}: FlightsSearchSidebarFavoritesBarProps) {
  return (
    <div className="flex h-14 w-64 items-center justify-between gap-6 rounded-[20px] bg-white px-4">
      <span className="flex items-center gap-2">
        <HeartIcon
          className="text-primary size-6"
          width={24}
          height={24}
          aria-hidden
        />
        <span className="text-base leading-6 font-medium text-[#0C111D]">
          {label}
        </span>
      </span>
      <Switch
        checked={favorites}
        onCheckedChange={onFavoritesChange}
        aria-label={label}
      />
    </div>
  )
}
