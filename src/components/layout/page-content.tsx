import { usePageTitle } from "@/hooks/use-page-title";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function PageContent({
	className,
	browserTitle: browserTitle1,
	children,
	...rest
}: ComponentProps<"div"> & { browserTitle?: string }) {
	const { browserTitle: browserTitle2 } = usePageTitle();
	const browserTitle = browserTitle1 ?? browserTitle2;

	return (
		<div
			className={cn(
				"flex flex-col [&_main]:flex-1",
				// 8 (header top) + 12 (header height) + 4
				"px-4 sm:px-10",
				className,
			)}
			{...rest}
		>
			<title>{browserTitle}</title>
			{children}
		</div>
	);
}
