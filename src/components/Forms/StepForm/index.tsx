import { nominationFormState } from "@/atoms/nominationFormAtom";
import { DepartmentType, NominationFilter } from "@/enums";
import useAuth from "@/hooks/useAuth";
import {
  NominationFormSubmissionData,
  NominationQuestionsQueryData,
} from "@/interfaces";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Stack,
  StepIcon,
  StepConnector,
  CircularProgress,
} from "@mui/material";
import { Suspense, useState } from "react";
import { RecoilState, useRecoilState } from "recoil";
import FinalStep from "../Steps/FinalStep";
import FirstStep from "../Steps/FirstStep";
import SecondStep from "../Steps/SecondStep";

// Step titles
const labels = ["Nomination Details", "Nomination Form", "Submit"];
const handleSteps = (
  recoilFormState: RecoilState<NominationFormSubmissionData>,
  step: number,
  handleNext: () => void,
  handleBack: () => void,
  case_id?: string
) => {
  switch (step) {
    case 0:
      return (
        <FirstStep
          recoilFormState={recoilFormState}
          handleNext={handleNext}
          case_id={case_id}
        />
      );
    case 1:
      return (
        <SecondStep
          recoilFormState={recoilFormState}
          handleNext={handleNext}
          handleBack={handleBack}
          case_id={case_id}
        />
      );
    case 2:
      return (
        <FinalStep
          recoilFormState={recoilFormState}
          handleBack={handleBack}
          case_id={case_id}
        />
      );
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

interface StepFormProps {
  recoilFormState: RecoilState<NominationFormSubmissionData>;
  case_id?: string;
}

const StepForm = ({ recoilFormState, case_id }: StepFormProps) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      {activeStep === labels.length ? (
        <Success />
      ) : (
        <Stack direction={{ xs: "column", md: "row" }}>
          <Suspense fallback={<CircularProgress />}>
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
            {handleSteps(
              recoilFormState,
              activeStep,
              handleNext,
              handleBack,
              case_id
            )}
          </Suspense>
        </Stack>
      )}
    </>
  );
};

export default StepForm;
