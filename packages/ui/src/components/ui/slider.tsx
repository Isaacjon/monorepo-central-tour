"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"
import * as React from "react"

import { cn } from "../../lib/utils"

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, defaultValue, min = 0, max = 100, ...props }, ref) => {
  const derived = value ?? defaultValue
  const _values = Array.isArray(derived) ? derived : derived != null ? [derived] : [min]
  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider"
      className={cn(
        "data-disabled:opacity-50 relative flex w-full touch-none select-none",
        "data-[orientation=horizontal]:h-5 items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full bg-[#EAECF0] data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="bg-primary absolute select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          className="block size-5 shrink-0 cursor-grab rounded-full border-[3px] border-primary bg-white shadow-[0_1px_2px_0_#1018280F,0_1px_3px_0_#1018281A] transition-shadow select-none after:absolute after:-inset-2 active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
