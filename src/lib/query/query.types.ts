import type { Help } from "@/lib/help.namespace";
import * as Tanstack from "@tanstack/react-query";

export type BaseModel<B = unknown, R = unknown> = {
	body: B;
	response: R;
};

export type OnMutationSuccess<
	Model extends BaseModel = {
		body: void;
		response: void;
	},
> = (res: Model["response"], body: Model["body"]) => void;

export type OnMutationError<
	Model extends BaseModel = {
		body: void;
		response: void;
	},
	E = Error,
> = (err: E, body: Model["body"]) => void;

export type OnMutationSettled<
	Model extends BaseModel = {
		body: void;
		response: void;
	},
	E = Error,
> = (res: Model["response"] | undefined, err: E | null, body: Model["body"]) => void;

export type QueryKey = Tanstack.QueryKey;

export type QueryUpdaterArgs<T extends Help.WithId> =
	| { action: "create"; queryKey: QueryKey; data: T; pos?: "start" | "end" }
	| { action: "update"; queryKey: QueryKey; data: T }
	| { action: "remove"; queryKey: QueryKey; data: T["id"] }
	| { action: "replace"; queryKey: QueryKey; data: T; prevId: T["id"] };
