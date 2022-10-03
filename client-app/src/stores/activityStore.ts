import { makeAutoObservable, runInAction } from "mobx";
import agent from "src/async/fetcher/agent";
import type { Activity, User } from "~/types";
import dayjs from "dayjs";
import { store } from "./store";
import Profile from "~/lib/Profile";
import { ActivityFormValues } from "~/lib/ActivityFormValues";
import { Activity as ActivityClass } from "~/lib/Activity";
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
      (a, b) => a.date!.getTime() - b.date!.getTime()
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
    activity.date = new Date(activity.date!);
    this.activityRegistry.set(activity.id, activity);
  };
  private getActivityFromRegistry = (id: string) => {
    return this.activityRegistry.get(id);
  };
  private setSelectedActivity = (activity: Activity) => {
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
          let updatedActivity = {
            ...this.getActivityFromRegistry(activity.id),
            ...activity,
          };
          this.activityRegistry.set(activity.id!, updatedActivity as Activity);
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
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        // already going, filter them out
        if (this.selectedActivity?.isGoing) {
          this.selectedActivity.attendees =
            this.selectedActivity.attendees?.filter(
              (a) => a.username !== user?.username
            );
          this.selectedActivity.isGoing = false;
        } else {
          // not going, add them in
          const attendee = new Profile(user!);
          this.selectedActivity?.attendees?.push(attendee);
          this.selectedActivity!.isGoing = true;
        }
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  };
}
