"use client"

import { X } from "lucide-react"
import * as React from "react"
import { Toaster as Sonner, toast } from "sonner"

import { ErrorIcon, SuccessIcon } from "./toast-icons"
import { cn } from "../../lib/utils"

export type CustomToastProps = {
  title: string
  description?: string
  duration?: number
  type?: "success" | "error"
}

type SonnerToasterProps = React.ComponentProps<typeof Sonner>

const toastVariant = {
  success: {
    container:
      "border-[#75E0A7] bg-[#ECFDF3] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]",
    title: "text-[#027A48]",
    description: "text-[#027A48]/80",
    close: "text-[#027A48] hover:opacity-80",
  },
  error: {
    container:
      "border-[#FDA29B] bg-[#FEF3F2] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]",
    title: "text-[#B42318]",
    description: "text-[#B42318]/80",
    close: "text-[#B42318] hover:opacity-80",
  },
  neutral: {
    container:
      "border-[#EAECF0] bg-background shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03),0px_12px_16px_-4px_rgba(16,24,40,0.08)]",
    title: "text-c-gray-900",
    description: "text-c-gray-500",
    close: "text-c-gray-500 hover:text-c-gray-700",
  },
} as const

function ToastGraphic({
  type,
  toastId,
}: {
  type?: "success" | "error"
  toastId: string | number
}) {
  const safeId = String(toastId).replace(/[^a-zA-Z0-9_-]/g, "-")
  if (type === "success") {
    return <SuccessIcon clipId={`sonner-s-${safeId}`} />
  }
  if (type === "error") {
    return <ErrorIcon clipId={`sonner-e-${safeId}`} />
  }
  return null
}

export function showToast({
  title,
  description,
  duration = 5000,
  type,
}: CustomToastProps) {
  const variant =
    type === "success"
      ? toastVariant.success
      : type === "error"
        ? toastVariant.error
        : toastVariant.neutral

  return toast.custom(
    (id) => (
      <div
        className={cn(
          "relative box-border flex w-[min(396px,calc(100vw-32px))] items-center gap-4 rounded-[12px] border border-solid p-4 font-[family-name:var(--font-inter-stack),ui-sans-serif,system-ui,sans-serif]",
          description ? "min-h-[56px]" : "h-[56px]",
          variant.container
        )}
      >
        <ToastGraphic type={type} toastId={id} />
        <div className="min-h-0 min-w-0 flex-1">
          <div className="flex min-h-0 flex-col gap-1">
            <h4
              className={cn(
                "line-clamp-2 text-base leading-[150%] font-semibold tracking-normal",
                description ? "" : "line-clamp-1",
                variant.title
              )}
            >
              {title}
            </h4>
            {description ? (
              <p
                className={cn(
                  "line-clamp-2 text-sm leading-5 font-medium",
                  variant.description
                )}
              >
                {description}
              </p>
            ) : null}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            toast.dismiss(id)
          }}
          className={cn(
            "size-5 shrink-0 cursor-pointer transition-colors",
            variant.close
          )}
          aria-label="Dismiss notification"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>
    ),
    { duration }
  )
}

export function Toaster({ ...props }: SonnerToasterProps) {
  return (
    <Sonner
      theme="light"
      position="top-right"
      mobileOffset={{ top: "10px", right: "10px", left: "10px" }}
      {...props}
    />
  )
}
