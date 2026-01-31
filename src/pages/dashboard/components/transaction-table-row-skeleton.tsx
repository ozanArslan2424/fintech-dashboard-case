import { Skeleton } from "@/components/ui/skeleton";

export function TransactionTableRowSkeleton() {
	return (
		<tr className="not-last-of-type:border-b [&_td]:py-2">
			<td className="flex items-center gap-3">
				<Skeleton className="size-10 rounded-md" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-3 w-16" />
				</div>
			</td>

			<td className="px-4">
				<div className="flex justify-center">
					<Skeleton className="h-4 w-12" />
				</div>
			</td>

			<td className="px-4">
				<div className="flex justify-center">
					<Skeleton className="h-4 w-16" />
				</div>
			</td>

			<td className="px-4">
				<div className="flex justify-center">
					<Skeleton className="h-4 w-20" />
				</div>
			</td>
		</tr>
	);
}
