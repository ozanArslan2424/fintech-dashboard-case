import type { Transfer } from "@/api/financial/financial.model";
import { PersonAvatar } from "@/components/ui/person-avatar";
import { useDate } from "@/hooks/use-date";

export function ScheduledTransferCard({ transfer }: { transfer: Transfer }) {
	const { formatDate } = useDate();

	return (
		<div className="flex items-center justify-between py-3 not-last-of-type:border-b">
			<div className="flex items-center gap-4">
				<PersonAvatar
					className="size-8"
					person={{ fullName: transfer.name, image: transfer.image }}
				/>
				<div className="space-y-0.5">
					<p className="text-sm font-semibold">{transfer.name}</p>
					<p className="text-muted-foreground text-xs font-medium">
						{formatDate(transfer.date).custom("MMMM D, YYYY [at] HH:mm")}
					</p>
				</div>
			</div>

			{/* NOT: API'dan dönen currency "$" olduğu için para birimini Intl ile yazamıyoruz. 
							API'dan dönen currency'nin düzeltilmesi şart. */}
			<div className="font-semibold">
				{transfer.amount < 0 && "-"}
				{transfer.currency}
				{transfer.amount < 0 ? 0 - transfer.amount : transfer.amount}
			</div>
		</div>
	);
}
