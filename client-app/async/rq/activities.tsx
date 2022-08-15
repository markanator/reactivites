import { useQuery } from "@tanstack/react-query";
import { getAllActivities } from "../v1/activities.api";

export const useGetAllActivities = () => {
  return useQuery(["activites"], async () => {
    const { data } = await getAllActivities();
    return data;
  });
};
