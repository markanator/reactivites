import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom";
import * as Loaded from "./loadablePages";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Loaded.App />}>
				<Route index element={<Loaded.HomePage />} />
				<Route
					element={
						<Loaded.ProtectedLayout>
							<Loaded.ActivitiesLayout />
						</Loaded.ProtectedLayout>
					}
				>
					<Route path="activities" element={<Outlet />}>
						<Route index element={<Loaded.ActivityDashboard />} />
						<Route path="create" element={<Loaded.ActivityForm />} />
						<Route path=":id" element={<Outlet />}>
							<Route path="manage" element={<Loaded.ActivityForm />} />
							<Route index element={<Loaded.ActivityDetails />} />
						</Route>
					</Route>
					<Route path="profiles/:username" element={<Loaded.ProfilePage />} />
					<Route path="test-errors" element={<Loaded.TestErrorsPage />} />
				</Route>
				<Route path="account" element={<Outlet />}>
					<Route path="verifyEmail" element={<Loaded.ConfirmEmail />} />
					<Route path="registerSuccess" element={<Loaded.RegisterSuccess />} />
				</Route>
				<Route path="server-error" element={<Loaded.ServerError />} />
				<Route path="*" element={<Loaded.NotFound />} />
			</Route>
		</>,
	),
);
