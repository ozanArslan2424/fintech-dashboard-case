import type { SuccessResponse } from "@/lib/request/request.types";

export type AuthenticatedData = {
	accessToken: string | null;
};

export type AuthUser = {
	id: string;
	fullName: string;
	email: string;
	role: string;
	isActive: boolean;
	lastLoginAt: string;
	lastLoginIP: string;
	createdAt: string;
	updatedAt: string;
};

export type AuthMeModel = {
	body: void;
	response: SuccessResponse<AuthUser>;
};

export type AuthLoginModel = {
	body: {
		email: string;
		password: string;
	};
	response: SuccessResponse<{
		user: AuthUser;
		accessToken: string;
	}>;
};

export type AuthRegisterModel = {
	body: {
		fullName: string;
		email: string;
		password: string;
	};
	response: SuccessResponse<Pick<AuthUser, "id" | "fullName" | "email">>;
};

export type AuthRefreshModel = {
	body: void;
	response: SuccessResponse<{
		accessToken: string;
	}>;
};

export type AuthLogoutModel = {
	body: void;
	response: void;
};
