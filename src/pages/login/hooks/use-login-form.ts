import { useApiContext } from "@/context/api.context";
import { useLanguage } from "@/hooks/use-language";
import { FormHelper } from "@/lib/form-helper.namespace";
import { translate } from "@/lib/locale/locale.config";
import { RequestHelper } from "@/lib/request-helper.namespace";
import { clientRoutes } from "@/pages/client.routes";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useReducer } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import z from "zod";

// NOT: normalde formlar için native FormData dışında bir state kullanmam
// talimatlarda yazdığı için useReducer kullandım.

type State = {
	email: string;
	password: string;
	errors: {
		_root?: string;
		email?: string;
		password?: string;
	};
};

type Action =
	| { type: "email"; payload: State["email"] }
	| { type: "password"; payload: State["password"] }
	| { type: "set_errors"; payload: State["errors"] }
	| { type: "add_errors"; payload: Partial<State["errors"]> }
	| { type: "clear_errors" };

const initialState: State = {
	email: "ozanarslanodtu@gmail.com",
	password: "123456789Aa",
	errors: {},
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "email":
			return { ...state, email: action.payload };
		case "password":
			return { ...state, password: action.payload };
		case "set_errors":
			return { ...state, errors: action.payload };
		case "add_errors":
			return { ...state, errors: { ...state.errors, ...action.payload } };
		case "clear_errors": {
			return { ...state, errors: initialState.errors };
		}
		default:
			return initialState;
	}
};

// NOT: Swagger'da bütün hata durumları verilmemiş denk geldiklerime göre yaptım.
const LoginFormSchema = z.object({
	email: z.email(translate("login.email.error")),
	password: z
		.string()
		.min(8, translate("login.password.error.length"))
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, translate("login.password.error.regex")),
});

export function useLoginForm() {
	const { t } = useLanguage("auth");
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { authApi, storeClient } = useApiContext();
	const [formState, dispatch] = useReducer(reducer, initialState);
	const loginMutation = useMutation(
		authApi.login((res, err) => {
			if (res !== undefined) {
				storeClient.set("auth", res.data.user);
				navigate(clientRoutes.dashboard);
				toast.success(t("login.success"));
			} else {
				toast.error(t("login.error"));
				dispatch({ type: "set_errors", payload: { _root: RequestHelper.getApiError(err) } });
			}
		}),
	);

	useEffect(() => {
		const email = searchParams.get("email");
		if (email) {
			dispatch({ type: "email", payload: email });
			toast.success(t("register.success"));
		}
	}, [searchParams, t]);

	function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		const payload = e.target.value;
		dispatch({ type: "email", payload });
		const result = LoginFormSchema.pick({ email: true }).safeParse({
			email: payload,
		});
		if (result.error) {
			dispatch({
				type: "add_errors",
				payload: { email: FormHelper.getErrorString(result.error, "email") },
			});
			return;
		}
		dispatch({ type: "add_errors", payload: { email: "" } });
	}

	function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		const payload = e.target.value;
		dispatch({ type: "password", payload });
		const result = LoginFormSchema.pick({ password: true }).safeParse({
			password: payload,
		});
		if (result.error) {
			dispatch({
				type: "add_errors",
				payload: { password: FormHelper.getErrorString(result.error, "password") },
			});
			return;
		}
		dispatch({ type: "add_errors", payload: { password: "" } });
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = {
			email: formState.email,
			password: formState.password,
		};
		const result = LoginFormSchema.safeParse(data);
		if (result.error) {
			dispatch({
				type: "set_errors",
				payload: FormHelper.getErrorObject(result.error),
			});
			return;
		}
		dispatch({ type: "clear_errors" });
		loginMutation.mutate(data);
	}

	return {
		t,
		formState,
		handleEmailChange,
		handlePasswordChange,
		handleSubmit,
		isPending: loginMutation.isPending,
	};
}
