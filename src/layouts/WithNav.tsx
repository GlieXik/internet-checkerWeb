import { Outlet, useNavigate } from "react-router-dom";
import { useIp } from "../context/ip.store";
import { useEffect } from "react";
import { ROUTERS } from "../router";
import { Navigation } from "../components/Navigation/Navigation";

export const WithNav = () => {
  const { value } = useIp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!value) {
      return navigate(ROUTERS.HOME);
    }
  }, [value]);

  return (
    <>
      <Outlet />
      <Navigation />
    </>
  );
};
