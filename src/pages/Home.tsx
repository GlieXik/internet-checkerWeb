// import { Input } from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { Selector } from "../components/ui/Selector";
import axios from "axios";

import { toast } from "react-toastify";
import { EditSelector } from "../components/Settings";
import { useContext } from "react";
import { ActionType, SelectorContext } from "../context/selector.context";

export const HomePage = () => {
  const navigate = useNavigate();
  const { setLastSelected, dispatch, lastSelected } =
    useContext(SelectorContext);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!lastSelected) return;

    navigate("/signal");
  };

  const handleGetIp = async () => {
    try {
      const { data } = await toast.promise(
        axios("https://api.ipify.org?format=json"),
        {
          pending: "Fetching IP",
          success: "IP Fetched",
          error: "Failed to fetch IP",
        }
      );
      setLastSelected({ value: data.ip, label: data.ip });
      dispatch({
        type: ActionType.SET,
        payload: { value: data.ip, label: data.ip },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100dvh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexBasis: "100%",
          gap: "3rem",
        }}
      >
        <h1
          style={{
            textAlign: "center",

            display: "block",
            fontSize: "2.5rem",
          }}
        >
          Welcome to
          <br />
          <span className="logo">Signal</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          <Selector />
          <button
            type="submit"
            style={{
              backgroundColor: "#005B41",
              color: "white",
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Signal
          </button>
          <button
            type="button"
            onClick={handleGetIp}
            style={{
              backgroundColor: "rgb(20,20,80)",
              color: "white",
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Get IP
          </button>
        </form>
      </div>
      <EditSelector />
    </div>
  );
};
