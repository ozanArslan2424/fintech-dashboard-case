import type { ErrorResponse } from "@/lib/request/request.types";
import { AxiosError } from "axios";

export namespace RequestHelper {
	export function getApiError(err: Error | null): string {
		let msg = "error";

		if (err instanceof AxiosError) {
			const data = err.response?.data as ErrorResponse | undefined;
			msg = data?.message ?? err.message;
		} else if (err) {
			msg = err.message;
		}

		return msg;
	}
}
