import { TextField, Box, Button, Grid, Stack } from "@mui/material";
import { useContext, useCallback, useState, Dispatch, useEffect } from "react";
import { FormContainer } from "react-hook-form-mui";
import { useForm } from "react-hook-form";
import PrimaryButton from "@/components/Common/PrimaryButton";
import SectionHeader from "@/components/Common/SectionHeader";
import SectionSubtitle from "@/components/Common/SectionSubtitle";
import { nominationDetailSchema } from "../../Schemas";
import { DepartmentType } from "@/enums";
import NominationQuestion from "../../Common/NominationQuestion";
import { useRecoilState } from "recoil";
import { nominationFormState } from "@/atoms/nominationFormAtom";
import { NominationFormSubmissionData } from "@/interfaces";

interface NominationFormQuestionsData {
  values: Map<string, string>;
}

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

interface SecondStepProp {
  handleNext: () => void;
  handleBack: () => void;
}

export default function SecondStep({ handleNext, handleBack }: SecondStepProp) {
  const [getNominationFormState, setNominationFormState] =
    useRecoilState(nominationFormState);

  const onSubmit = (data: Map<string, string>) => {
    console.log("second step submit called!");
    console.log("submitted data: ", data);
    console.log("existing form data: ", getNominationFormState);
    const newFormData = { ...getNominationFormState, answers: { ...data } };
    console.log("new form data: ", newFormData);
    setNominationFormState(newFormData);
    handleNext();
  };

  const formContext = useForm<Map<string, string>>({
    defaultValues: getNominationFormState.answers,
    // resolver: yupResolver(nominationDetailSchema),
  });

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
        <Stack
          justifyContent={{ sm: "space-between" }}
          flexDirection={{ xs: "column-reverse", sm: "row" }}
        >
          <PrimaryButton
            size="large"
            variant={"outlined"}
            sx={{
              borderRadius: "8px",
              textTransform: "capitalize",
              marginTop: { xs: 1, sm: "auto" },
            }}
            onClick={handleBack}
          >
            Back
          </PrimaryButton>
          <PrimaryButton
            type={"submit"}
            size="large"
            sx={{
              borderRadius: "8px",
              textTransform: "capitalize",
              width: { xs: "100%", sm: "auto" },
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
          >
            Submit
          </PrimaryButton>
        </Stack>
      </FormContainer>
    </Box>
  );
}
