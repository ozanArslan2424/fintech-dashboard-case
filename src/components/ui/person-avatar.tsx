import type { Help } from "@/lib/help.namespace";
import { cn } from "@/lib/utils";

export function PersonAvatar<
	T extends {
		fullName: string;
		image?: Help.Maybe<string>;
	},
>({ person, className }: { person: T; className?: string }) {
	const initials = person.fullName
		.split(" ")
		.map((p) => p[0].toLocaleUpperCase())
		.slice(0, 2)
		.join("");

	if (person.image) {
		return (
			<div className={cn("inline size-7 shrink-0 overflow-hidden rounded-full", className)}>
				<img className="aspect-square size-full" src={person.image} alt={person.fullName} />
			</div>
		);
	}

	return (
		<div
			className={cn(
				"bg-card text-card-foreground inline-flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-bold capitalize no-underline select-none",
				className,
			)}
		>
			{initials}
		</div>
	);
}
