"use client"
import * as React from "react"

import type {
  HourTimeProps,
  MinutesTimeProps,
  TimeInputFieldBase,
  TimeInputFieldProps,
} from "./types"
import {
  DAY_MINUTES,
  digitsToDisplay,
  MS_MOD,
  padPartialToFour,
  parseFour,
  pluckTimeInputFieldRest,
  snapInRange,
  valueMinutesToDigits,
  valueSecondsToDigits,
} from "./utils"
import { cn } from "../../lib/utils"
import { InputField, type InputFieldProps } from "../input-field"

const TimeInputField = React.forwardRef<HTMLInputElement, TimeInputFieldProps>(
  (props, ref) => {
    const isHour = (props as TimeInputFieldProps).timeMode !== "minutes"
    const base = props as TimeInputFieldBase
    const {
      className,
      inputClassName,
      wrapperClassName,
      onBlur: onBlurProp,
      onFocus: onFocusProp,
      disabled,
    } = base

    const [digits, setDigits] = React.useState(() =>
      isHour
        ? valueMinutesToDigits((props as HourTimeProps).valueMinutes)
        : valueSecondsToDigits((props as MinutesTimeProps).valueSeconds)
    )
    const [focused, setFocused] = React.useState(false)

    const valueKey = isHour
      ? (props as HourTimeProps).valueMinutes
      : (props as MinutesTimeProps).valueSeconds

    React.useEffect(() => {
      if (focused) return
      setDigits(
        isHour
          ? valueMinutesToDigits((props as HourTimeProps).valueMinutes)
          : valueSecondsToDigits((props as MinutesTimeProps).valueSeconds)
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps -- sync from `valueKey` only, not the whole `props` ref
    }, [valueKey, focused, isHour])

    const commitPadded = React.useCallback(
      (padded: string) => {
        const p = parseFour(padded, isHour ? "hour" : "minutes")
        if (isHour) {
          const m = snapInRange(
            p.min,
            (props as HourTimeProps).minMinutes ?? 0,
            (props as HourTimeProps).maxMinutes ?? DAY_MINUTES - 1,
            (props as HourTimeProps).stepMinutes ?? 1
          )
          ;(props as HourTimeProps).onValueMinutesChange(m)
          return valueMinutesToDigits(m)
        }
        const s = snapInRange(
          p.sec,
          (props as MinutesTimeProps).minSeconds ?? 0,
          (props as MinutesTimeProps).maxSeconds ?? MS_MOD - 1,
          (props as MinutesTimeProps).stepSeconds ?? 1
        )
        ;(props as MinutesTimeProps).onValueSecondsChange(s)
        return valueSecondsToDigits(s)
      },
      [isHour, props]
    )

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      const next = e.target.value.replace(/\D/g, "").slice(0, 4)
      setDigits(next)
      if (next.length === 4) {
        setDigits(commitPadded(next))
      }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        e.key.length === 1 &&
        /[0-9]/.test(e.key) &&
        !e.metaKey &&
        !e.ctrlKey
      ) {
        return
      }
      if (
        [
          "Backspace",
          "Delete",
          "Tab",
          "Enter",
          "ArrowLeft",
          "ArrowRight",
          "Home",
          "End",
        ].includes(e.key) ||
        e.metaKey ||
        e.ctrlKey
      ) {
        if (e.key === "Enter") e.currentTarget.blur()
        return
      }
      e.preventDefault()
    }

    const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4)
      if (!t.length) return
      setDigits(t)
      if (t.length === 4) {
        setDigits(commitPadded(t))
      }
    }

    const onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(false)
      const d = e.target.value.replace(/\D/g, "")
      if (d.length === 0) {
        setDigits(
          isHour
            ? valueMinutesToDigits((props as HourTimeProps).valueMinutes)
            : valueSecondsToDigits((props as MinutesTimeProps).valueSeconds)
        )
        onBlurProp?.(e)
        return
      }
      const padded = d.length < 4 ? padPartialToFour(d) : d
      setDigits(commitPadded(padded))
      onBlurProp?.(e)
    }

    const onFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(true)
      setDigits(
        isHour
          ? valueMinutesToDigits((props as HourTimeProps).valueMinutes)
          : valueSecondsToDigits((props as MinutesTimeProps).valueSeconds)
      )
      e.target.select()
      onFocusProp?.(e)
    }

    const rest = pluckTimeInputFieldRest(props, isHour)

    return (
      <div className={cn("w-24 max-w-full shrink-0", className)}>
        <InputField
          ref={ref}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="00:00"
          value={digitsToDisplay(digits)}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          inputClassName={cn(
            "tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            inputClassName
          )}
          wrapperClassName={cn("min-w-0", wrapperClassName)}
          {...(rest as InputFieldProps)}
        />
      </div>
    )
  }
)
TimeInputField.displayName = "TimeInputField"

export { TimeInputField }
