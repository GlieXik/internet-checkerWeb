import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ROUTERS } from "../router";
import { Navigation } from "../components/Navigation/Navigation";
import { SelectorContext } from "../context/selector.context";

export const WithNav = () => {
  const navigate = useNavigate();
  const { lastSelected: value } = useContext(SelectorContext);

  useEffect(() => {
    if (!value) {
      return navigate(ROUTERS.HOME);
    }
  }, [navigate, value]);

  return (
    <>
      <Outlet />
      <Navigation />
    </>
  );
};
