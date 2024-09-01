import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils/tailwind-utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: any;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { title, icon, className, variant, size, asChild = false, ...props },
    ref,
  ) => {
    const Comp = "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="tw-mx-1">{icon}</span>
        {title}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

const buttonVariants = cva(
  "tw-inline-flex tw-items-center tw-no-underline tw-justify-center tw-whitespace-nowrap tw-rounded-lg tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 tw-font-semibold focus-visible:tw-ring-primary-disabled disabled:tw-pointer-events-none disabled:tw-opacity-50 text-",
  {
    variants: {
      variant: {
        default:
          "tw-bg-primary tw-text-white tw-text-md tw-shadow hover:tw-bg-primary-hover hover:tw-text-white",
        secondary:
          "tw-bg-secondary tw-text-white tw-shadow-sm hover:tw-bg-secondary-hover",
        ghost: "tw-text-mainBlack hover:tw-text-mainGray-dark",
        link: "tw-text-mainBlack tw-text-lg tw-underline-offset-4 tw-px-3 hover:tw-text-mainGray-dark",
        white:
          "tw-bg-white tw-border tw-border-gray-300 tw-text-gray-700 tw-shadow-sm hover:tw-bg-gray-100",
        outLine_default:
          "tw-col-span-3 tw-mt-5 tw-border tw-border-primary tw-text-primary hover:tw-text-primary-hover",
        outLine_secondary: "tw-bg-white tw-text-secondary tw-shadow-sm",
      },
      size: {
        default: "tw-text-sm tw-px-[38px] tw-py-1",
        full: "tw-border-none tw-text-2lg tw-py-0 lg:tw-py-3 tw-w-full",
        md: "tw-text-base tw-py-1 tw-px-[45.5px]",
        xl: "tw-text-md tw-py-2 tw-px-[75px] ",
        xxl: "tw-text-lg tw-py-0 tw-px-[109.5px]",
        lg: "tw-text-lg tw-py-3 tw-px-[171px]",
        link: "tw-px-0 tw-text-lg",
        icon: "tw-size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
