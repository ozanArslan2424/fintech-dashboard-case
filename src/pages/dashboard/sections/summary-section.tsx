import { TotalBalanceIcon } from "@/components/icons/total-balance-icon";
import { TotalSavedIcon } from "@/components/icons/total-saved-icon";
import { TotalSpendingIcon } from "@/components/icons/total-spending-icon";
import { ErrorDisplayCard } from "@/components/layout/error-display-card";
import { useApiContext } from "@/context/api.context";
import { useCurrency } from "@/hooks/use-currency";
import { useLanguage } from "@/hooks/use-language";
import { RequestHelper } from "@/lib/request-helper.namespace";
import { SummaryCard } from "@/pages/dashboard/components/summary-card";
import { useQuery } from "@tanstack/react-query";

export function SummarySection() {
	const { t, makeTranslator } = useLanguage("finance");
	const tCommon = makeTranslator("common");
	const { formatCurrency } = useCurrency();
	const { financialApi } = useApiContext();
	const summaryQuery = useQuery(financialApi.getSummary());

	if (summaryQuery.isPending) {
		return (
			<div className="flex flex-col gap-6 md:flex-row">
				<SummaryCard
					variant="accent"
					label={t("totalBalance")}
					value={tCommon("loading")}
					icon={<TotalBalanceIcon />}
				/>
				<SummaryCard
					variant="secondary"
					label={t("totalSpending")}
					value={tCommon("loading")}
					icon={<TotalSpendingIcon />}
				/>
				<SummaryCard
					variant="secondary"
					label={t("totalSaved")}
					value={tCommon("loading")}
					icon={<TotalSavedIcon />}
				/>
			</div>
		);
	}

	if (summaryQuery.error) {
		return <ErrorDisplayCard error={RequestHelper.getApiError(summaryQuery.error)} />;
	}

	return (
		<div className="flex flex-col gap-6 xl:flex-row">
			<SummaryCard
				variant="accent"
				label={t("totalBalance")}
				value={formatCurrency(summaryQuery.data.data.totalBalance.amount, {
					currency: summaryQuery.data.data.totalBalance.currency,
				})}
				icon={<TotalBalanceIcon />}
			/>
			<SummaryCard
				variant="secondary"
				label={t("totalSpending")}
				value={formatCurrency(summaryQuery.data.data.totalExpense.amount, {
					currency: summaryQuery.data.data.totalExpense.currency,
				})}
				icon={<TotalSpendingIcon />}
			/>
			<SummaryCard
				variant="secondary"
				label={t("totalSaved")}
				value={formatCurrency(summaryQuery.data.data.totalSavings.amount, {
					currency: summaryQuery.data.data.totalSavings.currency,
				})}
				icon={<TotalSavedIcon />}
			/>
		</div>
	);
}
