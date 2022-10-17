import { AxiosRequestConfig, AxiosResponse } from "axios";
import { UserFormValues } from "~/features/users/utils";
import { ActivityFormValues } from "~/lib/ActivityFormValues";
import { PaginationResults } from "~/lib/PaginationResults";
import { Activity, Photo, Profile, User, UserActivity } from "~/types";
import axios from "./index";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
// base requests
const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: unknown = {}, config: AxiosRequestConfig<unknown> = {}) =>
		axios.post<T>(url, body, config).then(responseBody),
	put: <T>(url: string, body: unknown = {}) => axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
	list: (params?: URLSearchParams) =>
		axios.get<PaginationResults<Activity[]>>("/activities", { params }).then(responseBody),
	details: (id: string) => requests.get<Activity>(`/activities/${id}`),
	create: (activity: ActivityFormValues) => requests.post<void>("/activities", activity),
	update: (activity: ActivityFormValues) =>
		requests.put<void>(`/activities/${activity.id}`, activity),
	delete: (id: string) => requests.del<void>(`/activities/${id}`),
	attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {}),
};

const Account = {
	current: () => requests.get<User>("/account"),
	login: (user: UserFormValues) => requests.post<User>("/account/login", user),
	register: (user: UserFormValues) => requests.post<User>("/account/register", user),
	fbLogin: (accessToken: string) =>
		requests.post<User>(`/account/fbLogin?accessToken=${accessToken}`, {}),
	refreshToken: () => requests.post<User>("/account/refresh", {}),
	verifyEmail: (token: string, email: string) =>
		requests.post<void>(`/account/verifyEmail?token=${token}&email=${email}`, {}),
	resendEmailConfirm: (email: string) =>
		requests.get<void>(`/account/resendEmailConfirmationLink?email=${email}`),
};

const Profiles = {
	get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
	uploadPhoto: (file: Blob) => {
		const formData = new FormData();
		formData.append("File", file);
		return requests.post<Photo>("photos", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
	},
	setMainPhoto: (id: string) => requests.post<void>(`/photos/${id}/setMain`, {}),
	deletePhoto: (id: string) => requests.del<void>(`/photos/${id}`),
	updateProfile: (profile: Pick<Profile, "bio" | "displayName">) =>
		requests.put<void>(`/profiles`, profile),
	updateFollowing: (username: string) => requests.post<void>(`/follow/${username}`, {}),
	listFollowings: (username: string, predicate: string) =>
		requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
	listActivities: (username: string, predicate: string) =>
		requests.get<UserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`),
};

const agent = {
	Activities,
	Account,
	Profiles,
};

export default agent;
