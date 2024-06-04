import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { HomeLayout } from "./layouts/HomeLayout";
import { Signal } from "./pages/Signal";
import { WithNav } from "./layouts/WithNav";

export enum ROUTERS {
  HOME = "/",
  SIGNAL = "/signal",
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
    ],
  },
]);
