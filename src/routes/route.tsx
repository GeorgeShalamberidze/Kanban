import PageNotFound from "@/components/pageNotFound";
import RootLayout from "@/layout/rootLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { DASHBOARD_PATHS } from "./route.enum";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={DASHBOARD_PATHS.ROOT}
      element={<RootLayout />}
      errorElement={<PageNotFound />}
    ></Route>
  )
);
