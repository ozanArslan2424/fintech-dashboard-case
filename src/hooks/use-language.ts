import type { Help } from "@/lib/help.namespace";
import type { locales } from "@/lib/locale/locale.config";
import { useTranslation } from "react-i18next";

type NS = keyof (typeof locales)["en-US"];

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
