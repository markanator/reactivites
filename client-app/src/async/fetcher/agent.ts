import { AxiosResponse } from "axios";
import { UserFormValues } from "~/features/users/utils";
import { Activity, User } from "~/types";
import axios from "./index";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: (params?: URLSearchParams) =>
    axios.get<Activity[]>("/activities", { params }).then(responseBody),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post<void>("/activities", activity),
  update: (activity: Activity) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
  // fbLogin: (accessToken: string) => requests
  //     .post<User>(`/account/fbLogin?accessToken=${accessToken}`, {}),
  // refreshToken: () => requests.post<User>('/account/refreshToken', {}),
  // verifyEmail: (token: string, email: string) =>
  //     requests.post<void>(`/account/verifyEmail?token=${token}&email=${email}`, {}),
  // resendEmailConfirm: (email: string) =>
  //     requests.get(`/account/resendEmailConfirmationLink?email=${email}`)
};

const agent = {
  Activities,
  Account,
};

export default agent;
