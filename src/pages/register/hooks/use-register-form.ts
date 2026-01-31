import { useApiContext } from "@/context/api.context";
import { useLanguage } from "@/hooks/use-language";
import { FormHelper } from "@/lib/form-helper.namespace";
import { translate } from "@/lib/locale/locale.config";
import { RequestHelper } from "@/lib/request-helper.namespace";
import { clientRoutes } from "@/pages/client.routes";
import { useMutation } from "@tanstack/react-query";
import { useReducer } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

// NOT: normalde formlar için native FormData dışında bir state kullanmam
// talimatlarda yazdığı için useReducer kullandım.

type State = {
	fullName: string;
	email: string;
	password: string;
	errors: {
		_root?: string;
		fullName?: string;
		email?: string;
		password?: string;
	};
};

type Action =
	| { type: "fullName"; payload: State["fullName"] }
	| { type: "email"; payload: State["email"] }
	| { type: "password"; payload: State["password"] }
	| { type: "set_errors"; payload: State["errors"] }
	| { type: "add_errors"; payload: Partial<State["errors"]> }
	| { type: "clear_errors" };

const initialState: State = {
	fullName: "",
	email: "",
	password: "",
	errors: {},
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "fullName":
			return { ...state, fullName: action.payload };
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
const RegisterFormSchema = z.object({
	fullName: z
		.string()
		.min(1, translate("register.fullName.length"))
		.refine(
			(value) => {
				const validPattern = /^[A-Za-z\s\-']+$/;
				if (!validPattern.test(value)) {
					return false;
				}
				const words = value
					.trim()
					.split(/\s+/)
					.filter((word) => word.length > 0);
				return words.length >= 2;
			},
			{ error: translate("register.fullName.chars") },
		),
	email: z.email(translate("register.email.error")),
	password: z
		.string()
		.min(8, translate("register.password.error.length"))
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, translate("register.password.error.regex")),
});

export function useRegisterForm() {
	const { t } = useLanguage("auth");
	const navigate = useNavigate();
	const { authApi } = useApiContext();
	const [formState, dispatch] = useReducer(reducer, initialState);
	const registerMutation = useMutation(
		authApi.register((res, err) => {
			if (res !== undefined) {
				navigate(`${clientRoutes.login}?email=${res.data.email}`);
				toast.success(t("register.success"));
			} else {
				toast.error(t("register.error"));
				dispatch({ type: "set_errors", payload: { _root: RequestHelper.getApiError(err) } });
			}
		}),
	);

	function handleFullNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		const payload = e.target.value;
		dispatch({ type: "fullName", payload });
		const result = RegisterFormSchema.pick({ fullName: true }).safeParse({
			fullName: payload,
		});
		if (result.error) {
			dispatch({
				type: "add_errors",
				payload: { fullName: FormHelper.getErrorString(result.error, "fullName") },
			});
			return;
		}
		dispatch({ type: "add_errors", payload: { fullName: "" } });
	}

	function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		const payload = e.target.value;
		dispatch({ type: "email", payload });
		const result = RegisterFormSchema.pick({ email: true }).safeParse({
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
		const result = RegisterFormSchema.pick({ password: true }).safeParse({
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
			fullName: formState.fullName,
			email: formState.email,
			password: formState.password,
		};
		const result = RegisterFormSchema.safeParse(data);
		if (result.error) {
			dispatch({
				type: "set_errors",
				payload: FormHelper.getErrorObject(result.error),
			});
			return;
		}
		dispatch({ type: "clear_errors" });
		registerMutation.mutate(data);
	}

	return {
		t,
		formState,
		handleFullNameChange,
		handleEmailChange,
		handlePasswordChange,
		handleSubmit,
		isPending: registerMutation.isPending,
	};
}
