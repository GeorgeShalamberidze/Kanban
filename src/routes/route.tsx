import PageNotFound from "@/components/pageNotFound";
import RootLayout from "@/layout/rootLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { DASHBOARD_PATHS } from "./route.enum";
import Board from "@/components/board";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={DASHBOARD_PATHS.ROOT}
      element={<RootLayout />}
      errorElement={<PageNotFound />}
    >
      <Route path={`${DASHBOARD_PATHS.BOARD}/:boardName`} element={<Board />} />
    </Route>
  )
);
