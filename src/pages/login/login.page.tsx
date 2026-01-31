import { FormField } from "@/components/form/form-field";
import { GoogleIcon } from "@/components/icons/google-icon";
import { UnderlineIcon } from "@/components/icons/underline-icon";
import { ErrorDisplayCard } from "@/components/layout/error-display-card";
import { FormHelper } from "@/lib/form-helper.namespace";
import { clientRoutes } from "@/pages/client.routes";
import { useLoginForm } from "@/pages/login/hooks/use-login-form";
import { Loader2Icon } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

export function LoginPage() {
	const { t, formState, handleEmailChange, handlePasswordChange, handleSubmit, isPending } =
		useLoginForm();

	function handleNotImplementedClick() {
		toast.message("This feature is not implemented.");
	}

	return (
		<div className="w-full space-y-6">
			<div className="w-full">
				<h1 className="mb-1 text-3xl font-semibold">{t("login.title")}</h1>
				<p className="text-muted-foreground text-base">{t("login.subtitle")}</p>
			</div>

			<form noValidate onSubmit={handleSubmit} className="grid w-full gap-6">
				<FormField id="email" label={t("login.email.label")} error={formState.errors.email}>
					<input
						id="email"
						name="email"
						type="email"
						required
						autoFocus
						autoComplete="email"
						placeholder="example@gmail.com"
						value={formState.email}
						onChange={handleEmailChange}
						data-error={FormHelper.isErrored(formState.errors.email)}
						disabled={isPending}
					/>
				</FormField>
				<FormField
					id="password"
					label={t("login.password.label")}
					error={formState.errors.password}
				>
					<input
						id="password"
						name="password"
						type="password"
						required
						autoComplete="current-password"
						placeholder="********"
						pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
						value={formState.password}
						onChange={handlePasswordChange}
						data-error={FormHelper.isErrored(formState.errors.password)}
						disabled={isPending}
					/>
				</FormField>

				<ErrorDisplayCard error={formState.errors._root} />

				<button type="submit" className="lg" disabled={isPending}>
					{isPending ? <Loader2Icon className="animate-spin" /> : t("login.submit")}
				</button>

				<button
					type="button"
					className="lg outlined text-foreground/70 hover:text-foreground"
					disabled={isPending}
					onClick={handleNotImplementedClick}
				>
					<GoogleIcon />
					<span>{t("login.google")}</span>
				</button>
			</form>

			<div className="group grid w-full place-items-center">
				<Link
					to={clientRoutes.register}
					className="text-muted-foreground cursor-pointer text-center text-sm transition-transform hover:scale-[1.01]"
				>
					{t("login.noAccount")}{" "}
					<span className="text-foreground relative cursor-pointer">
						{t("login.register")}
						<span className="absolute -bottom-3 left-0 transition-transform group-hover:-translate-y-1">
							<UnderlineIcon />
						</span>
					</span>
				</Link>
			</div>
		</div>
	);
}
