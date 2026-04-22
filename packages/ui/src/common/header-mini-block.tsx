import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

import { cn } from "../lib/utils"

export type HeaderMiniBlockProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> & {
  asChild?: boolean
}

const HeaderMiniBlock = React.forwardRef<
  HTMLButtonElement,
  HeaderMiniBlockProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      className={cn(
        "active:bg-primary/10 active:text-primary text-c-gray-950 inline-flex size-10 items-center justify-center gap-2 rounded-lg p-2 transition-colors hover:bg-[#F9FAFB] [&_svg]:shrink-0",
        className
      )}
      {...(asChild
        ? props
        : {
            ...props,
            type:
              (props as React.ButtonHTMLAttributes<HTMLButtonElement>).type ??
              "button",
          })}
    />
  )
})
HeaderMiniBlock.displayName = "HeaderMiniBlock"

export { HeaderMiniBlock }
