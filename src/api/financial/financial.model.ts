import type { SuccessResponse } from "@/lib/request/request.types";

export type Transaction = {
	id: string;
	name: string;
	business: string;
	image: string;
	type: string;
	amount: number;
	currency: string;
	date: string;
	status: string;
};

export type Daum = {
	month: string;
	income: number;
	expense: number;
	net: number;
};

export type Transfer = {
	id: string;
	name: string;
	image: string;
	date: string;
	amount: number;
	currency: string;
	status: string;
};

export type WalletCard = {
	id: string;
	name: string;
	type: string;
	cardNumber: string;
	bank: string;
	network: string;
	expiryMonth: number;
	expiryYear: number;
	color: string;
	isDefault: boolean;
};

export type SummaryModel = {
	response: SuccessResponse<{
		totalBalance: {
			amount: number;
			currency: string;
			change: {
				percentage: number;
				trend: string;
			};
		};
		totalExpense: {
			amount: number;
			currency: string;
			change: {
				percentage: number;
				trend: string;
			};
		};
		totalSavings: {
			amount: number;
			currency: string;
			change: {
				percentage: number;
				trend: string;
			};
		};
		lastUpdated: string;
	}>;
};

export type RecentTransactionsModel = {
	response: SuccessResponse<{
		transactions: Transaction[];
		summary: {
			totalIncome: number;
			totalExpense: number;
			count: number;
		};
	}>;
	query: {
		limit?: number;
	};
};

export type WorkingCapitalModel = {
	response: SuccessResponse<{
		period: string;
		currency: string;
		data: Daum[];
		summary: {
			totalIncome: number;
			totalExpense: number;
			netBalance: number;
		};
	}>;
};

export type ScheduledTransfersModel = {
	response: SuccessResponse<{
		transfers: Transfer[];
		summary: {
			totalScheduledAmount: number;
			count: number;
		};
	}>;
};

export type WalletModel = {
	response: SuccessResponse<{
		cards: WalletCard[];
	}>;
};
