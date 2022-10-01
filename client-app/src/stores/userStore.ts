import { makeAutoObservable, runInAction } from "mobx";
import agent from "~/async/fetcher/agent";
import { UserFormValues } from "~/features/users/utils";
import { User } from "~/types";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      console.log("USER FROM LOGIN", user);
      store.commonStore.setToken(user.token);
      // this.startRefreshTokenTimer(user);
      // required to mutate mobx, in async block
      runInAction(() => (this.user = user));
      window?.navigate("/activities");
    } catch (error) {
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
      throw error;
    }
  };
}
