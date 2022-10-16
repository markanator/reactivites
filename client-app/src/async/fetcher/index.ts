import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { PaginationResults } from "~/lib/PaginationResults";
import { store } from "~/stores/store";
import { sleep } from "../../utils/sleeper";

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use((config: AxiosRequestConfig<unknown>) => {
	const token = store.commonStore.token;
	if (token) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		config.headers!.authorization = `Bearer ${token}`;
	}

	return config;
});

instance.interceptors.response.use(
	async (res) => {
		try {
			if (import.meta.env.DEV) await sleep();
			const pagination = res.headers["pagination"];
			if (pagination) {
				res.data = new PaginationResults(res.data, JSON.parse(pagination));
				return res as AxiosResponse<PaginationResults<unknown>>;
			}
			return res;
		} catch (err) {
			console.warn(err);
			return await Promise.reject(err);
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(err: AxiosError<any>) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const { data, status, config, headers } = err.response!;
		switch (status) {
			case 400:
				if (typeof data === "string") {
					window?.toast({
						status: "error",
						title: "Bad request, try again later.",
						position: "bottom-right",
					});
				}
				// eslint-disable-next-line no-prototype-builtins
				if (config.method === "get" && data?.errors.hasOwnProperty("id")) {
					window?.navigate("/not-found");
				}
				if (data?.errors) {
					const modalStateError = [];
					for (const key in data?.errors) {
						if (data.errors[key]) {
							modalStateError.push(data.errors[key]);
						}
					}
					throw modalStateError.flat();
				}
				break;
			case 401:
				if (
					status === 401 &&
					headers["www-authenticate"]?.startsWith('Bearer error="invalid_token"')
				) {
					store.userStore.logout();
					window?.toast({
						status: "error",
						title: "Session expired - please login",
						position: "bottom-right",
					});
				}
				break;
			case 404:
				window?.navigate("/not-found");
				break;
			case 500:
				store.commonStore.setServerError(data);
				window?.navigate("/server-error");
				break;
		}
		return Promise.reject(err);
	},
);

export default instance;
