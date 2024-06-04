import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Suspense } from "react";
import { Loader } from "./components/ui/Loader";
import { IpProvider } from "./context/ip.store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <>
      <IpProvider>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </IpProvider>
      <ToastContainer />
    </>
  );
};
