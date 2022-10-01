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
      console.log({ user });
      // store.commonStore.setToken(user.token);
      // this.startRefreshTokenTimer(user);
      runInAction(() => (this.user = user));
      // window?.navigate("/activities");
      // store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };
}
