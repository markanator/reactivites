import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import * as Loaded from "./loadablePages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Loaded.HomePage />} />
      <Route path="activities" element={<Loaded.ActivitiesLayout />}>
        <Route index element={<Loaded.ActivityDashboard />} />
        <Route path="create" element={<Loaded.ActivityForm />} />
        <Route path=":id" element={<Outlet />}>
          <Route path="edit" element={<Loaded.ActivityForm />} />
          <Route index element={<Loaded.ActivityDetails />} />
        </Route>
      </Route>
    </>
  )
);
