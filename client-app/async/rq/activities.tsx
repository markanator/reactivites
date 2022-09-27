import { useQuery } from "@tanstack/react-query";
import { getAllActivities } from "../v1/activities.api";
import { Activity } from "../../src/app/models/activity";

export const useGetAllActivities = () => {
  return useQuery(["activites"], async () => {
    const { data } = await getAllActivities<Activity[]>();
    return data;
  });
};
