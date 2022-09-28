import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import ActivityDashboard from "~/features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "~/features/activities/details/ActivityDetails";
import ActivityForm from "~/features/activities/form/ActivityForm";
import HomePage from "~/features/home/HomePage";
import ActivitiesLayout from "./ActivitiesLayout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="activities" element={<ActivitiesLayout />}>
        <Route index element={<ActivityDashboard />} />
        <Route path="create" element={<ActivityForm />} />
        <Route path=":id" element={<Outlet />}>
          <Route path="edit" element={<ActivityForm />} />
          <Route index element={<ActivityDetails />} />
        </Route>
      </Route>
    </>
  )
);
