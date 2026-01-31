import { PageContent } from "@/components/layout/page-content";
import { RecentTransactionsSection } from "@/pages/dashboard/sections/recent-transactions-section";
import { ScheduledTransfersSection } from "@/pages/dashboard/sections/scheduled-transfers-section";
import { SummarySection } from "@/pages/dashboard/sections/summary-section";
import { WalletSection } from "@/pages/dashboard/sections/wallet-section";
import { WorkingCapitalChartSection } from "@/pages/dashboard/sections/working-capital-chart-section";

export function DashboardPage() {
	return (
		<PageContent>
			<main className="grid w-full grid-cols-1 gap-y-6 xl:grid-cols-3 xl:gap-10">
				<div className="col-span-2">
					<div className="flex flex-col gap-6">
						<SummarySection />
						<WorkingCapitalChartSection />
						<RecentTransactionsSection />
					</div>
				</div>
				<div className="col-span-1">
					<div className="flex flex-col gap-6 md:flex-row xl:flex-col">
						<WalletSection />
						<ScheduledTransfersSection />
					</div>
				</div>
			</main>
		</PageContent>
	);
}
