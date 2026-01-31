import { Skeleton } from "@/components/ui/skeleton";

export function ScheduledTransferCardSkeleton() {
	return (
		<div className="flex items-center justify-between py-3 not-last-of-type:border-b">
			<div className="flex items-center gap-4">
				<Skeleton className="size-8 rounded-full" />

				<div className="space-y-2">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-3 w-32" />
				</div>
			</div>

			<Skeleton className="h-4 w-12" />
		</div>
	);
}
