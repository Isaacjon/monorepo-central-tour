import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "../lib/utils"

const secondaryGrayButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap border border-c-gray-300 bg-background font-semibold tracking-normal text-c-gray-700 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05),0px_0px_0px_4px_var(--color-c-gray-100)] disabled:pointer-events-none disabled:bg-background disabled:border-c-gray-300 disabled:text-c-gray-300 disabled:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] disabled:hover:bg-background disabled:hover:border-c-gray-300 disabled:hover:text-c-gray-300 [&_svg]:shrink-0",
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

export type SecondaryGrayButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof secondaryGrayButtonVariants> & {
      asChild?: boolean
      leadingIcon?: React.ReactNode
      trailingIcon?: React.ReactNode
    }

const SecondaryGrayButton = React.forwardRef<
  HTMLButtonElement,
  SecondaryGrayButtonProps
>(
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
        className={cn(
          secondaryGrayButtonVariants({ size, fullWidth }),
          className
        )}
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
SecondaryGrayButton.displayName = "SecondaryGrayButton"

export { SecondaryGrayButton, secondaryGrayButtonVariants }
