import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createActivity,
  deleteActivity,
  getActivityById,
  getAllActivities,
  updateActivity,
} from "../v1/activities.api";
import { Activity } from "../../src/app/models/activity";

const activityKeys = {
  all: ["activities"] as const,
  lists: () => [...activityKeys.all, "list"] as const,
  list: (filters: string) => [...activityKeys.lists(), { filters }] as const,
  details: () => [...activityKeys.all, "detail"] as const,
  detail: (id: string) => [...activityKeys.details(), id] as const,
};

export const useGetAllActivities = () => {
  const qc = useQueryClient();
  return useQuery(
    activityKeys.all,
    async () => {
      const { data } = await getAllActivities<Activity[]>();
      return data;
    },
    {
      onSuccess: (data) => {
        data?.forEach((act) => {
          qc.setQueryData(activityKeys.detail(act.id), act);
        });
      },
    }
  );
};

export const useGetActivityById = (id: string) => {
  return useQuery(
    activityKeys.detail(id),
    async () => {
      const { data } = await getActivityById<Activity>(id);
      return data;
    },
    {
      enabled: !!id,
    }
  );
};

export const useCreateActivity = () => {
  const qc = useQueryClient();
  return useMutation(async (vars: Activity) => createActivity<void>(vars), {
    onSuccess: (_data, _vars, _ctx) => {
      qc.invalidateQueries(activityKeys.all);
    },
  });
};

export const useEditActivity = () => {
  const qc = useQueryClient();
  return useMutation(async (vars: Activity) => updateActivity<void>(vars), {
    onSuccess: (_data, _vars, _ctx) => {
      qc.invalidateQueries(activityKeys.all);
    },
  });
};

export const useDeleteActivity = () => {
  const qc = useQueryClient();
  return useMutation(async (vars: string) => deleteActivity<void>(vars), {
    onSuccess: (_data, _vars, _ctx) => {
      qc.invalidateQueries(activityKeys.all);
    },
  });
};
