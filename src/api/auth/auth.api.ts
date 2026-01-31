import { apiRoutes } from "@/api/api.routes";
import type {
	AuthenticatedData,
	AuthLoginModel,
	AuthLogoutModel,
	AuthMeModel,
	AuthRegisterModel,
} from "@/api/auth/auth.model";
import type { QueryClient } from "@/lib/query/query.client";
import type { OnMutationSettled } from "@/lib/query/query.types";
import type { RequestClient } from "@/lib/request/request.client";
import type { StoreClient } from "@/lib/store/store.client";
import type { StoreData } from "@/lib/store/store.types";
import { clientRoutes } from "@/pages/client.routes";

export class AuthApi {
	constructor(
		private readonly queryClient: QueryClient,
		private readonly requestClient: RequestClient,
		private readonly storeClient: StoreClient<StoreData>,
	) {}

	private setAuthenticatedData(data: AuthenticatedData) {
		this.storeClient.set("accessToken", data.accessToken);
	}

	fetchMe = () => this.requestClient.get(apiRoutes.auth.me);

	queryMe = () =>
		this.queryClient.makeQuery<AuthMeModel["response"]>({
			queryKey: [apiRoutes.auth.me],
			queryFn: () => this.requestClient.get(apiRoutes.auth.me),
		});

	login = (onSettled?: OnMutationSettled<AuthLoginModel>) =>
		this.queryClient.makeMutation<AuthLoginModel>({
			mutationFn: (body) => this.requestClient.post(apiRoutes.auth.login, body),
			onSettled: (res, err, body) => {
				if (res !== undefined) {
					this.setAuthenticatedData({
						accessToken: res.data.accessToken,
					});
					this.queryClient.clear();
				}
				onSettled?.(res, err, body);
			},
		});

	register = (onSettled?: OnMutationSettled<AuthRegisterModel>) =>
		this.queryClient.makeMutation<AuthRegisterModel>({
			mutationFn: (body) => this.requestClient.post(apiRoutes.auth.register, body),
			onSettled,
		});

	logout = (onSettled?: OnMutationSettled<AuthLogoutModel>) =>
		this.queryClient.makeMutation<AuthLogoutModel>({
			mutationFn: () => this.requestClient.post(apiRoutes.auth.logout),
			onSettled: (res, err, body) => {
				if (err === null) {
					this.setAuthenticatedData({
						accessToken: null,
					});
					this.queryClient.clear();
					window.location.href = clientRoutes.login;
				}
				onSettled?.(res, err, body);
			},
		});
}
