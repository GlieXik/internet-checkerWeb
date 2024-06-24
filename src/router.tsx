import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { HomeLayout } from "./layouts/HomeLayout";
import { Signal } from "./pages/Signal";
import { WithNav } from "./layouts/WithNav";
import { Tracking } from "./pages/Tracking";

export enum ROUTERS {
  HOME = "/",
  SIGNAL = "/signal",
  TRAKING = "/tracking",
}
export const router = createBrowserRouter([
  {
    path: ROUTERS.HOME,
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTERS.SIGNAL,
        element: <WithNav />,
        children: [{ index: true, element: <Signal /> }],
      },
      {
        path: ROUTERS.TRAKING,
        element: <WithNav />,
        children: [{ index: true, element: <Tracking /> }],
      },
    ],
  },
]);
