import type { InputFieldProps } from "../input-field"

export type TimeInputFieldBase = Omit<
  InputFieldProps,
  | "type"
  | "value"
  | "defaultValue"
  | "onChange"
  | "min"
  | "max"
  | "step"
  | "inputMode"
> & { className?: string }

export type HourTimeProps = TimeInputFieldBase & {
  timeMode?: "hour"
  valueMinutes: number
  onValueMinutesChange: (minutes: number) => void
  minMinutes?: number
  maxMinutes?: number
  stepMinutes?: number
}

export type MinutesTimeProps = TimeInputFieldBase & {
  timeMode: "minutes"
  valueSeconds: number
  onValueSecondsChange: (seconds: number) => void
  minSeconds?: number
  maxSeconds?: number
  stepSeconds?: number
}

export type TimeInputFieldProps = HourTimeProps | MinutesTimeProps
