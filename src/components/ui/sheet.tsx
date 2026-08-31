import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: "left" | "right" | "bottom";
  title: string;
  description?: string;
  hideHeader?: boolean;
}

const sideClasses: Record<string, string> = {
  right:
    "right-0 top-0 h-full w-full max-w-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300",
  left: "left-0 top-0 h-full w-full max-w-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left duration-300",
  bottom:
    "bottom-0 left-0 w-full max-h-[88vh] rounded-t-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom duration-300",
};

export function SheetContent({
  side = "right",
  title,
  description,
  hideHeader,
  className,
  children,
  ...props
}: SheetContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        className={cn("fixed z-50 glass-surface shadow-lift flex flex-col outline-none", sideClasses[side], className)}
        {...props}
      >
        {!hideHeader && (
          <div className="flex items-center justify-between px-6 py-5 hairline shrink-0">
            <div>
              <DialogPrimitive.Title className="font-display text-lg">{title}</DialogPrimitive.Title>
              {description && (
                <DialogPrimitive.Description className="text-xs text-muted-foreground mt-1">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
            <DialogPrimitive.Close className="focus-ring rounded-sm p-2 hover:bg-muted transition-colors">
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
          </div>
        )}
        {hideHeader && <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
