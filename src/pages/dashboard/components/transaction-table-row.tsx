import type { Transaction } from "@/api/financial/financial.model";
import { useCurrency } from "@/hooks/use-currency";
import { useDate } from "@/hooks/use-date";

type TransactionTableRowProps = {
	transaction: Transaction;
};

export function TransactionTableRow({ transaction }: TransactionTableRowProps) {
	const { formatCurrency } = useCurrency();
	const { formatDate } = useDate();

	return (
		<tr className="not-last-of-type:border-b [&_td]:py-2">
			<td className="flex items-center gap-3">
				<div className="bg-secondary grid size-10 place-items-center rounded-md">
					<img src={transaction.image} alt={transaction.name} />
				</div>
				<div className="space-y-1">
					<div className="text-sm font-medium">{transaction.name}</div>
					<div className="text-muted-foreground text-xs font-normal">{transaction.business}</div>
				</div>
			</td>

			<td className="text-muted-foreground text-center text-sm font-medium">{transaction.type}</td>

			<td className="text-foreground text-center text-sm font-semibold">
				{formatCurrency(transaction.amount, { currency: transaction.currency })}
			</td>

			<td className="text-muted-foreground text-center text-sm font-medium">
				{formatDate(transaction.date).short}
			</td>
		</tr>
	);
}
