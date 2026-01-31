import { Help } from "@/lib/help.namespace";
import { TXT } from "@/lib/txt.namespace";
import z from "zod";

export namespace FormHelper {
	export function getErrorString<T extends Record<string, string>>(
		err: z.ZodError<T>,
		key: keyof T,
	): string | undefined {
		const errors = z.formatError(err)[key]?._errors;
		if (!errors) return undefined;
		return TXT.makeSentence(errors);
	}

	export function getErrorObject<T extends Record<string, string>>(err: z.ZodError<T>): Partial<T> {
		const { fieldErrors } = z.flattenError(err);

		const result: Partial<T> = {};

		for (const key in fieldErrors) {
			const messages = fieldErrors[key];
			if (messages && messages.length > 0) {
				result[key as keyof T] = TXT.makeSentence(messages) as T[keyof T];
			}
		}

		return result;
	}

	export function isErrored(err: string | undefined) {
		return Help.toStringBoolean(TXT.isDefined(err));
	}
}
