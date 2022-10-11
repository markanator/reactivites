import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "src/async/fetcher/agent";
import type { Activity, PaginationHeader, User } from "~/types";
import dayjs from "dayjs";
import { store } from "./store";
import Profile from "~/lib/Profile";
import { ActivityFormValues } from "~/lib/ActivityFormValues";
import { Activity as ActivityClass } from "~/lib/Activity";
import { PaginationParams } from "~/lib/PaginationParams";
export default class ActivityStore {
	activityRegistry = new Map<string, Activity>();
	selectedActivity: Activity | undefined = undefined;
	isEditing = false;
	isLoading = false;
	isLoadingInitial = false;
	//  pagination support
	pagination: PaginationHeader | null = null;
	pagingParams = new PaginationParams();
	predicate = new Map().set("all", true);

	constructor() {
		makeAutoObservable(this);

		reaction(
			() => this.predicate.keys(),
			() => {
				// reset always
				this.pagingParams = new PaginationParams();
				this.activityRegistry.clear();
				this.loadActivities();
			},
		);
	}

	setPagingParams = (paginationParams: PaginationParams) => {
		this.pagingParams = paginationParams;
	};

	get axiosParams() {
		const params = new URLSearchParams();
		params.append("pageNumber", this.pagingParams.pageNumber.toString());
		params.append("pageSize", this.pagingParams.pageSize.toString());

		this.predicate.forEach((val, key) => {
			if (key === "startDate") {
				params.append(key, (val as Date).toISOString());
			} else {
				params.append(key, val);
			}
		});

		return params;
	}

	setPredicate = (pred: string, value: string | Date) => {
		const resetPredicate = () => {
			this.predicate.forEach((_v, key) => {
				if (key !== "startDate") this.predicate.delete(key);
			});
		};
		switch (pred) {
			case "all":
				resetPredicate();
				this.predicate.set("all", "true");
				break;
			case "isGoing":
				resetPredicate();
				this.predicate.set("isGoing", "true");
				break;
			case "isHost":
				resetPredicate();
				this.predicate.set("isHost", "true");
				break;
			case "startDate":
				resetPredicate();
				this.predicate.delete("startDate");
				this.predicate.set("startDate", value);
				break;
			default:
				break;
		}
	};

	get activitiesByDate() {
		return Array.from(this.activityRegistry.values()).sort(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			(a, b) => a.date!.getTime() - b.date!.getTime(),
		);
	}

	get groupedActivities() {
		return Object.entries(
			this.activitiesByDate.reduce((activityObj, act) => {
				const dateKey = dayjs(act.date).format("MMMM, YYYY");
				activityObj[dateKey] = activityObj[dateKey] ? [...activityObj[dateKey], act] : [act];
				return activityObj;
			}, {} as { [key: string]: Activity[] }),
		);
	}

	loadActivities = async () => {
		this.isLoadingInitial = true;
		try {
			const results = await agent.Activities.list(this.axiosParams);
			runInAction(() => {
				results.data.forEach((act) => {
					this.addActivityToRegistry(act);
				});
			});
			this.setPagination(results.pagination);
		} catch (error) {
			console.error(error);
		} finally {
			this.setLoadingInitial(false);
		}
	};

	setPagination = (pagination: PaginationHeader) => {
		this.pagination = pagination;
	};

	loadActivityFromId = async (id: string) => {
		let activity = this.getActivityFromRegistry(id);
		if (activity) {
			this.selectedActivity = activity;
			return activity;
		} else {
			this.isLoadingInitial = true;
			try {
				activity = await agent.Activities.details(id);
				this.addActivityToRegistry(activity);
				this.setSelectedActivity(activity);
				this.setLoadingInitial(false);
				return activity;
			} catch (error) {
				console.error(error);
				this.setLoadingInitial(false);
			}
		}
	};

	private addActivityToRegistry = (activity: Activity) => {
		const user = store.userStore.user;
		if (user) {
			activity.isGoing = activity.attendees.some((a) => a.username === user.username);
			activity.isHost = activity.hostUsername === user.username;
			activity.host = activity.attendees?.find((x) => x.username === activity.hostUsername);
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		activity.date = new Date(activity.date!);
		this.activityRegistry.set(activity.id, activity);
	};
	private getActivityFromRegistry = (id: string) => {
		return this.activityRegistry.get(id);
	};
	private setSelectedActivity = (activity: Activity) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		activity.date = new Date(activity.date!);
		this.selectedActivity = activity;
	};
	clearSelectedActivity = () => {
		this.selectedActivity = undefined;
	};

	setLoadingInitial = (state: boolean) => {
		this.isLoadingInitial = state;
	};

	createActivity = async (activity: ActivityFormValues) => {
		const user = store.userStore.user as User;
		const attendee = new Profile(user);
		try {
			await agent.Activities.create(activity);
			const tempActivity = new ActivityClass(activity);
			tempActivity.hostUsername = user.username;
			tempActivity.attendees = [attendee];
			this.addActivityToRegistry(tempActivity);
			runInAction(() => {
				this.selectedActivity = tempActivity;
			});
		} catch (error) {
			console.error(error);
		}
	};
	updateActivity = async (activity: ActivityFormValues) => {
		try {
			await agent.Activities.update(activity);
			runInAction(() => {
				if (activity?.id) {
					const updatedActivity = {
						...this.getActivityFromRegistry(activity.id),
						...activity,
					};
					this.activityRegistry.set(activity.id, updatedActivity as Activity);
					this.selectedActivity = updatedActivity as Activity;
				}
			});
		} catch (error) {
			console.error(error);
		}
	};
	deleteActivity = async (id: string) => {
		this.isLoading = true;
		try {
			await agent.Activities.delete(id);
			runInAction(() => {
				this.activityRegistry.delete(id);
			});
		} catch (error) {
			console.error(error);
		} finally {
			runInAction(() => {
				this.isLoading = false;
			});
		}
	};

	updateAttendance = async () => {
		const user = store.userStore.user;
		this.isLoading = true;
		try {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			await agent.Activities.attend(this.selectedActivity!.id);
			runInAction(() => {
				// already going, filter them out
				if (this.selectedActivity?.isGoing) {
					this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(
						(a) => a.username !== user?.username,
					);
					this.selectedActivity.isGoing = false;
				} else {
					// not going, add them in
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					const attendee = new Profile(user!);
					this.selectedActivity?.attendees?.push(attendee);
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					this.selectedActivity!.isGoing = true;
				}
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
			});
		} catch (error) {
			console.log(error);
		} finally {
			runInAction(() => (this.isLoading = false));
		}
	};

	cancelActivityToggle = async () => {
		this.isLoading = true;
		try {
			// backend takes care of host cancelling logic
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			await agent.Activities.attend(this.selectedActivity!.id);
			runInAction(() => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
			});
		} catch (error) {
			console.error(error);
		} finally {
			runInAction(() => (this.isLoading = false));
		}
	};

	updateAttendeeFollowing = (username: string) => {
		this.activityRegistry.forEach((activity) => {
			activity.attendees.forEach((attendee) => {
				if (attendee.username === username) {
					// decrement following, increment followers
					attendee.following ? attendee.followersCount-- : attendee.followersCount++;
					// set as opposite
					attendee.following = !attendee.following;
				}
			});
		});
	};
}
