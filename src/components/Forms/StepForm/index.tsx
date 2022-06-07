import { nominationFormState } from "@/atoms/nominationFormAtom";
import { DepartmentType, NominationFilter } from "@/enums";
import useAuth from "@/hooks/useAuth";
import { NominationQuestionsQueryData } from "@/interfaces";
import {
  fetchNominationDetails,
  fetchNominations,
  fetchQuiz,
} from "@/lib/nominations";
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
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import FinalStep from "../Steps/FinalStep";
import FirstStep from "../Steps/FirstStep";
import SecondStep from "../Steps/SecondStep";

// Step titles
const labels = ["Nomination Details", "Nomination Form", "Submit"];
const handleSteps = (
  step: number,
  handleNext: () => void,
  handleBack: () => void,
  questionData?: NominationQuestionsQueryData
) => {
  switch (step) {
    case 0:
      return <FirstStep handleNext={handleNext} />;
    case 1:
      return (
        <SecondStep
          questionData={questionData}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      );
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
    setActiveStep(activeStep - 1);
  };

  const { user } = useAuth();
  const [questionData, setQuestionData] = useState<
    NominationQuestionsQueryData | undefined
  >(undefined);

  // fetch question data
  useEffect(() => {
    const fetchQuestionDataLoad = async () => {
      const data = await fetchQuiz(user?.staff_id);
      setQuestionData(data);
    };
    fetchQuestionDataLoad();
  }, []);

  // const [getNominationFormState, setNominationFormState] =
  //   useRecoilState(nominationFormState);

  // // FETCH DRAFT NOMINATION ANSWERS (IF EXISTS)
  // const [nominationData, setNominationData] = useState()
  // const { nominationData } = useFetchNominations(
  //   user?.staff_id,
  //   NominationFilter.USER
  // );

  // // get answer data from
  // const draftNominations = nominationData.filter((nom) => nom.draft_status);
  // const draftNomination = draftNominations[0];

  // // fetch draft nomination details
  // const { nominationDetailsData } = useFetchNominationDetails(
  //   draftNomination.case_id
  // );

  // useEffect(() => {
  //   const draftQuestionAnswerMap = new Map<string, string>();
  //   const draftAnswers = draftNominations[0].answers;
  //   console.log("draft nomination answers: ", draftAnswers);

  //   // get question keys from questionData
  //   questionData?.qna_questions.map(
  //     ({
  //       quiz_question_name,
  //       answers,
  //     }: {
  //       quiz_question_name: any;
  //       answers: any;
  //     }) => {
  //       draftQuestionAnswerMap.set(quiz_question_name, "");
  //     }
  //   );
  //   questionData?.rating_questions?.map(
  //     ({
  //       quiz_question_name,
  //       rating_child_quiz_questions,
  //     }: {
  //       quiz_question_name: any;
  //       rating_child_quiz_questions: any;
  //     }) => {
  //       rating_child_quiz_questions.map(
  //         ({
  //           child_quiz_question_name,
  //           answers,
  //         }: {
  //           child_quiz_question_name: any;
  //           answers: any;
  //         }) => {
  //           draftQuestionAnswerMap.set(child_quiz_question_name, "");
  //         }
  //       );
  //     }
  //   );

  //   // set answer value to question keys
  //   const draftQuestions = Object.keys(
  //     Object.fromEntries(draftQuestionAnswerMap)
  //   );
  //   draftQuestions.map((question, i) => {
  //     draftQuestionAnswerMap.set(question, draftAnswers[i]);
  //   });

  //   console.log("draft question map: ", draftQuestionAnswerMap);

  //   // fetch ALL form details
  //   setNominationFormState({
  //     ...getNominationFormState,
  //     // user: {
  //     //   staff_id: nominationDetailsData.nominee_id,
  //     //   staff_name: nominationDetailsData.nominee_name,
  //     //   staff_department: nominationDetailsData.nominee_department,
  //     // },
  //     // department: nominationDetailsData.nominee_department as DepartmentType,
  //     // description: nominationDetailsData.nomination_reason,
  //     answers: draftQuestionAnswerMap,
  //   });
  // }, []);

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
            {handleSteps(activeStep, handleNext, handleBack, questionData)}
          </Suspense>
        </Stack>
      )}
    </>
  );
};

export default StepForm;
