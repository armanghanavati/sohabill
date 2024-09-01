import { cn } from "src/utils/tailwind-utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "tw-relative tw-isolate tw-overflow-hidden tw-rounded-[4px] tw-bg-mainBlack/10 tw-shadow-xl tw-shadow-mainBlack/5 before:tw-absolute before:tw-inset-0 before:-tw-translate-x-full before:tw-animate-[shimmer_2s_infinite] before:tw-border-t before:tw-border-primary/10 before:tw-bg-skeleton",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
