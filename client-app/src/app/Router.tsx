import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import ActivityDashboard from "~/features/activities/dashboard/ActivityDashboard";
import HomePage from "~/features/home/HomePage";
import ActivitiesLayout from "./ActivitiesLayout";
import Layout from "./Layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="activities" element={<ActivitiesLayout />}>
        <Route index element={<ActivityDashboard />} />
        <Route path="create" element={<div>CREATE</div>} />
        <Route path=":id" element={<Outlet />}>
          <Route path="edit" element={<div>EDITING</div>} />
          <Route index element={<div>VIEWING</div>} />
        </Route>
      </Route>
    </Route>
  )
);
