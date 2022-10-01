import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import NotFound from "~/features/errors/NotFound";
import ServerError from "~/features/errors/ServerError";
import LoginForm from "~/features/users/LoginForm";
import * as Loaded from "./loadablePages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Loaded.HomePage />} />
        <Route path="activities" element={<Loaded.ActivitiesLayout />}>
          <Route index element={<Loaded.ActivityDashboard />} />
          <Route path="create" element={<Loaded.ActivityForm />} />
          <Route path=":id" element={<Outlet />}>
            <Route path="manage" element={<Loaded.ActivityForm />} />
            <Route index element={<Loaded.ActivityDetails />} />
          </Route>
        </Route>
        <Route element={<Loaded.ActivitiesLayout />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="test-errors" element={<Loaded.TestErrorsPage />} />
          <Route path="server-error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </>
  )
);
