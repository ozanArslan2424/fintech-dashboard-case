import { ErrorDisplayCard } from "@/components/layout/error-display-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ViewAllLink } from "@/components/ui/view-all-link";
import { useApiContext } from "@/context/api.context";
import { useLanguage } from "@/hooks/use-language";
import { Help } from "@/lib/help.namespace";
import { RequestHelper } from "@/lib/request-helper.namespace";
import { clientRoutes } from "@/pages/client.routes";
import { ScheduledTransferCard } from "@/pages/dashboard/components/scheduled-transfer-card";
import { ScheduledTransferCardSkeleton } from "@/pages/dashboard/components/scheduled-transfer-card-skeleton";
import { useQuery } from "@tanstack/react-query";

export function ScheduledTransfersSection() {
	const { t } = useLanguage("finance");
	const { financialApi } = useApiContext();
	const scheduledTransfersQuery = useQuery(financialApi.getScheduledTransfers());

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("scheduledTransfers")}</CardTitle>
				<ViewAllLink href={clientRoutes.transfers} />
			</CardHeader>

			<div className="w-full">
				{scheduledTransfersQuery.isPending ? (
					Help.repeat(5).map((i) => <ScheduledTransferCardSkeleton key={i} />)
				) : scheduledTransfersQuery.error ? (
					<ErrorDisplayCard error={RequestHelper.getApiError(scheduledTransfersQuery.error)} />
				) : (
					scheduledTransfersQuery.data?.data.transfers.map((transfer) => (
						<ScheduledTransferCard key={transfer.id} transfer={transfer} />
					))
				)}
			</div>
		</Card>
	);
}
