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
import {
  NominationFormSubmissionData,
  NominationQuestionsQueryData,
} from "@/interfaces";

interface SecondStepProp {
  questionData?: NominationQuestionsQueryData;
  handleNext: () => void;
  handleBack: () => void;
}

export default function SecondStep({
  questionData,
  handleNext,
  handleBack,
}: SecondStepProp) {
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

  console.log("question data: ", questionData);

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
          {questionData?.qna_questions.map(
            ({ quiz_question_name, answers }, i) => (
              <NominationQuestion
                key={`qn data ${i}`}
                question={quiz_question_name}
                answers={answers}
              />
            )
          )}
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
