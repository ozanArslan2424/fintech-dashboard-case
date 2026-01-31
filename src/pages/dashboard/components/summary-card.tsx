import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SummaryCardProps = {
	variant: "accent" | "secondary";
	icon: ReactNode;
	label: string;
	value: string;
};

export function SummaryCard({ variant, icon, label, value }: SummaryCardProps) {
	return (
		<div
			className={cn(
				"flex w-full items-center gap-4 rounded-lg px-5 py-6",
				variant === "accent" ? "bg-accent" : "bg-secondary/70",
			)}
		>
			<div
				className={cn(
					"grid size-10 place-items-center rounded-full p-2",
					variant === "accent"
						? "[&_svg>path]:fill-primary bg-[#4E5257]"
						: "[&_svg>path]:fill-secondary-foreground bg-[#EBE8E8]",
				)}
			>
				{icon}
			</div>

			<div className="space-y-2">
				<p
					className={cn(
						variant === "accent" ? "text-accent-foreground/70" : "text-foreground/70",
						"text-sm",
					)}
				>
					{label}
				</p>
				<p
					className={cn(
						variant === "accent" ? "text-accent-foreground" : "text-foreground",
						"text-2xl font-bold",
					)}
				>
					{value}
				</p>
			</div>
		</div>
	);
}
