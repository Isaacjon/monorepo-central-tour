"use client"

import * as React from "react"

import { HeaderMiniBlock } from "./header-mini-block"
import BellIcon from "../assets/icons/bell.svg"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { cn } from "../lib/utils"

type SvgIllustration = React.FunctionComponent<React.SVGProps<SVGSVGElement>>

const NotificationBellIllustration = React.lazy(
  () => import("../assets/icons/empty-notifications.svg")
) as React.LazyExoticComponent<SvgIllustration>

type NotificationChangerProps = {
  title: string
  emptyLabel: string
  className?: string
  contentClassName?: string
}

export function NotificationsDropdown({
  title,
  emptyLabel,
  className,
  contentClassName,
}: NotificationChangerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <HeaderMiniBlock aria-label={title} className={className}>
          <BellIcon width={24} height={24} aria-hidden />
        </HeaderMiniBlock>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={cn(
          "bg-c-surface h-auto w-[272px] min-w-0 rounded-xl border border-[#D0D5DD] p-0 shadow-none",
          contentClassName
        )}
      >
        <div className="border-b border-[#EAECF0] px-4 py-3">
          <p className="text-c-gray-700 leading-5 font-medium">{title}</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 px-4 py-8">
          <React.Suspense
            fallback={
              <div className="border-t-c-gray-400 size-20 animate-spin rounded-full border-4 border-[#D0D5DD]" />
            }
          >
            <NotificationBellIllustration
              width={80}
              height={80}
              aria-hidden
              className="size-20"
            />
          </React.Suspense>
          <p className="text-c-gray-400 leading-5 font-medium">{emptyLabel}</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
