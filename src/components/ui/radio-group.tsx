import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export const RadioGroup = RadioGroupPrimitive.Root;

export function RadioGroupItem({ className, ...props }: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "h-4 w-4 shrink-0 rounded-full border border-ink/40 focus-ring data-[state=checked]:border-accent transition-colors relative",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="absolute inset-[3px] rounded-full bg-accent" />
    </RadioGroupPrimitive.Item>
  );
}
