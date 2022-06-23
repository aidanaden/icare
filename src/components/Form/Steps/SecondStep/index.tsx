import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "@/components/Common/PrimaryButton";
import SectionHeader from "@/components/Common/SectionHeader";
import SectionSubtitle from "@/components/Common/SectionSubtitle";
import NominationQuestion from "../../Common/NominationQuestion";
import { RecoilState, useRecoilState } from "recoil";
import {
  upsertNominationForm,
  useDraftQuizResponse,
  useQuiz,
} from "@/lib/nominations";
import FallbackSpinner from "@/components/Common/FallbackSpinner";
import { hashFromString } from "@/utils";
import useAuth from "@/hooks/useAuth";
import { NominationFormSubmissionData } from "@/interfaces";
import FeedbackSnackbar from "../../Common/FeedbackSnackbar";
import { newNominationFormState } from "@/atoms/newNominationFormAtom";
import { editNominationFormState } from "@/atoms/editNominationFormAtom";

interface QuizKeyAnswer {
  [quizKey: string]: string;
}

interface SecondStepProp {
  recoilFormState: RecoilState<NominationFormSubmissionData>;
  handleNext: () => void;
  handleBack: () => void;
  case_id?: string;
  isEdit?: boolean;
}

export default function SecondStep({
  recoilFormState,
  handleNext,
  handleBack,
  case_id,
  isEdit,
}: SecondStepProp) {
  const { user } = useAuth();
  const [getNominationFormState, setNominationFormState] = useRecoilState(
    isEdit ? editNominationFormState : newNominationFormState
  );

  const [hasDraftReset, setHasDraftReset] = useState<number>(0);
  const [hasReadDraft, setHasReadDraft] = useState<boolean>(false);

  const [resetSnackbarOpen, setResetSnackbarOpen] = useState<boolean>(false);
  const [resetErrorSnackbarOpen, setResetErrorSnackbarOpen] =
    useState<boolean>(false);
  const [resetButtonLoading, setResetButtonLoading] = useState<boolean>(false);

  const [saveSnackbarOpen, setSaveSnackbarOpen] = useState<boolean>(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState<boolean>(false);

  const { data, error, loading } = useQuiz(
    getNominationFormState.user?.staff_id
  );

  const { quizAnswerToKeyMap, quizKeysObject, quizKeysMap } = useMemo(() => {
    const quizAnsToKeyMapTemp = new Map<string, string>();
    const quizQnaKeys = data?.qna_questions.map(
      ({ quiz_question_name, answers }) => {
        const hash = hashFromString(quiz_question_name);
        answers.map((ans) =>
          quizAnsToKeyMapTemp.set(`${ans.answer_id}`, `${hash}`)
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
              quizAnsToKeyMapTemp.set(`${ans.answer_id}`, `${hash}`)
            );
            return hash;
          }
        );
        return quizRatingChildrenKeys;
      }
    );
    const quizKeys = quizQnaKeys?.concat(quizRatingKeys ?? []) ?? [];
    const quizKeysMap = new Map<string, string>();
    quizKeys.map((quizKey) => quizKeysMap.set(`${quizKey}`, ""));
    const quizKeysObject = quizKeys.reduce((acc, v) => {
      return { ...acc, [v]: "" };
    }, {});
    return {
      quizAnswerToKeyMap: quizAnsToKeyMapTemp,
      quizKeysObject: quizKeysObject,
      quizKeysMap: quizKeysMap,
    };
  }, [data?.qna_questions, data?.rating_questions]);

  const {
    draftQuizResponseData,
    draftQuizResponseError,
    draftQuizResponseLoading,
  } = useDraftQuizResponse(case_id);

  const draftQuizAnswerMap = useMemo(() => {
    const temp = new Map<string, string>();
    draftQuizResponseData?.response_list.map((quizAns) => {
      const qnKey = quizAnswerToKeyMap.get(quizAns);
      if (qnKey) {
        temp.set(qnKey, quizAns);
      }
    });
    return temp;
  }, [draftQuizResponseData?.response_list, quizAnswerToKeyMap]);

  // get previously saved quiz answer values
  const defaultQuizValues = useMemo(() => {
    return getNominationFormState.answers.size > 0
      ? Object.fromEntries(getNominationFormState.answers)
      : draftQuizResponseData &&
        draftQuizResponseData.status_code === 200 &&
        draftQuizResponseData.response_list.length > 0
      ? Object.fromEntries(draftQuizAnswerMap)
      : quizKeysObject;
  }, [
    draftQuizAnswerMap,
    draftQuizResponseData,
    getNominationFormState.answers,
    quizKeysObject,
  ]);

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<QuizKeyAnswer>({
    defaultValues: defaultQuizValues,
  });

  useEffect(() => {
    console.log("default quiz value has changed: ", defaultQuizValues);
    reset(defaultQuizValues);
  }, [defaultQuizValues, reset, getValues]);

  const handleReset = () => {
    if (user) {
      const clearedNominationFormState = {
        ...getNominationFormState,
        answers: quizKeysMap,
      };
      reset(quizKeysObject);
      setNominationFormState(clearedNominationFormState);

      //   try {
      //     const response = await upsertNominationForm(
      //       user?.staff_id,
      //       clearedNominationFormState,
      //       true,
      //       case_id ?? getNominationFormState.case_id
      //     );
      //     setResetButtonLoading(false);
      //     if (response.status_code === 200) {
      //       setNominationFormState({
      //         ...clearedNominationFormState,
      //         case_id: response.case_id,
      //       });
      //       setResetSnackbarOpen(true);
      //     } else {
      //       setResetErrorSnackbarOpen(true);
      //     }
      //   } catch (err) {
      //     console.error(err);
      //   }
      // }
    }
  };

  const onSubmit = (data: any) => {
    const mapData = new Map(Array.from(Object.entries(data)));
    const newFormData = {
      ...getNominationFormState,
      answers: mapData as Map<string, string>,
    };
    setNominationFormState(newFormData);
    handleNext();
  };

  const handleSave = async () => {
    if (!user) {
      console.error("user not logged in!");
    } else {
      setSaveButtonLoading(true);
      const data = getValues();
      const mapData = new Map(Array.from(Object.entries(data)));
      try {
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
        setSaveButtonLoading(false);
        if (response.status_code === 200) {
          setNominationFormState({
            ...newFormData,
            case_id: response.case_id,
          });
          setSaveSnackbarOpen(true);
        } else {
          setErrorSnackbarOpen(true);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

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
      {data && (Object.keys(getValues()).length > 0 || !case_id) ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"column"} spacing={3} mb={8}>
            {data?.qna_questions.map(({ quiz_question_name, answers }) => (
              <NominationQuestion
                control={control}
                key={`qn ${quiz_question_name}`}
                question={quiz_question_name}
                questionName={`${hashFromString(quiz_question_name)}`}
                answers={answers}
                isEdit={isEdit}
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
                        isEdit={isEdit}
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
                loading={resetButtonLoading}
              >
                Reset form
              </PrimaryButton>
              <PrimaryButton
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
      <FeedbackSnackbar
        successOpen={resetSnackbarOpen}
        setSuccessOpen={setResetSnackbarOpen}
        successMsg="Successfully reset nomination quiz answers."
        errorOpen={resetErrorSnackbarOpen}
        setErrorOpen={setResetErrorSnackbarOpen}
        errorMsg="Error occurred while trying to reset your nomination quiz answers! Please try again."
      />
    </Box>
  );
}
