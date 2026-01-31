import {
	getPayloadConfigFromPayload,
	type ChartConfig,
	type CustomTooltipProps,
} from "@/components/ui/chart";
import { useCurrency } from "@/hooks/use-currency";

export function CustomChartTooltipContent({
	active,
	payload,
	currency,
	config,
}: CustomTooltipProps & {
	currency?: string;
	config: ChartConfig;
}) {
	const { formatCurrency } = useCurrency();

	if (payload.length === 0 || !active) return null;

	return (
		<div className="relative mb-2 flex flex-col items-center">
			{payload.map((item) => {
				const indicatorColor = item.payload.fill || item.color;
				const key = `${item.name || item.dataKey || "value"}`;
				const itemConfig = getPayloadConfigFromPayload(config, item, key);

				return (
					<div
						key={item.dataKey}
						className="text-secondary-foreground bg-secondary flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-bold shadow-lg"
					>
						<div className="h-3 w-3 rounded-full" style={{ backgroundColor: indicatorColor }} />

						<div>
							<div className="text-muted-foreground text-xs font-medium">
								{itemConfig?.label || item.name}
							</div>
							<div>{formatCurrency(item.value, { currency })}</div>
						</div>
					</div>
				);
			})}
			<div className="border-t-secondary h-0 w-0 border-t-[6px] border-r-[6px] border-l-[6px] border-r-transparent border-l-transparent" />
		</div>
	);
}
