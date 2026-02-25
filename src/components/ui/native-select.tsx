"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

/** Native select with Hugeicons dropdown arrows. ArrowDown when closed, ArrowUp when focused/open. */
const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.ComponentPropsWithoutRef<"select">
>(({ className, children, onFocus, onBlur, onChange, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="relative inline-block w-full">
      <select
        ref={ref}
        className={cn(
          "w-full appearance-none bg-transparent pr-9",
          className
        )}
        onFocus={(e) => {
          setIsOpen(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setIsOpen(false)
          onBlur?.(e)
        }}
        onChange={(e) => {
          setIsOpen(false)
          onChange?.(e)
        }}
        {...props}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center text-muted-foreground">
        {isOpen ? (
          <HugeiconsIcon icon={ArrowUp01Icon} className="h-4 w-4 shrink-0" />
        ) : (
          <HugeiconsIcon icon={ArrowDown01Icon} className="h-4 w-4 shrink-0" />
        )}
      </span>
    </div>
  )
})
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }
