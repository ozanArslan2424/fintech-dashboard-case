import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

export interface RequestInterface {
	get: <D>(url: string, config?: AxiosRequestConfig) => Promise<D>;
	delete: <D>(url: string, config?: AxiosRequestConfig) => Promise<D>;
	head: <D>(url: string, config?: AxiosRequestConfig) => Promise<D>;
	options: <D>(url: string, config?: AxiosRequestConfig) => Promise<D>;
	post: <D, B>(url: string, body?: B, config?: AxiosRequestConfig) => Promise<D>;
	put: <D, B>(url: string, body?: B, config?: AxiosRequestConfig) => Promise<D>;
	patch: <D, B>(url: string, body?: B, config?: AxiosRequestConfig) => Promise<D>;
}

export type RequestConfig = {
	baseURL: string;
	withCredentials?: boolean;
	refreshIgnoredEndpoints: string[];
	refreshCallback: (axiosInstance: AxiosInstance) => Promise<string>;
	beforeRequest?: (config: InternalAxiosRequestConfig) => void | Promise<void>;
};

export type ErrorResponse = {
	success: false;
	message: string;
	error: string;
	code: string;
};

// NOT: Başarılı yanıt içerisinde "data" anahtarı kullanıldığında kafa karıştırıcı oluyor.
// Özellikle bazı isteklerde data içerisine isimli veri koyulurken bazılarına doğrudan
// obje geçilmiş. Yanıtların tutarlı olması için sadece data kısmı dönse daha iyi olur.
export type SuccessResponse<T> = {
	success: true;
	message: string;
	data: T;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
