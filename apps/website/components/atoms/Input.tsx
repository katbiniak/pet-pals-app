import * as React from "react";
import { cn } from "@/utils/cn";

// Shadcn RadixUI Input https://ui.shadcn.com/docs/components/radix/input

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-13 w-full min-w-0 rounded-[4px] border border-plum bg-transparent px-3 py-4 text-charcoal transition-colors outline-none placeholder:text-charcoal/50 focus-visible:border-plum focus-visible:ring-3 focus-visible:ring-plum disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-charcoal/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-error/20 text-base dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
