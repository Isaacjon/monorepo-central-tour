"use client"

import { Tabs, TabsList, TabsTrigger } from "./login-method-tabs"

type AuthPhoneEmailTabsProps = {
  value: string
  onValueChange: (value: string) => void
  tabPhone: string
  tabEmail: string
}

export function AuthPhoneEmailTabs({
  value,
  onValueChange,
  tabPhone,
  tabEmail,
}: AuthPhoneEmailTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList className="justify-center gap-4 border-[#eaecf0]">
        <TabsTrigger
          value="phone"
          className="text-[14px] font-semibold text-[#667085] data-[state=active]:border-[#1d2939] data-[state=active]:text-[#1d2939]"
        >
          {tabPhone}
        </TabsTrigger>
        <TabsTrigger
          value="email"
          className="text-[14px] font-semibold text-[#667085] data-[state=active]:border-[#1d2939] data-[state=active]:text-[#1d2939]"
        >
          {tabEmail}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
