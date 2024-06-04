import { Box, Modal } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TextMobileStepper } from "../components/LearnStepper/TextMobileStepper";
import { useTutorial } from "../hooks/useTutorial";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#0f0f0f",
  border: "2px solid #000",
  outline: 0,
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
  color: "white",
};

export const HomeLayout = () => {
  const { isOpened, closeTutorial } = useTutorial();

  return (
    <>
      <Outlet />

      <Modal
        open={isOpened}
        onClose={closeTutorial}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextMobileStepper handleClose={closeTutorial} />
        </Box>
      </Modal>
    </>
  );
};
