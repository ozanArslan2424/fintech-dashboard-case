import language from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en";

export const locales = {
	"en-US": en,
};

language
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en-US",
		interpolation: {
			escapeValue: false,
		},
		resources: locales,
		detection: {
			order: ["localStorage", "navigator", "htmlTag"],
			caches: ["localStorage"],
		},
	});

export type NS = keyof (typeof locales)["en-US"];
export const translate = (ns: NS, key: string) => language.t(key, { ns });
export default language;
