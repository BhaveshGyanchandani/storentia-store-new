import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item className={cn("hairline", className)} {...props} />
);

export function AccordionTrigger({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex w-full items-center justify-between py-4 text-left text-sm font-medium focus-ring [&[data-state=open]>svg]:rotate-45",
          className
        )}
        {...props}
      >
        {children}
        <Plus className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn("overflow-hidden text-sm text-ink-soft data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up", className)}
      {...props}
    >
      <div className="pb-4">{children}</div>
    </AccordionPrimitive.Content>
  );
}
