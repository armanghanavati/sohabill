import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import React from "react";
import { cn } from "src/utils/tailwind-utils";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn("CollapsibleContent", className)}
    {...props}
  />
));

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
