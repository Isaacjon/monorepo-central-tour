import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "../lib/utils"

const primaryButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap border border-primary bg-primary font-semibold tracking-normal text-primary-foreground shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors hover:border-primary/90 hover:bg-primary/90 focus-visible:outline-none focus-visible:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05),0px_0px_0px_4px_color-mix(in_srgb,var(--color-primary)_24%,transparent)] disabled:pointer-events-none disabled:border-primary/[0.24] disabled:bg-primary/[0.24] disabled:text-primary-foreground/60 disabled:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] disabled:hover:border-primary/[0.24] disabled:hover:bg-primary/[0.24] [&_svg]:shrink-0",
  {
    variants: {
      size: {
        sm: "gap-2 rounded-lg px-[14px] py-2 text-sm leading-5 [&_svg]:size-5",
        md: "min-h-10 gap-2 rounded-lg px-4 py-[10px] text-sm leading-5 [&_svg]:size-5",
        lg: "min-h-11 gap-2 rounded-lg px-[18px] py-[10px] text-base leading-6 [&_svg]:size-5",
        xl: "min-h-12 gap-2 rounded-lg px-5 py-3 text-base leading-6 [&_svg]:size-5",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      fullWidth: false,
    },
  }
)

export type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof primaryButtonVariants> & {
    asChild?: boolean
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
  }

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (
    {
      className,
      size,
      fullWidth,
      asChild = false,
      leadingIcon,
      trailingIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(primaryButtonVariants({ size, fullWidth }), className)}
        ref={ref}
        {...(asChild
          ? props
          : {
              ...props,
              type:
                (props as React.ButtonHTMLAttributes<HTMLButtonElement>).type ??
                "button",
            })}
      >
        {asChild ? (
          children
        ) : (
          <>
            {leadingIcon}
            {children}
            {trailingIcon}
          </>
        )}
      </Comp>
    )
  }
)
PrimaryButton.displayName = "PrimaryButton"

export { PrimaryButton, primaryButtonVariants }
