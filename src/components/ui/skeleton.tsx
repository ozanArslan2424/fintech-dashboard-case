import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type SkeletonProps = ComponentProps<"div">;

export function Skeleton({ className, ...rest }: SkeletonProps) {
	return <div className={cn("bg-secondary animate-pulse rounded-md", className)} {...rest} />;
}
