import { useLanguage } from "@/hooks/use-language";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

export function ViewAllLink({ href }: { href: string }) {
	const { t } = useLanguage("common");

	return (
		<Link
			to={href}
			className="flex items-center gap-2 text-sm font-semibold text-emerald-500 hover:underline"
		>
			{t("viewAll")}
			<ChevronRightIcon className="size-4" />
		</Link>
	);
}
