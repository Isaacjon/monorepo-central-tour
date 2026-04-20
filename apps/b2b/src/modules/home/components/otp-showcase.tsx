"use client"

import { OtpInput } from "ui"

export function OtpShowcase() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-5">
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-medium">
          Not filled
        </p>
        <OtpInput readOnly value="" aria-label="OTP empty" />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-medium">
          Partially filled (default)
        </p>
        <OtpInput readOnly value="12" aria-label="OTP partial default" />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-medium">
          Filled (default)
        </p>
        <OtpInput readOnly value="12345" aria-label="OTP filled default" />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-medium">Error</p>
        <OtpInput
          readOnly
          value="12345"
          status="error"
          aria-label="OTP error"
        />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-medium">
          Success
        </p>
        <OtpInput
          readOnly
          value="12345"
          status="success"
          aria-label="OTP success"
        />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm font-medium">
          Interactive
        </p>
        <OtpInput aria-label="OTP interactive" />
      </div>
    </div>
  )
}
