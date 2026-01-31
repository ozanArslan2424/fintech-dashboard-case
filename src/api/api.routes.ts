export const apiRoutes = {
	auth: {
		me: "/users/profile",
		login: "/users/login",
		register: "/users/register",
		logout: "/users/logout",
		refresh: "/users/refresh-token",
	},
	financial: {
		summary: "/financial/summary",
		workingCapital: "/financial/working-capital",
		wallet: "/financial/wallet",
		transactions: {
			recent: "/financial/transactions/recent",
		},
		transfers: {
			scheduled: "/financial/transfers/scheduled",
		},
	},
};
