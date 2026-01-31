import type { Help } from "@/lib/help.namespace";
import type { BaseModel, QueryKey, QueryUpdaterArgs } from "@/lib/query/query.types";
import {
	QueryClient as TanstackQueryClient,
	queryOptions,
	type DefaultError,
	type QueryClientConfig,
	type UseMutationOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";

export class QueryClient extends TanstackQueryClient {
	constructor(readonly queryConfig: QueryClientConfig) {
		super(queryConfig);
	}

	makeQuery = queryOptions;

	makeMutation = <M extends BaseModel, TOnMutateResult = unknown>(
		options: UseMutationOptions<M["response"], DefaultError, M["body"], TOnMutateResult>,
	) => options;

	makeOptimisticMutation = <M extends BaseModel, TQueryData = unknown>({
		queryKey,
		updater,
		onChange,
		...options
	}: UseMutationOptions<M["response"], DefaultError, M["body"], () => void> & {
		queryKey: QueryKey;
		updater: (prev: TQueryData, body: M["body"]) => TQueryData;
		onChange?: (res: M["response"] | undefined, err: DefaultError | null, body: M["body"]) => void;
	}): UseMutationOptions<M["response"], DefaultError, M["body"], () => void> => ({
		onMutate: (body, ctx) => {
			const snapshot = ctx.client.getQueryData<TQueryData>(queryKey);
			ctx.client.setQueryData<TQueryData>(queryKey, (prev) => {
				if (!prev) return prev;
				return updater(prev, body);
			});
			return () => {
				ctx.client.setQueryData(queryKey, snapshot);
			};
		},
		onSettled: (res, err, body, revert) => {
			onChange?.(res, err, body);
			if (err) {
				toast.error(err.message);
				revert?.();
			}
		},
		...options,
	});

	invalidateAll(...queryKeys: QueryKey[]) {
		return Promise.all(queryKeys.map((queryKey) => this.invalidateQueries({ queryKey })));
	}

	updateListData<T extends Help.WithId>(args: QueryUpdaterArgs<T>) {
		const snapshot = this.getQueryData(args.queryKey);

		this.setQueryData<T[]>(args.queryKey, (prev) => {
			if (!prev) return [];
			switch (args.action) {
				case "create":
					return args.pos === "start" ? [args.data, ...prev] : [...prev, args.data];
				case "update":
					return prev.map((t) => (t.id === args.data.id ? args.data : t));
				case "remove":
					return prev.filter((t) => t.id !== args.data);
				case "replace":
					return prev.map((t) => (t.id === args.prevId ? args.data : t));
				default:
					return [];
			}
		});

		const revert = () => {
			this.setQueryData(args.queryKey, snapshot);
		};

		return revert;
	}

	failAfter(ms: number = 2000, msg?: string): Promise<never> {
		return new Promise((_, reject) => {
			setTimeout(() => reject(new Error(msg)), ms);
		});
	}
}
