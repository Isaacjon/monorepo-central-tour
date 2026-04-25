"use client"

import { useRouter } from "@central-tour/config/i18n/navigation"

import type { ProfileSidebarCopy } from "@/modules/profile/types/profile-data-copy"
import { clearAuthSession } from "@/shared/stores/auth-store"
import {
  HeartIcon,
  LogoutIcon,
  ProfileSidebar,
  ReceiptIcon,
  UserIcon,
} from "ui"

type ActiveSection = "customerData" | "myBookings" | "favorites"

type ProfileNavSidebarProps = {
  copy: ProfileSidebarCopy
  activeSection?: ActiveSection
}

export function ProfileNavSidebar({
  copy,
  activeSection = "customerData",
}: ProfileNavSidebarProps) {
  const router = useRouter()

  function handleLogout() {
    clearAuthSession()
    router.push("/login")
  }

  const items = [
    {
      id: "customerData",
      label: copy.customerData,
      icon: <UserIcon className="size-5 text-inherit" />,
      active: activeSection === "customerData",
    },
    {
      id: "myBookings",
      label: copy.myBookings,
      icon: <ReceiptIcon className="size-5 text-inherit" />,
      active: activeSection === "myBookings",
    },
    {
      id: "favorites",
      label: copy.favorites,
      icon: <HeartIcon className="size-5 text-inherit" />,
      active: activeSection === "favorites",
    },
  ]

  return (
    <ProfileSidebar
      items={items}
      logoutLabel={copy.logout}
      logoutIcon={<LogoutIcon className="size-5" />}
      onLogout={handleLogout}
    />
  )
}
