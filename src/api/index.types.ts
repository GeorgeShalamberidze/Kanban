import {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosPromise,
	Canceler,
} from 'axios';

export type { Canceler };

type AxiosMethods = Pick<AxiosInstance, 'get' | 'post'>;
export type WithAbortFn = AxiosMethods[keyof AxiosMethods];

export type ApiExecutor<T> = {
	(url: string, body: unknown, config: ApiRequestConfig): AxiosPromise<T>;
	(url: string, config: ApiRequestConfig): AxiosPromise<T>;
};
export type ApiExecutorArgs =
	| [string, unknown, ApiRequestConfig]
	| [string, ApiRequestConfig];

export type ApiRequestConfig = AxiosRequestConfig & {
	abort?: (cancel: Canceler) => void;
};
