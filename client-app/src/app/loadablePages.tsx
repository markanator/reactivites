import loadable from "@loadable/component";
import ScreenLoading from "~/components/ScreenLoading";
// PUBLIC
export const HomePage = loadable(() => import("~/features/home/HomePage"), {
	fallback: <ScreenLoading />,
});
export const App = loadable(() => import("~/app/App"), {
	fallback: <ScreenLoading />,
});

// ACTIVITES
export const ActivitiesLayout = loadable(() => import("~/Layouts/ActivitiesLayout"), {
	fallback: <ScreenLoading />,
});
export const ActivityDashboard = loadable(
	() => import("~/features/activities/dashboard/ActivityDashboard"),
	{
		fallback: <ScreenLoading />,
	},
);
export const ActivityDetails = loadable(
	() => import("~/features/activities/details/ActivityDetails"),
	{
		fallback: <ScreenLoading />,
	},
);
export const ActivityForm = loadable(() => import("~/features/activities/form/ActivityForm"), {
	fallback: <ScreenLoading />,
});
// PROFILES
export const ProfilePage = loadable(() => import("~/features/profiles/ProfilePage"), {
	fallback: <ScreenLoading />,
});

// AUTH FORMS
export const LoginPage = loadable(() => import("~/features/users/LoginForm"), {
	fallback: <ScreenLoading />,
});

// ERROR
export const ServerError = loadable(() => import("~/features/errors/ServerError"), {
	fallback: <ScreenLoading />,
});
export const NotFound = loadable(() => import("~/features/errors/NotFound"), {
	fallback: <ScreenLoading />,
});
export const TestErrorsPage = loadable(() => import("~/features/errors/TestError"), {
	fallback: <ScreenLoading />,
});
