import { makeAutoObservable, runInAction } from "mobx";
import agent from "~/async/fetcher/agent";
import type { Profile } from "~/types";
import { store } from "./store";

export default class ProfileStore {
  profile: Profile | null = null;
  isLoadingProfile = false;

  constructor() {
    makeAutoObservable(this);
  }
  // computed mobx value
  get isCurrentUser() {
    if (store.userStore?.user && this.profile) {
      return store.userStore.user.username === this.profile.username;
    }
    return false;
  }

  loadProfile = async (username: string) => {
    this.isLoadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.isLoadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.isLoadingProfile = false));
    }
  };
}
