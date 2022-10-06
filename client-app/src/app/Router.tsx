import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom";
import * as Loaded from "./loadablePages";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Loaded.App />}>
				<Route index element={<Loaded.HomePage />} />
				<Route element={<Loaded.ActivitiesLayout />}>
					<Route path="activities" element={<Outlet />}>
						<Route index element={<Loaded.ActivityDashboard />} />
						<Route path="create" element={<Loaded.ActivityForm />} />
						<Route path=":id" element={<Outlet />}>
							<Route path="manage" element={<Loaded.ActivityForm />} />
							<Route index element={<Loaded.ActivityDetails />} />
						</Route>
					</Route>
					<Route path="profiles/:username" element={<Loaded.ProfilePage />} />
					<Route path="login" element={<Loaded.LoginPage />} />
					<Route path="test-errors" element={<Loaded.TestErrorsPage />} />
					<Route path="server-error" element={<Loaded.ServerError />} />
					<Route path="*" element={<Loaded.NotFound />} />
				</Route>
			</Route>
		</>,
	),
);
