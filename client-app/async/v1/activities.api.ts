import axios from "../fetcher/index";

export const getAllActivities = () => {
  return axios.get("/activities");
};
