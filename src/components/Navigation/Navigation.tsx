import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../router";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Box, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import UpdateIcon from "@mui/icons-material/Update";
import { useContext } from "react";
import { SelectorContext } from "../../context/selector.context";
// import { useIp } from "../../context/selector.context";
export const Navigation = () => {
  const navigate = useNavigate();
  const { lastSelected: value } = useContext(SelectorContext);

  const goBack = () => {
    navigate(-1);
  };
  const goHome = () => {
    navigate(ROUTERS.HOME);
    localStorage.removeItem("lastSelect");
  };
  const goTracking = () => {
    navigate(ROUTERS.TRAKING);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#232D3F",
      }}
    >
      <BottomNavigation
        showLabels
        sx={{
          background: "transparent",
        }}
      >
        <BottomNavigationAction
          label="Back"
          icon={<ArrowBackIcon />}
          onClick={goBack}
          sx={{
            color: "#008170",
          }}
        />
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={goHome}
          sx={{
            color: "#008170",
          }}
        />
        <BottomNavigationAction
          label="Tracking"
          icon={<UpdateIcon />}
          onClick={goTracking}
          sx={{
            color: "#008170",
          }}
        />
      </BottomNavigation>
      <Box
        textAlign={"center"}
        sx={{
          color: "#008170",
          paddingBottom: "1rem",
        }}
      >
        {value?.label}
      </Box>
    </Paper>
  );
};
