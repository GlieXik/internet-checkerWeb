import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Suspense } from "react";
import { Loader } from "./components/ui/Loader";
import { SelectorProvider } from "./context/selector.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
export const App = () => {
  return (
    <>
      <SelectorProvider>
        <Suspense fallback={<Loader />}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <RouterProvider router={router} />
            </LocalizationProvider>
          </ThemeProvider>
        </Suspense>
      </SelectorProvider>
      <ToastContainer />
    </>
  );
};
