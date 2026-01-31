import type { AuthUser } from "@/api/auth/auth.model";

export type StoreData = {
	accessToken: string | null;
	auth: AuthUser | null;
};
