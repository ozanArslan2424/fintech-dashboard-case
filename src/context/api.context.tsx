import { apiRoutes } from "@/api/api.routes";
import { AuthApi } from "@/api/auth/auth.api";
import type { AuthRefreshModel } from "@/api/auth/auth.model";
import { FinancialApi } from "@/api/financial/financial.api";
import { QueryClient } from "@/lib/query/query.client";
import { queryConfig } from "@/lib/query/query.config";
import { RequestClient } from "@/lib/request/request.client";
import { StoreClient } from "@/lib/store/store.client";
import type { StoreData } from "@/lib/store/store.types";
import { QueryClientProvider } from "@tanstack/react-query";
import { createContext, use, type PropsWithChildren } from "react";

function makeContext() {
	const storeClient = new StoreClient<StoreData>({
		accessToken: null,
		auth: null,
	});
	const requestClient = new RequestClient(storeClient, {
		// NOT: refreshToken cookie'sinde SameSite=Strict ayarı olduğu için vite.config.ts'ten proxy ayarı kullandım.
		baseURL: "/api",
		withCredentials: true,
		refreshIgnoredEndpoints: [
			apiRoutes.auth.refresh,
			// NOT: Auth isteklerinde yanlış veriler gönderildiğinde 401 dönüyor, 400 dönmeli.
			apiRoutes.auth.login,
			apiRoutes.auth.register,
			apiRoutes.auth.logout,
		],
		// NOT: Refresh token cookie'lerde saklanıyor, 3rd party cookie'ler tercih edilmemeli.
		refreshCallback: async (instance) => {
			const res = await instance.post<AuthRefreshModel["response"]>(apiRoutes.auth.refresh);
			return res.data.data.accessToken;
		},
	});
	const queryClient = new QueryClient(queryConfig);
	const authApi = new AuthApi(queryClient, requestClient, storeClient);
	const financialApi = new FinancialApi(queryClient, requestClient);

	return {
		requestClient,
		storeClient,
		queryClient,
		authApi,
		financialApi,
	};
}

const context = makeContext();

const ApiContext = createContext<typeof context>(context);

export function useApiContext() {
	const value = use(ApiContext);
	if (!value) throw new Error("ApiContext requires a provider.");
	return value;
}

export function ApiContextProvider({ children }: PropsWithChildren) {
	return (
		<QueryClientProvider client={context.queryClient}>
			<ApiContext value={context}>{children}</ApiContext>
		</QueryClientProvider>
	);
}
