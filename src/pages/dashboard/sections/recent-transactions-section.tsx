import { ErrorDisplayCard } from "@/components/layout/error-display-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ViewAllLink } from "@/components/ui/view-all-link";
import { useApiContext } from "@/context/api.context";
import { useLanguage } from "@/hooks/use-language";
import { Help } from "@/lib/help.namespace";
import { RequestHelper } from "@/lib/request-helper.namespace";
import { clientRoutes } from "@/pages/client.routes";
import { TransactionTableRow } from "@/pages/dashboard/components/transaction-table-row";
import { TransactionTableRowSkeleton } from "@/pages/dashboard/components/transaction-table-row-skeleton";
import { useQuery } from "@tanstack/react-query";

export function RecentTransactionsSection() {
	const { t } = useLanguage("finance");
	const { financialApi } = useApiContext();
	const recentTransactionsQuery = useQuery(
		financialApi.getRecentTransactions({
			// NOT: Tasarımda limit 3 gözüküyor ve değiştirmek için bir input yok.
			limit: 3,
		}),
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("recentTransactions")}</CardTitle>
				<ViewAllLink
					href={clientRoutes.transactions}
					count={recentTransactionsQuery.data?.data.summary.count}
				/>
			</CardHeader>

			{recentTransactionsQuery.error ? (
				<ErrorDisplayCard error={RequestHelper.getApiError(recentTransactionsQuery.error)} />
			) : (
				<div className="max-h-80 w-full overflow-y-auto">
					<table className="w-full border-collapse border-spacing-0">
						<thead className="">
							<tr className="text-muted-foreground [&_th]:bg-background text-xs font-semibold [&_th]:sticky [&_th]:top-0 [&_th]:pt-1 [&_th]:pb-2">
								<th className="text-left">NAME/BUSINESS</th>
								<th className="text-center">TYPE</th>
								<th className="text-center">AMOUNT</th>
								<th className="text-center">DATE</th>
							</tr>
						</thead>

						<tbody className="text-sm">
							{recentTransactionsQuery.isPending
								? Help.repeat(4).map((i) => <TransactionTableRowSkeleton key={i} />)
								: recentTransactionsQuery.data?.data.transactions.map((tr) => (
										<TransactionTableRow key={tr.id} transaction={tr} />
									))}
						</tbody>
					</table>
				</div>
			)}
		</Card>
	);
}
