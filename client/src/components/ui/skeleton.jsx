import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-gray-300 dark:bg-gray-700", className)}
      {...props} />
  );
}

export { Skeleton }
