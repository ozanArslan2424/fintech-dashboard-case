import type { Help } from "@/lib/help.namespace";
import type { NS } from "@/lib/locale/locale.config";
import { useTranslation } from "react-i18next";

export function useLanguage(ns?: NS) {
	const { t, i18n } = useTranslation(ns);

	const makeTranslator = (ns: NS) => (key: string, opts?: Help.UnknownObject) =>
		t(key, { ns, ...opts });

	return {
		t,
		makeTranslator,
		i18n,
	};
}
