import { Help } from "@/lib/help.namespace";
import type { QueryClientConfig } from "@tanstack/react-query";

function handleRetry(failCount: number, error: unknown) {
	const RETRY_LIMIT = 3;

	if (Help.isObjectWith<{ status: number }>(error, "status") && typeof error.status === "number") {
		const isTimeout = [408, 504].includes(error.status);

		if (isTimeout) {
			return failCount < RETRY_LIMIT;
		} else if (error.status > 400) {
			return false;
		} else {
			return false;
		}
	}

	return false;
}

function handleMutationError(err: Error) {
	if (import.meta.env.NODE_ENV !== "production") {
		console.log(err);
	}
}

export const queryConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			retry: handleRetry,
			staleTime: Infinity,
			refetchOnWindowFocus: false,
		},
		mutations: {
			retry: handleRetry,
			onError: handleMutationError,
		},
	},
};
