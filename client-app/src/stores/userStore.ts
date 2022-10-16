import { makeAutoObservable, runInAction } from "mobx";
import agent from "~/async/fetcher/agent";
import { UserFormValues } from "~/features/users/utils";
import { User } from "~/types";
import { store } from "./store";

export default class UserStore {
	user: User | null = null;
	fbAccessToken: string | null = null;
	isLoadingFacebook = false;

	constructor() {
		makeAutoObservable(this);
	}
	get isLoggedIn() {
		return !!this.user;
	}

	login = async (creds: UserFormValues) => {
		try {
			const user = await agent.Account.login(creds);
			store.commonStore.setToken(user.token);
			// this.startRefreshTokenTimer(user);
			// required to mutate mobx, in async block
			runInAction(() => (this.user = user));
			window?.navigate("/activities");
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	logout = () => {
		store.commonStore.setToken(null);
		window.localStorage.removeItem("jwt");
		this.user = null;
		window?.navigate("/");
	};

	getUser = async () => {
		try {
			const user = await agent.Account.current();
			store.commonStore.setToken(user.token);
			runInAction(() => (this.user = user));
			// this.startRefreshTokenTimer(user);
		} catch (error) {
			console.log(error);
		}
	};

	register = async (creds: UserFormValues) => {
		try {
			await agent.Account.register(creds);
			window?.navigate(`/account/registerSuccess?email=${creds.email}`);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	setImage = (image: string) => {
		if (this.user) this.user.image = image;
	};
	setDisplayName = (name: string) => {
		if (this.user) this.user.displayName = name;
	};

	getFacebookLoginStatus = async () => {
		window.FB.getLoginStatus((res: any) => {
			if (res.status === "connected") {
				this.fbAccessToken = res.authResponse.accessToken;
			}
		});
	};

	facebookLogin = () => {
		this.isLoadingFacebook = true;
		const apiLogin = (accessToken: string) => {
			agent.Account.fbLogin(accessToken)
				.then((user) => {
					store.commonStore.setToken(user.token);
					runInAction(() => {
						this.user = user;
						this.isLoadingFacebook = false;
					});
					window.navigate("/activities");
				})
				.catch((err) => {
					console.log(err);
					runInAction(() => {
						this.isLoadingFacebook = false;
					});
				});
		};
		if (this.fbAccessToken) {
			apiLogin(this.fbAccessToken);
		} else {
			window.FB.login(
				(response: any) => {
					if (response.authResponse) {
						apiLogin(response.authResponse.accessToken);
					}
				},
				{ scope: "public_profile,email" },
			);
		}
	};
}
