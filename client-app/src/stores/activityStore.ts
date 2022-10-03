import { makeAutoObservable, runInAction } from "mobx";
import agent from "src/async/fetcher/agent";
import type { Activity } from "~/types";
import dayjs from "dayjs";
import { store } from "./store";
export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  isEditing = false;
  isLoading = false;
  isLoadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activityObj, act) => {
        const dateKey = dayjs(act.date).format("MMMM, YYYY");
        activityObj[dateKey] = activityObj[dateKey]
          ? [...activityObj[dateKey], act]
          : [act];
        return activityObj;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivities = async () => {
    this.isLoadingInitial = true;
    try {
      const activitiesFromDb = await agent.Activities.list();
      runInAction(() => {
        activitiesFromDb.forEach((act) => {
          this.addActivityToRegistry(act);
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoadingInitial(false);
    }
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
      activity.isGoing = activity.attendees!.some(
        (a) => a.username === user.username
      );
      activity.isHost = activity.hostUsername === user.username;
      activity.host = activity.attendees?.find(
        (x) => x.username === activity.hostUsername
      );
    }
    activity.date = new Date(activity.date);
    this.activityRegistry.set(activity.id, activity);
  };
  private getActivityFromRegistry = (id: string) => {
    return this.activityRegistry.get(id);
  };
  private setSelectedActivity = (activity: Activity) => {
    activity.date = new Date(activity.date);
    this.selectedActivity = activity;
  };
  clearSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  setLoadingInitial = (state: boolean) => {
    this.isLoadingInitial = state;
  };

  createActivity = async (activity: Activity) => {
    this.isLoading = true;
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.isEditing = false;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
  updateActivity = async (activity: Activity) => {
    this.isLoading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.isEditing = false;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
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
}
