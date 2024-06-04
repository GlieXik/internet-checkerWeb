import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";

const steps = [
  {
    label: "Welcome",
    description: `This program is for tracking whether your light is on or off, let's get started!`,
  },
  {
    label: "What's needed",
    description:
      "Connect to the wifi router, then press 'Get IP'. This is needed to determine the location of the router, and that's it! Now you can track the state of the light.",
  },
  {
    label: "Security",
    description: `Your IP data or location is not stored on the server, only on your device, they are used only to determine the state of the router.`,
  },
];

interface TextMobileStepperProps {
  handleClose: () => void;
}
export const TextMobileStepper = ({ handleClose }: TextMobileStepperProps) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;
  const lastStep = activeStep === maxSteps - 1;

  const handleSkip = () => {
    handleClose();
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (lastStep) {
      handleClose();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "inherit",
          color: "white",
        }}
      >
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      <Box sx={{ minHeight: 155, maxWidth: 400, width: "100%", p: 2 }}>
        {steps[activeStep].description}
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ bgcolor: "inherit", color: "white" }}
        nextButton={
          <Button size="small" onClick={handleNext}>
            {lastStep ? "Let's go" : "Next"}

            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <>
            {activeStep === 0 && (
              <>
                <Button size="small" onClick={handleSkip}>
                  <KeyboardArrowLeft />
                  Skip
                </Button>
              </>
            )}
            {activeStep !== 0 && (
              <Button size="small" onClick={handleBack}>
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            )}
          </>
        }
      />
    </Box>
  );
};
