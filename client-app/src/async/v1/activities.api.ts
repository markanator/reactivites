import { Activity } from "~/types";
import axios from "../fetcher/index";

export const getAllActivities = <T>() => {
  return axios.get<T>("/activities");
};

export const getActivityById = <T>(id: string) => {
  return axios.get<T>(`/activities/${id}`);
};

export const createActivity = <T>(data: Activity) => {
  return axios.post<T>("/activities", data);
};

export const updateActivity = <T>(data: Activity) => {
  return axios.put<T>(`/activities/${data.id}`, data);
};

export const deleteActivity = <T>(id: string) => {
  return axios.delete<T>(`/activities/${id}`);
};
