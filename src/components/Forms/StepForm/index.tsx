import { DepartmentType } from "@/enums";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Stack,
  StepIcon,
  StepConnector,
} from "@mui/material";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import FinalStep from "../Steps/FinalStep";
import FirstStep from "../Steps/FirstStep";
import SecondStep from "../Steps/SecondStep";

// Step titles
const labels = ["Nomination Details", "Nomination Form", "Submit"];
const handleSteps = (
  step: number,
  handleNext: () => void,
  handleBack: () => void
) => {
  switch (step) {
    case 0:
      return <FirstStep handleNext={handleNext} />;
    case 1:
      return <SecondStep handleNext={handleNext} handleBack={handleBack} />;
    case 2:
      return <FinalStep handleSubmit={handleNext} handleBack={handleBack} />;
    default:
      throw new Error("Unknown step");
  }
};

const Success = () => {
  return (
    <>
      <Typography variant="h2" align="center" sx={{ py: 4 }}>
        Thank you!
      </Typography>
      <Typography component="p" align="center">
        Nomination successfully created!
      </Typography>
    </>
  );
};

const StepForm = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    console.log("setting active step to : ", activeStep - 1);
    setActiveStep(activeStep - 1);
  };
  return (
    <>
      {activeStep === labels.length ? (
        <Success />
      ) : (
        <Stack direction={{ xs: "column", md: "row" }}>
          <Stepper
            activeStep={activeStep}
            orientation={"vertical"}
            sx={{
              // backgroundColor: "",
              display: { xs: "none", md: "flex" },
              height: 480,
              position: { md: "sticky" },
              top: { md: 72 },
              mr: 12,
            }}
            connector={
              <StepConnector
                sx={{
                  backgroundColor: "",
                  ml: 2.2,
                  "& .MuiStepConnector-line": { height: "100%" },
                }}
              />
            }
          >
            {labels.map((label) => (
              <Step key={label} sx={{ backgroundColor: "" }}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: "16px",
                      ml: 1.5,
                    },
                    "& .MuiStepLabel-iconContainer": {
                      width: 36,
                      height: 36,
                    },
                  }}
                  StepIconProps={{ sx: { width: 36, height: 36 } }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {handleSteps(activeStep, handleNext, handleBack)}
        </Stack>
      )}
    </>
  );
};

export default StepForm;
