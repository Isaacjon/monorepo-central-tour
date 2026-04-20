"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as React from "react"

import { cn } from "ui"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 w-full items-center justify-start gap-7 border-b border-zinc-200 bg-transparent p-0",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "focus-visible:ring-primary relative -mb-2 inline-flex items-center justify-center rounded-none border-b-2 border-transparent bg-transparent pb-2 text-sm font-medium whitespace-nowrap text-zinc-500 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-zinc-900 data-[state=active]:text-zinc-900",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

export { Tabs, TabsList, TabsTrigger }
