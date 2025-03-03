import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"


const buttonVariants = cva(
  "ui-inline-flex ui-items-center ui-justify-center ui-gap-2 ui-whitespace-nowrap ui-rounded-md ui-text-sm ui-font-medium ui-transition-[color,box-shadow] disabled:ui-pointer-events-none disabled:ui-opacity-50 [&_svg]:ui-pointer-events-none [&_svg:not([class*=size-])]:ui-size-4 ui-shrink-0 [&_svg]:ui-shrink-0 ui-outline-none focus-visible:ui-border-ring focus-visible:ui-ring-ring/50 focus-visible:ui-ring-[3px] aria-invalid:ui-ring-destructive/20 dark:aria-invalid:ui-ring-destructive/40 aria-invalid:ui-border-destructive",
  {
    variants: {
      variant: {
        default:
          "ui-bg-primary ui-text-primary-foreground ui-shadow-xs hover:ui-bg-primary/90",
        destructive:
          "ui-bg-destructive ui-text-white ui-shadow-xs hover:ui-bg-destructive/90 focus-visible:ui-ring-destructive/20 dark:focus-visible:ui-ring-destructive/40",
        outline:
          "ui-border ui-border-input ui-bg-background ui-shadow-xs hover:ui-bg-accent hover:ui-text-accent-foreground",
        secondary:
          "ui-bg-secondary ui-text-secondary-foreground ui-shadow-xs hover:ui-bg-secondary/80",
        ghost: "hover:ui-bg-accent hover:ui-text-accent-foreground",
        link: "ui-text-primary ui-underline-offset-4 hover:ui-underline",
      },
      size: {
        default: "ui-h-9 ui-px-4 ui-py-2 has-[>svg]:ui-px-3",
        sm: "ui-h-8 ui-rounded-md ui-gap-1.5 ui-px-3 has-[>svg]:ui-px-2.5",
        lg: "ui-h-10 ui-rounded-md ui-px-6 has-[>svg]:ui-px-4",
        icon: "ui-size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
