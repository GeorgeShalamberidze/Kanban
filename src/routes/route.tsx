import PageNotFound from "@/components/page-not-found";
import RootLayout from "@/layout/rootLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} errorElement={<PageNotFound />}></Route>
  )
);
