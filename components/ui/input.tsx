import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "ui-border-input file:ui-text-foreground placeholder:ui-text-muted-foreground selection:ui-bg-primary selection:ui-text-primary-foreground ui-flex ui-h-9 ui-w-full ui-min-w-0 ui-rounded-md ui-border ui-bg-transparent ui-px-3 ui-py-1 ui-text-base ui-shadow-xs ui-transition-[color,box-shadow] ui-outline-none file:ui-inline-flex file:ui-h-7 file:ui-border-0 file:ui-bg-transparent file:ui-text-sm file:ui-font-medium disabled:ui-pointer-events-none disabled:ui-cursor-not-allowed disabled:ui-opacity-50 md:ui-text-sm",
        "focus-visible:ui-border-ring focus-visible:ui-ring-ring/50 focus-visible:ui-ring-[3px]",
        "aria-invalid:ui-ring-destructive/20 dark:aria-invalid:ui-ring-destructive/40 aria-invalid:ui-border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
