import { TextField, Box, Button, Grid, Stack } from "@mui/material";
import { useContext, useCallback, useState, Dispatch } from "react";
import { FormContainer } from "react-hook-form-mui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import StyledTextField from "@/components/Common/FormTextField";
import PrimaryButton from "@/components/Common/PrimaryButton";
import SectionHeader from "@/components/Common/SectionHeader";
import SectionSubtitle from "@/components/Common/SectionSubtitle";
import { nominationDetailSchema } from "../../Schemas";
import { DepartmentType } from "@/enums";
import NominationQuestion from "../../Common/NominationQuestion";
import { NominationFormSubmissionData } from "../../StepForm";

interface SecondStepProp {
  formData: NominationFormSubmissionData;
  setFormData: Dispatch<NominationFormSubmissionData>;
  handleNext: () => void;
  handleBack: () => void;
}

export default function SecondStep({
  handleNext,
  handleBack,
  formData,
  setFormData,
}: SecondStepProp) {
  const [values, setValues] = useState<NominationFormSubmissionData>();
  const onSubmit = (data: Map<string, string>) => {
    const newFormData = { ...formData, answers: data };
    setFormData(newFormData);
    console.log("submitted data: ", data);
    console.log("new form data: ", newFormData);
    handleNext();
  };
  const formContext = useForm<NominationFormSubmissionData>({
    defaultValues: Object.fromEntries(formData.answers),
    // resolver: yupResolver(nominationDetailSchema),
  });

  const {
    formState: { errors },
  } = formContext;

  interface FormQuestion {
    question: string;
    answers: string[];
  }

  const formQuestionData: FormQuestion[] = [
    {
      question: "The nominee provided service based on?",
      answers: [
        "Gave me what I have asked for only",
        "Fulfilled requirements very well",
        "Given requirements and further improving more than what was needed",
        "Provided services out of his/her own will and outside of the job scope",
      ],
    },
    {
      question: "The nominee displayed the following",
      answers: [
        "Able to meet deadlines with little to no supervision",
        "Initiate action to seek information and solve problems",
        "Work with people sincerely to achieve goals",
        "Anticipate potential issues and develops prevention alternatives",
      ],
    },
  ];

  return (
    <Box width="100%">
      <Box>
        <SectionHeader mb={2} fontSize={{ xs: "24px", md: "32px" }}>
          Service-level Quiz
        </SectionHeader>
        <SectionSubtitle mb={4}>
          Complete the quiz and answer the questions as accurately as possible.
        </SectionSubtitle>
      </Box>
      {/*
      // @ts-ignore */}
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <Stack direction={"column"} spacing={3} mb={8}>
          {formQuestionData.map(({ question, answers }, i) => (
            <NominationQuestion
              key={`qn data ${i}`}
              question={question}
              answers={answers}
            />
          ))}
        </Stack>
        <Stack justifyContent={"space-between"} flexDirection="row">
          <PrimaryButton
            size="large"
            sx={{
              borderRadius: "8px",
              textTransform: "capitalize",
            }}
            onClick={handleBack}
          >
            Back
          </PrimaryButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              backgroundColor: "red",
            }}
          >
            <PrimaryButton
              type={"submit"}
              size="large"
              sx={{
                borderRadius: "8px",
                textTransform: "capitalize",
              }}
            >
              Submit
            </PrimaryButton>
          </Box>
        </Stack>
      </FormContainer>
    </Box>
  );
}
