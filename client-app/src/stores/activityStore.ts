import { makeAutoObservable, runInAction } from "mobx";
import agent from "src/async/fetcher/agent";
import type { Activity } from "~/app/models/activity";
import { v4 as uuid } from "uuid";
import { deleteActivity } from "~/async/v1/activities.api";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  isEditing = false;
  isLoading = false;
  isLoadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadActivities = async () => {
    try {
      const activitiesFromDb = await agent.Activities.list();
      runInAction(() => {
        activitiesFromDb.forEach((act) => {
          act.date = act.date.split("T")[0];
          this.activityRegistry.set(act.id, act);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.isLoadingInitial = state;
  };

  setSelectedAcivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
  };
  clearSelectedActivity = () => {
    this.selectedActivity = undefined;
  };
  handleOpenForm = (id?: string) => {
    id ? this.setSelectedAcivity(id) : this.clearSelectedActivity();
    this.isEditing = true;
  };
  handleCloseForm = () => {
    this.isEditing = false;
  };

  createActivity = async (activity: Activity) => {
    this.isLoading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.isEditing = false;
      });
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
        if (this.selectedActivity?.id === id) {
          this.clearSelectedActivity();
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
