import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
	return <div className={cn("w-full rounded-lg border px-6 py-5", className)}>{children}</div>;
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
	return (
		<div className={cn("flex w-full items-center justify-between pb-4", className)}>{children}</div>
	);
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
	return <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>;
}
