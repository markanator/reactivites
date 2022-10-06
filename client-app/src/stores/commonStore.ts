import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "~/types";

const tokenName = "jwt";
export default class CommonStore {
	error: ServerError | null = null;
	token: string | null = window?.localStorage.getItem(tokenName);
	appLoaded = false;

	constructor() {
		makeAutoObservable(this);

		reaction(
			// whenever this field changes...
			() => this.token,
			// ... run this code
			(token) => {
				if (token) {
					window.localStorage.setItem(tokenName, token);
				} else {
					window.localStorage.removeItem(tokenName);
				}
			},
		);
	}

	setServerError = (error: ServerError) => {
		this.error = error;
	};

	setToken = (token: string | null) => {
		// call reaction above
		this.token = token!;
	};
	setAppLoaded = () => {
		this.appLoaded = true;
	};
}
