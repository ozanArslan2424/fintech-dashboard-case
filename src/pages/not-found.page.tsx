import { useLanguage } from "@/hooks/use-language";
import { clientRoutes } from "@/pages/client.routes";
import { Link, useLocation } from "react-router";

export function NotFoundPage() {
	const { t } = useLanguage("common");
	const location = useLocation();

	return (
		<>
			<title>{t("app")} - Error</title>
			<div className="bg-muted absolute top-1/2 left-1/2 flex -translate-1/2 overflow-hidden rounded-xl">
				<div className="h-full w-full flex-1 gap-4 bg-transparent px-6 py-4">
					<h1 className="mb-8 text-2xl font-bold">{location.pathname} adresi boş bırakıldı</h1>
					<Link className="button w-max" to={clientRoutes.dashboard}>
						<span>Vaka çalışması sayfasına git</span>
					</Link>
				</div>
			</div>
		</>
	);
}
