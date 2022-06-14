import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "@/components/Common/PrimaryButton";
import SectionHeader from "@/components/Common/SectionHeader";
import SectionSubtitle from "@/components/Common/SectionSubtitle";
import NominationQuestion from "../../Common/NominationQuestion";
import { RecoilState, useRecoilState, useResetRecoilState } from "recoil";
import { nominationFormState } from "@/atoms/nominationFormAtom";
import {
  upsertNominationForm,
  useDraftQuizResponse,
  useQuiz,
} from "@/lib/nominations";
import FallbackSpinner from "@/components/Common/FallbackSpinner";
import { hashFromString } from "@/utils";
import CustomSnackbar from "@/components/Common/Snackbar";
import useAuth from "@/hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { NominationFormSubmissionData } from "@/interfaces";
import FeedbackSnackbar from "../../Common/FeedbackSnackbar";

interface SecondStepProp {
  recoilFormState: RecoilState<NominationFormSubmissionData>;
  handleNext: () => void;
  handleBack: () => void;
  case_id?: string;
}

export default function SecondStep({
  recoilFormState,
  handleNext,
  handleBack,
  case_id,
}: SecondStepProp) {
  const { user } = useAuth();

  const [getNominationFormState, setNominationFormState] =
    useRecoilState(recoilFormState);
  const resetFormState = useResetRecoilState(recoilFormState);
  const [hasDraftReset, setHasDraftReset] = useState<boolean>(false);

  const [saveSnackbarOpen, setSaveSnackbarOpen] = useState<boolean>(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState<boolean>(false);

  const { data, error, loading } = useQuiz(
    getNominationFormState.user?.staff_id
  );

  console.log("quiz data: ", data);
  const quizAnswerToKeyMap = new Map<string, string>();

  const quizQnaKeys = data?.qna_questions.map(
    ({ quiz_question_name, answers }) => {
      const hash = hashFromString(quiz_question_name);
      answers.map((ans) =>
        quizAnswerToKeyMap.set(`${ans.answer_id}`, `${hash}`)
      );
      return hash;
    }
  );
  const quizRatingKeys = data?.rating_questions?.flatMap(
    ({ quiz_question_name, rating_child_quiz_questions }) => {
      const quizRatingChildrenKeys = rating_child_quiz_questions.map(
        ({ child_quiz_question_name, answers }) => {
          const hash = hashFromString(child_quiz_question_name);
          answers.map((ans) =>
            quizAnswerToKeyMap.set(`${ans.answer_id}`, `${hash}`)
          );
          return hash;
        }
      );
      return quizRatingChildrenKeys;
    }
  );
  const quizKeys = quizQnaKeys?.concat(quizRatingKeys ?? []) ?? [];
  console.log("quiz keys: ", quizKeys);
  console.log("answer to quiz map: ", quizAnswerToKeyMap);

  const draftQuizAnswerMap = new Map<string, string>();

  const {
    draftQuizResponseData,
    draftQuizResponseError,
    draftQuizResponseLoading,
  } = useDraftQuizResponse(case_id);

  console.log("draft quiz response data: ", draftQuizResponseData);

  draftQuizResponseData?.response_list.map((quizAns) => {
    const qnKey = quizAnswerToKeyMap.get(quizAns);
    if (qnKey) {
      draftQuizAnswerMap.set(qnKey, quizAns);
    }
  });

  console.log("nomination form atom answers: ", getNominationFormState.answers);
  console.log("draft quiz answer map:", draftQuizAnswerMap);

  // get previously saved quiz answer values
  const defaultQuizValues = useMemo(() => {
    return (
      Object.fromEntries(getNominationFormState.answers) ??
      Object.fromEntries(draftQuizAnswerMap)
    );
  }, [getNominationFormState, draftQuizAnswerMap]);

  // get previously saved quiz answer values
  // const defaultQuizValues =
  //   draftQuizAnswerMap.size > 0
  //     ? Object.fromEntries(draftQuizAnswerMap)
  //     : Object.fromEntries(getNominationFormState.answers) ?? undefined;

  console.log("default quiz values: ", defaultQuizValues);

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<any>({
    defaultValues: defaultQuizValues,
  });

  useEffect(() => {
    if (defaultQuizValues) {
      console.log("new default value: ", defaultQuizValues);
      reset(defaultQuizValues);
    }
  }, [defaultQuizValues, reset]);

  // useEffect(() => {
  //   console.log("default quiz value: ", defaultQuizValues);
  //   if (draftQuizAnswerMap.size > 0 && !hasDraftReset) {
  //     console.log("default quiz values found");
  //     setHasDraftReset(true);
  //     reset(Object.fromEntries(draftQuizAnswerMap));
  //   }
  // }, [defaultQuizValues, draftQuizAnswerMap, hasDraftReset, reset]);

  const handleReset = () => {
    console.log("resetting form!");

    const clearedNominationFormState = {
      ...getNominationFormState,
      answers: new Map<string, string>(),
    };
    console.log("cleared nomination form state: ", clearedNominationFormState);
    reset(Object.fromEntries(new Map<string, string>()));
    resetFormState();
    setNominationFormState(clearedNominationFormState);
    console.log("post reset form recoil state: ", getNominationFormState);
  };

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

  const handleSave = async () => {
    if (!user) {
      console.error("user not logged in!");
    } else {
      setSaveButtonLoading(true);
      const data = getValues();
      console.log("form data from getValues: ", data);
      const mapData = new Map(Array.from(Object.entries(data)));
      try {
        console.log("saving form!");
        const newFormData = {
          ...getNominationFormState,
          answers: mapData as Map<string, string>,
        };
        const response = await upsertNominationForm(
          user?.staff_id,
          newFormData,
          true,
          case_id ?? getNominationFormState.case_id
        );
        setNominationFormState({
          ...getNominationFormState,
          case_id: response.case_id,
        });
        console.log("reponse value: ", response);
        setSaveButtonLoading(false);
        if (response.status_code !== 200) {
          setErrorSnackbarOpen(true);
        } else {
          setSaveSnackbarOpen(true);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    console.log("form errors occurred: ", errors);
  }, [errors]);

  return (
    <Box width="100%">
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <SectionHeader mb={2} fontSize={{ xs: "24px", md: "32px" }}>
            Service-level Quiz
          </SectionHeader>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            color="#212b36"
            sx={{
              alignItems: "baseline",
            }}
          >
            Auto-save enabled
          </Typography>
        </Box>
        <SectionSubtitle mb={4} color="#212b36">
          Complete the quiz and answer the questions as accurately as possible.
        </SectionSubtitle>
      </Box>
      {data ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"column"} spacing={3} mb={8}>
            {data?.qna_questions.map(({ quiz_question_name, answers }) => (
              <NominationQuestion
                control={control}
                key={`qn ${quiz_question_name}`}
                question={quiz_question_name}
                questionName={`${hashFromString(quiz_question_name)}`}
                answers={answers}
              />
            ))}
            {data?.rating_questions?.map(
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
                        questionName={`${hashFromString(
                          child_quiz_question_name
                        )}`}
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
            <Box
              display="flex"
              flexDirection={{ xs: "column-reverse", md: "row" }}
            >
              <PrimaryButton
                size="large"
                variant={"outlined"}
                sx={{
                  borderRadius: "8px",
                  textTransform: "capitalize",
                  marginTop: { xs: 1, sm: "auto" },
                  marginRight: { md: "12px" },
                }}
                onClick={handleReset}
                color="error"
              >
                Reset form
              </PrimaryButton>
              <LoadingButton
                size="large"
                variant={"outlined"}
                sx={{
                  borderRadius: "8px",
                  textTransform: "capitalize",
                  marginTop: { xs: 1, sm: "auto" },
                  marginRight: { md: "12px" },
                  color: "green",
                  borderColor: "green",
                }}
                onClick={handleSave}
                loading={saveButtonLoading}
              >
                Save draft
              </LoadingButton>
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
            </Box>
          </Stack>
        </form>
      ) : (
        <FallbackSpinner />
      )}
      <FeedbackSnackbar
        successOpen={saveSnackbarOpen}
        setSuccessOpen={setSaveSnackbarOpen}
        successMsg="Successfully saved nomination quiz answers to draft."
        errorOpen={errorSnackbarOpen}
        setErrorOpen={setErrorSnackbarOpen}
        errorMsg="Error occurred while trying to save your nomination quiz answers! Please try again."
      />
    </Box>
  );
}
