import { TextField, Box, Button, Grid, Stack, Typography } from "@mui/material";
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

  const onSubmit = (data: any) => {
    const mapData = new Map(Array.from(Object.entries(data)));
    console.log("submitted data: ", mapData);
    const newFormData = {
      ...getNominationFormState,
      answers: mapData as Map<string, string>,
    };
    console.log("new form data: ", newFormData);
    setNominationFormState(newFormData);
    handleNext();
  };

  const defaultQuizValues = Object.fromEntries(getNominationFormState.answers);
  const { handleSubmit, control } = useForm<any>({
    defaultValues: defaultQuizValues,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} spacing={3} mb={8}>
          {questionData?.qna_questions.map(
            ({ quiz_question_name, answers }) => (
              <NominationQuestion
                control={control}
                key={`qn ${quiz_question_name}`}
                question={quiz_question_name}
                answers={answers}
              />
            )
          )}
          {questionData?.rating_questions?.map(
            ({ quiz_question_name, rating_child_quiz_questions }) => (
              <>
                <Typography fontWeight={600} fontSize="20px" color="#212b36">
                  {quiz_question_name}
                </Typography>
                {rating_child_quiz_questions.map(
                  ({ child_quiz_question_name, answers }) => (
                    <NominationQuestion
                      control={control}
                      key={`qn ${child_quiz_question_name}`}
                      question={child_quiz_question_name}
                      answers={answers}
                    />
                  )
                )}
              </>
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
            Next
          </PrimaryButton>
        </Stack>
      </form>
    </Box>
  );
}
