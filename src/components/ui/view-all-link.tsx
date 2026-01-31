import { useLanguage } from "@/hooks/use-language";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

type ViewAllLinkProps = {
	href: string;
	count?: number;
};

export function ViewAllLink({ href, count }: ViewAllLinkProps) {
	const { t } = useLanguage("common");

	return (
		<Link
			to={href}
			className="flex items-center gap-2 text-sm font-semibold text-emerald-500 hover:underline"
		>
			{t("viewAll")} {count && `(${count})`}
			<ChevronRightIcon className="size-4" />
		</Link>
	);
}
