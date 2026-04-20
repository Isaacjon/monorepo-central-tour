"use client"

import { SecondaryGrayButton, showToast } from "ui"

export type ToastShowcaseCopy = {
  sectionLabel: string
  showSuccessLabel: string
  showErrorLabel: string
  successTitle: string
  successDescription: string
  errorTitle: string
  errorDescription: string
}

export function ToastShowcase({
  sectionLabel,
  showSuccessLabel,
  showErrorLabel,
  successTitle,
  successDescription,
  errorTitle,
  errorDescription,
}: ToastShowcaseCopy) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted-foreground text-sm font-medium">
        {sectionLabel}
      </p>
      <div className="flex flex-wrap gap-3">
        <SecondaryGrayButton
          type="button"
          onClick={() => {
            showToast({
              title: successTitle,
              description: successDescription,
              type: "success",
            })
          }}
        >
          {showSuccessLabel}
        </SecondaryGrayButton>
        <SecondaryGrayButton
          type="button"
          onClick={() => {
            showToast({
              title: errorTitle,
              description: errorDescription,
              type: "error",
            })
          }}
        >
          {showErrorLabel}
        </SecondaryGrayButton>
      </div>
    </div>
  )
}
