import loadable from "@loadable/component";

export const ActivityDashboard = loadable(
  () => import("~/features/activities/dashboard/ActivityDashboard")
);
export const ActivityDetails = loadable(
  () => import("~/features/activities/details/ActivityDetails")
);
export const ActivityForm = loadable(
  () => import("~/features/activities/form/ActivityForm")
);
export const HomePage = loadable(() => import("~/features/home/HomePage"));
export const ActivitiesLayout = loadable(() => import("./ActivitiesLayout"));
