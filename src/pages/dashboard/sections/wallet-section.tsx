import { MoreIcon } from "@/components/icons/more-icon";
import { ErrorDisplayCard } from "@/components/layout/error-display-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApiContext } from "@/context/api.context";
import { useLanguage } from "@/hooks/use-language";
import { RequestHelper } from "@/lib/request-helper.namespace";
import { WalletCardCard } from "@/pages/dashboard/components/wallet-card-card";
import { useQuery } from "@tanstack/react-query";

export function WalletSection() {
	const { t } = useLanguage("finance");
	const { financialApi } = useApiContext();
	const walletQuery = useQuery(financialApi.getWallet());

	if (walletQuery.error) {
		return (
			<Card className="flex flex-col items-center border-none p-0">
				<CardHeader>
					<CardTitle>{t("wallet")}</CardTitle>
				</CardHeader>

				<ErrorDisplayCard error={RequestHelper.getApiError(walletQuery.error)} />
			</Card>
		);
	}

	return (
		<Card className="flex flex-col items-center border-none p-0">
			<CardHeader>
				<CardTitle>{t("wallet")}</CardTitle>
				<DropdownMenu>
					<DropdownMenuTrigger className="ghost icon">
						<MoreIcon />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Figma'da menü tasarımı yok.</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardHeader>

			{walletQuery.isPending ? (
				<>
					<WalletCardCard
						card={{
							bank: "Fintech.",
							type: "Universal Bank",
							network: "mastercard",
							cardNumber: "**** **** **** ****",
							expiryMonth: 0,
							expiryYear: 99,
							color: "#000000",
							id: "1",
							isDefault: true,
							name: "placeholder-1",
						}}
					/>

					<div className="-mt-16 ml-0 2xl:ml-20">
						<WalletCardCard
							className="scale-[92%]"
							card={{
								bank: "Fintech.",
								type: "Commercial Bank",
								network: "visa",
								cardNumber: "************",
								expiryMonth: 0,
								expiryYear: 99,
								color: "#FFFFFF",
								id: "2",
								isDefault: false,
								name: "placeholder-2",
							}}
						/>
					</div>
				</>
			) : (
				walletQuery.data.data.cards.map((card) => (
					<div key={card.id} className={card.isDefault ? "" : "-mt-16 ml-0 2xl:ml-20"}>
						<WalletCardCard card={card} className={card.isDefault ? "" : "scale-[92%]"} />
					</div>
				))
			)}
		</Card>
	);
}
