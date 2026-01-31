import { DropdownIcon } from "@/components/icons/dropdown-icon";
import { ErrorDisplayCard } from "@/components/layout/error-display-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	type ChartConfig,
} from "@/components/ui/chart";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApiContext } from "@/context/api.context";
import { useLanguage } from "@/hooks/use-language";
import { RequestHelper } from "@/lib/request-helper.namespace";
import { CustomChartCursor } from "@/pages/dashboard/components/custom-chart-cursor";
import { CustomChartTooltipContent } from "@/pages/dashboard/components/custom-chart-tooltip-content";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

// NOT: Swagger'da böyle bir query görmedim. period="" şeklinde yolluyorum ama bir değişiklik yok.
// Dokümentasyon olmadan eklenemez.
const periodOptions = ["last6Months", "last7Days"];

export function WorkingCapitalChartSection() {
	const { t, makeTranslator } = useLanguage("finance");
	const tCommon = makeTranslator("common");
	const { financialApi } = useApiContext();
	const [period, setPeriod] = useState(periodOptions[0]);
	const workingCapitalQuery = useQuery(financialApi.getWorkingCapital(period));

	const incomeDataKey = "income";
	const expenseDataKey = "expense";
	const netDataKey = "net";
	const dateDataKey = "month";

	const config = {
		[incomeDataKey]: {
			label: t("income"),
			color: "#29A073",
		},
		[expenseDataKey]: {
			label: t("expense"),
			color: "#C8EE44",
		},
		[netDataKey]: {
			label: t("net"),
			color: "#C8EEFF",
		},
	} satisfies ChartConfig;

	if (workingCapitalQuery.error) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>{t("workingCapital")}</CardTitle>
				</CardHeader>
				<ErrorDisplayCard error={RequestHelper.getApiError(workingCapitalQuery.error)} />
			</Card>
		);
	}

	function handlePeriodChange(value: string) {
		setPeriod(value);
	}

	return (
		<Card>
			{workingCapitalQuery.isPending ? (
				<div className="h-[300px] w-full">
					<CardHeader className="flex-wrap">
						<CardTitle>{t("workingCapital")}</CardTitle>
						<div />
						<DropdownMenu>
							<DropdownMenuTrigger className="secondary sm text-xs font-normal">
								{tCommon("loading")}
								<DropdownIcon variant="line" />
							</DropdownMenuTrigger>
							<DropdownMenuContent></DropdownMenuContent>
						</DropdownMenu>
					</CardHeader>

					<div className="grid h-full place-items-center">
						<LoaderIcon className="h-10 w-10 animate-spin" />
					</div>
				</div>
			) : (
				<ChartContainer config={config} className="h-[300px] w-full **:outline-none">
					<AreaChart
						data={workingCapitalQuery.data.data.data}
						margin={{
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
						}}
					>
						{/* SVG tanımlamaları Gemini sayesinde */}
						<defs>
							<filter id="dotShadow" x="-50%" y="-50%" width="200%" height="200%">
								<feGaussianBlur in="SourceAlpha" stdDeviation="2" />
								<feOffset dx="0" dy="2" result="offsetblur" />
								<feComponentTransfer>
									<feFuncA type="linear" slope="0.2" />
								</feComponentTransfer>
								<feMerge>
									<feMergeNode />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
						</defs>

						<ChartLegend
							verticalAlign="top"
							align="right"
							content={(props) => (
								<CardHeader className="flex-wrap">
									<CardTitle>{t("workingCapital")}</CardTitle>
									<ChartLegendContent {...props} />
									<DropdownMenu>
										<DropdownMenuTrigger className="secondary sm text-xs font-normal">
											{t(period)}
											<DropdownIcon variant="line" />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											{periodOptions.map((p) => (
												<DropdownMenuItem key={p} onClick={() => handlePeriodChange(p)}>
													{t(p)}
												</DropdownMenuItem>
											))}
											<DropdownMenuItem>
												Query parametreleriyle ilgili bir bilgi bulamadım.
											</DropdownMenuItem>
											<DropdownMenuItem>Figma'da menü tasarımı yok.</DropdownMenuItem>
											<DropdownMenuItem>
												"last6Months" diye dönen period verisini Last 6 Months diye göstermek
												tutarlı bir dönüştürücü gerektiriyor.
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</CardHeader>
							)}
						/>

						<div className="pt-4">
							<CartesianGrid horizontal={false} />

							<YAxis
								padding={{ top: 12, bottom: 12 }}
								tickLine={false}
								axisLine={false}
								tickFormatter={(value) => `${value / 1000}K`}
							/>

							<XAxis
								padding={{ left: 12, right: 12 }}
								dataKey={dateDataKey}
								tickLine={false}
								axisLine={false}
								tickMargin={4}
								minTickGap={16}
								// NOT: Tarihler ay ismi olarak geliyor, ISO kodu daha iyi olurdu
								// tickFormatter={(value) => formatDate(value).custom("MMM DD")}
							/>

							<ChartTooltip
								position={{ y: 20 }}
								offset={-40}
								cursor={<CustomChartCursor />}
								content={(props) => (
									<CustomChartTooltipContent
										currency={workingCapitalQuery.data.data.currency}
										config={config}
										{...props}
									/>
								)}
							/>

							{Object.entries(config).map(([key, conf]) => (
								<Area
									key={key}
									type="monotone"
									dataKey={key}
									stroke={conf.color}
									strokeWidth={2}
									fillOpacity={0}
									connectNulls
									activeDot={{
										r: 6,
										fill: "#5243AA",
										strokeWidth: 2,
										stroke: "#ffffff",
										style: { filter: "url(#dotShadow)" },
									}}
								/>
							))}
						</div>
					</AreaChart>
				</ChartContainer>
			)}
		</Card>
	);
}
