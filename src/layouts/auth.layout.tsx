import { AppIcon } from "@/components/layout/app-icon";
import { useApiContext } from "@/context/api.context";
import { clientRoutes } from "@/pages/client.routes";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export function AuthLayout() {
	const navigate = useNavigate();
	const { queryClient, authApi, storeClient } = useApiContext();

	useEffect(() => {
		async function init() {
			try {
				const res = await queryClient.fetchQuery(authApi.queryMe());
				storeClient.set("auth", res);
				await navigate(clientRoutes.dashboard);
			} catch {}
		}

		init();
	}, [queryClient, authApi, storeClient, navigate]);

	return (
		<div className="grid min-h-screen md:grid-cols-12">
			<div className="md:col-span-7">
				<header className="px-6 pt-6 md:mx-auto md:max-w-md md:px-0 md:pt-10">
					<AppIcon />
				</header>

				<div className="my-6 h-[180px] w-full overflow-hidden md:hidden">
					<img src="/auth-img.png" alt="decoration" className="-mt-60 h-auto w-full md:hidden" />
				</div>

				{/* header ile birlikte merkeze almak için negatif margin */}
				<div className="grid place-items-center px-6 md:mx-auto md:-mt-16 md:h-full md:max-w-md md:px-0">
					<Outlet />
				</div>
			</div>

			<div className="col-span-5 hidden bg-[url('/auth-img.png')] bg-cover bg-center md:block"></div>
		</div>
	);
}
