import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "react-router";

export function usePageTitle() {
	const { makeTranslator } = useLanguage();
	const tPaths = makeTranslator("paths");
	const tCommon = makeTranslator("common");
	const location = useLocation();
	const appName = tCommon("app");
	const pageHeading = tPaths(location.pathname.replaceAll("/", "").replaceAll("-", ""));
	return {
		pageHeading,
		browserTitle: `${appName} - ${pageHeading}`,
	};
}
