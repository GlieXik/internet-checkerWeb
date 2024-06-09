import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Suspense } from "react";
import { Loader } from "./components/ui/Loader";
import { SelectorProvider } from "./context/selector.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <>
      <SelectorProvider>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </SelectorProvider>
      <ToastContainer />
    </>
  );
};
