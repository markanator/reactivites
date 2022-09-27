import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllActivities } from "../v1/activities.api";
import { Activity } from "../../src/app/models/activity";

export const useGetAllActivities = () => {
  const qc = useQueryClient();
  return useQuery(
    ["activites"],
    async () => {
      const { data } = await getAllActivities<Activity[]>();
      return data;
    },
    {
      onSuccess: (data) => {
        data?.forEach((act) => {
          qc.setQueryData(["activity", act?.id], act);
        });
      },
    }
  );
};
