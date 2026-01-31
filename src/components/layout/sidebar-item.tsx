import { cn } from "@/lib/utils";
import { useMemo, type ReactNode } from "react";
import { Link } from "react-router";

type SidebarItemProps = {
	href?: string;
	onClick?: () => void;
	isActive?: boolean;
	label: string;
	icon: ReactNode;
};

export function SidebarItem({ href, onClick, isActive, label, icon }: SidebarItemProps) {
	const containerClassName = useMemo(
		() =>
			cn(
				"button group lg ghost justify-start font-semibold",
				isActive ? "bg-primary text-primary-foreground" : "hover:bg-primary/30 bg-transparent",
			),
		[isActive],
	);

	const contentsClassName = useMemo(
		() =>
			cn(
				"flex items-center gap-3 transition-opacity",
				isActive ? "opacity-100" : "opacity-55 group-hover:opacity-100",
				"[&_svg]:size-6",
			),

		[isActive],
	);

	if (href) {
		return (
			<Link to={href} className={containerClassName}>
				<div className={contentsClassName}>
					{icon}
					{label}
				</div>
			</Link>
		);
	}

	return (
		<button type="button" onClick={onClick} className={containerClassName}>
			<div className={contentsClassName}>
				{icon}
				{label}
			</div>
		</button>
	);
}
