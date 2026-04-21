import * as React from "react"

import { cn } from "../lib/utils"

export type ProfileSidebarItem = {
  id: string
  label: string
  icon: React.ReactNode
  active?: boolean
  onClick?: () => void
}

export type ProfileSidebarProps = {
  items: ProfileSidebarItem[]
  logoutLabel: string
  logoutIcon?: React.ReactNode
  onLogout?: () => void
  className?: string
}

export function ProfileSidebar({
  items,
  logoutLabel,
  logoutIcon,
  onLogout,
  className,
}: ProfileSidebarProps) {
  return (
    <aside className={cn("flex w-[256px] shrink-0 flex-col gap-3", className)}>
      <nav className="flex flex-col gap-2 rounded-2xl border border-[#EAECF0] bg-white p-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={item.onClick}
            className={cn(
              "flex h-10 w-full items-center gap-2 rounded-lg py-2 text-left text-sm leading-5 font-medium tracking-[0] transition-colors",
              item.active ? "text-primary" : "text-c-gray-400"
            )}
          >
            <span
              className={cn(
                "shrink-0 [&_svg]:size-6",
                item.active ? "text-primary" : "text-c-gray-400"
              )}
              data-active={item.active}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="rounded-2xl border border-[#EAECF0] bg-white p-4">
        <button
          type="button"
          onClick={onLogout}
          className="flex h-10 w-full items-center gap-2 py-2 text-left text-sm leading-5 font-medium text-[#D92D20] transition-colors"
        >
          {logoutIcon && (
            <span className="shrink-0 text-[#D92D20] [&_svg]:size-6">
              {logoutIcon}
            </span>
          )}
          {logoutLabel}
        </button>
      </div>
    </aside>
  )
}
