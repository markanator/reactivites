/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "~/async/fetcher/agent";
import type { Photo, Profile, UserActivity } from "~/types";
import { store } from "./store";

export default class ProfileStore {
	profile: Profile | null = null;
	isLoadingProfile = false;
	isUploading = false;
	isLoading = false;
	isLoadingFollowings = false;
	followings: Profile[] = [];
	activeTab = 0;
	isLoadingActivities = false;
	userActivities: UserActivity[] = [];

	constructor() {
		makeAutoObservable(this);

		reaction(
			() => this.activeTab,
			(activeTab) => {
				if (activeTab === 3 || activeTab === 4) {
					const predicate = activeTab === 3 ? "followers" : "following";
					this.loadFollowings(predicate);
				} else {
					this.followings = [];
				}
			},
		);
	}

	setActiveTab = (activeTab: number) => {
		this.activeTab = activeTab;
	};

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

	uploadPhoto = async (file: Blob) => {
		this.isUploading = true;
		try {
			const photo = await agent.Profiles.uploadPhoto(file);
			runInAction(() => {
				if (this.profile) {
					// add to current user's photo album
					this.profile.photos?.push(photo);
					if (photo.isMain && store.userStore.user) {
						// add as main for current user
						store.userStore.setImage(photo.url);
						this.profile.image = photo.url;
					}
				}
				this.isUploading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => (this.isUploading = false));
		}
	};

	setMainPhoto = async (photo: Photo) => {
		this.isLoading = true;
		try {
			await agent.Profiles.setMainPhoto(photo.id);
			store.userStore.setImage(photo.url);
			runInAction(() => {
				if (this.profile && this.profile.photos) {
					// set current mainPhoto to false
					this.profile.photos.find((p) => p.isMain)!.isMain = false;
					// set this photo to main
					this.profile.photos.find((p) => p.id === photo.id)!.isMain = true;
					this.profile.image = photo.url;
					// done
					this.isLoading = false;
				}
			});
		} catch (error) {
			runInAction(() => (this.isLoading = false));
			console.log(error);
		}
	};

	deletePhoto = async (photo: Photo) => {
		this.isLoading = true;
		try {
			await agent.Profiles.deletePhoto(photo.id);
			runInAction(() => {
				if (this.profile) {
					this.profile.photos = this.profile.photos?.filter((p) => p.id !== photo.id);
					this.isLoading = false;
				}
			});
		} catch (error) {
			console.log(error);
			runInAction(() => (this.isLoading = false));
		}
	};

	updateProfile = async (freshProfile: Partial<Profile>) => {
		this.isLoading = true;
		try {
			await agent.Profiles.updateProfile({
				displayName: freshProfile.displayName!,
				bio: freshProfile.bio!,
			});
			runInAction(() => {
				if (
					freshProfile?.displayName &&
					freshProfile.displayName !== store.userStore.user?.displayName
				) {
					store.userStore.setDisplayName(freshProfile.displayName);
				}
				this.profile = { ...this.profile, ...(freshProfile as Profile) };
				this.isLoading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => (this.isLoading = false));
		}
	};

	updateFollowing = async (username: string, following: boolean) => {
		this.isLoading = true;
		try {
			// update in DB
			await agent.Profiles.updateFollowing(username);
			// update within activity attendees
			store.activityStore.updateAttendeeFollowing(username);
			runInAction(() => {
				if (
					this.profile &&
					this.profile.username !== store.userStore.user?.username &&
					this.profile.username === username
				) {
					// update the profile that we're viewing, other
					following ? this.profile.followersCount++ : this.profile.followersCount--;
					this.profile.following = !this.profile.following;
				}
				// update the authenticated user's follow-ers/ings
				if (this.profile && this.profile.username === store.userStore.user?.username) {
					following ? this.profile.followingCount++ : this.profile.followingCount--;
				}
				this.followings.forEach((profile) => {
					if (profile.username === username) {
						profile.following ? profile.followersCount-- : profile.followersCount++;
						profile.following = !profile.following;
					}
				});
				this.isLoading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => (this.isLoading = false));
		}
	};

	loadFollowings = async (predicate: "following" | "followers") => {
		this.isLoadingFollowings = true;
		try {
			const followings = await agent.Profiles.listFollowings(this.profile!.username, predicate);
			runInAction(() => {
				this.followings = followings;
				this.isLoadingFollowings = false;
			});
		} catch (error) {
			runInAction(() => (this.isLoadingFollowings = false));
		}
	};

	loadUserActivities = async (username: string, predicate?: string) => {
		this.isLoadingActivities = true;
		try {
			const newActivities = await agent.Profiles.listActivities(username, predicate!);
			runInAction(() => {
				this.userActivities = newActivities;
				this.isLoadingActivities = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.isLoadingActivities = false;
			});
		}
	};
}
