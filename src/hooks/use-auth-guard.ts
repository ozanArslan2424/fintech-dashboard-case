import { useApiContext } from "@/context/api.context";
import { clientRoutes } from "@/pages/client.routes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function useAuthGuard() {
	const navigate = useNavigate();
	const { queryClient, authApi, storeClient } = useApiContext();
	const [isPending, setIsPending] = useState(true);

	useEffect(() => {
		async function init() {
			try {
				const res = await queryClient.fetchQuery(authApi.queryMe());
				storeClient.set("auth", res);
			} catch {
				await navigate(clientRoutes.login);
			} finally {
				setIsPending(false);
			}
		}

		init();
	}, [queryClient, authApi, storeClient, navigate]);

	return { isPending };
}
