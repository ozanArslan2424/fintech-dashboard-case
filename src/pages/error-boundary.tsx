import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { useLanguage } from "@/hooks/use-language";
import { clientRoutes } from "@/pages/client.routes";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function ErrorBoundary() {
	const { t } = useLanguage("common");
	const error = useRouteError();
	const isNotFound = isRouteErrorResponse(error) && error.status === 404;
	const title = t("error");
	const description = isNotFound
		? "404 | Not Found"
		: typeof error === "string"
			? error
			: error instanceof Error
				? error.message
				: "Unknown Error";

	return (
		<>
			<title>{t("app")} - Error</title>
			<div className="flex min-h-screen w-full items-center justify-center">
				<Card className="mx-auto max-w-lg">
					<CardHeader className="flex-col items-start justify-start gap-2">
						<CardTitle>{title}</CardTitle>
						<p>{description}</p>
					</CardHeader>
					<div className="py-3">
						<Link className="button" to={clientRoutes.dashboard}>
							{t("back")}
						</Link>
					</div>
				</Card>
			</div>
		</>
	);
}
