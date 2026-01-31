import { apiRoutes } from "@/api/api.routes";
import type {
	RecentTransactionsModel,
	ScheduledTransfersModel,
	SummaryModel,
	WalletModel,
	WorkingCapitalModel,
} from "@/api/financial/financial.model";
import type { QueryClient } from "@/lib/query/query.client";
import type { RequestClient } from "@/lib/request/request.client";

export class FinancialApi {
	constructor(
		private readonly queryClient: QueryClient,
		private readonly requestClient: RequestClient,
	) {}

	getSummary = () =>
		this.queryClient.makeQuery<SummaryModel["response"]>({
			queryKey: [apiRoutes.financial.summary],
			queryFn: () => this.requestClient.get(apiRoutes.financial.summary),
		});

	getWallet = () =>
		this.queryClient.makeQuery<WalletModel["response"]>({
			queryKey: [apiRoutes.financial.wallet],
			queryFn: () => this.requestClient.get(apiRoutes.financial.wallet),
		});

	getRecentTransactions = (params?: RecentTransactionsModel["query"]) =>
		this.queryClient.makeQuery<RecentTransactionsModel["response"]>({
			queryKey: [apiRoutes.financial.transactions.recent, params],
			queryFn: () => this.requestClient.get(apiRoutes.financial.transactions.recent, { params }),
		});

	getWorkingCapital = (period: string) =>
		this.queryClient.makeQuery<WorkingCapitalModel["response"]>({
			queryKey: [apiRoutes.financial.workingCapital, period],
			queryFn: () =>
				this.requestClient.get(apiRoutes.financial.workingCapital, { params: { period } }),
		});

	getScheduledTransfers = () =>
		this.queryClient.makeQuery<ScheduledTransfersModel["response"]>({
			queryKey: [apiRoutes.financial.transfers.scheduled],
			queryFn: () => this.requestClient.get(apiRoutes.financial.transfers.scheduled),
		});
}
