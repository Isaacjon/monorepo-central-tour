"use client"

import type { AuthSocialCopy } from "@/modules/auth/types/auth-social-copy"
import { Button } from "ui"

import AppleIcon from "../assets/apple-icon.svg"
import GoogleIcon from "../assets/google-icon.svg"

type LoginSocialRowProps = {
  copy: AuthSocialCopy
}

export function LoginSocialRow({ copy }: LoginSocialRowProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="h-px flex-1 bg-[#d0d5dd]" />
        <span className="text-[14px] leading-[20px] text-[#d0d5dd]">
          {copy.orDivider}
        </span>
        <span className="h-px flex-1 bg-[#d0d5dd]" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          className="h-11 gap-2 rounded-xl border-[#f2f4f7] bg-white font-semibold text-[#101828] shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
        >
          <GoogleIcon width={20} height={20} aria-hidden className="shrink-0" />
          {copy.google}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 gap-2 rounded-xl border-[#f2f4f7] bg-white font-semibold text-[#101828] shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
        >
          <AppleIcon width={20} height={20} aria-hidden className="shrink-0" />
          {copy.apple}
        </Button>
      </div>
    </div>
  )
}
