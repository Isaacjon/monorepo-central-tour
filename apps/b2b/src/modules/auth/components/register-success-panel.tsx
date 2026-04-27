"use client"

import Image from "next/image"

import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"
import { requestSentImage } from "ui"

import { AuthFormLayout } from "./auth-form-layout"

const SUPPORT_EMAIL = "support@centbed.com"

type RegisterSuccessPanelProps = {
  copy: RegisterFormCopy
}

export function RegisterSuccessPanel({ copy }: RegisterSuccessPanelProps) {
  return (
    <div className="flex min-h-svh w-full flex-1 flex-col justify-between">
      <AuthFormLayout
        contentMaxWidth={532}
        upper={
          <div className="flex min-h-[min(50vh,420px)] w-full flex-col justify-center">
            <div className="flex w-full flex-col items-center gap-8 text-center">
              <Image
                src={requestSentImage}
                alt={copy.requestSentTitle}
                width={196}
                height={196}
                className="size-[196px] shrink-0 object-contain"
                priority
              />
              <h1 className="text-c-gray-900 text-[30px] leading-[38px] font-semibold">
                {copy.requestSentTitle}
              </h1>
              <p className="text-c-gray-500 max-w-[532px] text-base leading-6 font-normal">
                {copy.requestSentBody}
              </p>
            </div>
          </div>
        }
      />

      <div className="p-4">
        <p className="text-c-gray-700 text-left text-base leading-6 font-normal">
          {copy.requestSentSupportPrefix}
          <br />
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-medium text-(--color-control-accent) hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </div>
  )
}
