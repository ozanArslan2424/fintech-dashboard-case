import { useTranslation } from "react-i18next";

export function useCurrency() {
	const { i18n } = useTranslation();

	function formatCurrency(
		amount: number,
		options?: Intl.NumberFormatOptions & {
			currency?: string;
		},
	): string {
		const currency = options?.currency ?? "USD";

		return new Intl.NumberFormat(i18n.language, {
			style: "currency",
			currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
			currencyDisplay: "narrowSymbol",
			...options,
		}).format(amount);
	}

	return {
		formatCurrency,
	};
}
