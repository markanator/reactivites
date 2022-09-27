import axios from "../fetcher/index";

export const getAllActivities = <T>() => {
  return axios.get<T>("/activities");
};
