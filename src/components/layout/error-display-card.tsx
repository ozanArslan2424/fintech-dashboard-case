import { TXT } from "@/lib/txt.namespace";

type ErrorDisplayCardProps = {
	error: string | undefined;
};

export function ErrorDisplayCard({ error }: ErrorDisplayCardProps) {
	if (!TXT.isDefined(error)) return null;

	return (
		<div className="text-destructive rounded-lg border bg-rose-50 px-4 py-2 text-center text-lg font-medium">
			{error}
		</div>
	);
}
