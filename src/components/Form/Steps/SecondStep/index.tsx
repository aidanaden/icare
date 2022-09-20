import { Box, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import MD5 from "crypto-js/md5";

import PrimaryButton from "@/components/Common/PrimaryButton";
import SectionHeader from "@/components/Common/SectionHeader";
import SectionSubtitle from "@/components/Common/SectionSubtitle";
import NominationQuestion from "../../Common/NominationQuestion";
import { RecoilState, useRecoilState, useResetRecoilState } from "recoil";
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
import SubmitDialog from "./SubmitDialog";

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
  const router = useRouter();

  const [getNominationFormState, setNominationFormState] = useRecoilState(
    isEdit ? editNominationFormState : newNominationFormState
  );

  const resetFormState = useResetRecoilState(recoilFormState);

  const [resetSnackbarOpen, setResetSnackbarOpen] = useState<boolean>(false);
  const [resetErrorSnackbarOpen, setResetErrorSnackbarOpen] =
    useState<boolean>(false);
  const [resetButtonLoading, setResetButtonLoading] = useState<boolean>(false);

  const [saveSnackbarOpen, setSaveSnackbarOpen] = useState<boolean>(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState<boolean>(false);

  const [submitDialogOpen, setSubmitDialogOpen] = useState<boolean>(false);
  const [submitSuccessSnackbarOpen, setSubmitSuccessSnackbarOpen] =
    useState<boolean>(false);
  const [submitErrorSnackbarOpen, setSubmitErrorSnackbarOpen] =
    useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const pageId: string | undefined = router.query.case_id as string | undefined;
  const caseId = pageId ?? case_id;

  const { data, error, loading } = useQuiz(
    getNominationFormState.user?.staff_id
  );

  const { quizAnswerToKeyMap, quizKeysObject, quizKeysMap } = useMemo(() => {
    const quizAnsToKeyMapTemp = new Map<string, string>();
    const quizQnaKeys = data?.qna_questions.map(
      ({ quiz_question_name, answers }) => {
        const hash = MD5(quiz_question_name).toString();
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
            const hash = MD5(child_quiz_question_name).toString();
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
  } = useDraftQuizResponse(caseId);

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
    const defaultQuizValuesArr = Object.values(defaultQuizValues);
    if (defaultQuizValuesArr.length === 0) {
      return;
    }
    if (defaultQuizValuesArr.some((v) => v === undefined)) {
      return;
    }
    reset(defaultQuizValues);
  }, [defaultQuizValues]);

  const handleReset = () => {
    if (user) {
      setNominationFormState((currentState) => {
        return { ...currentState, answers: quizKeysMap };
      });
      reset(quizKeysObject);
    }
  };

  const onSubmit = async (data: any) => {
    const mapData = new Map(Array.from(Object.entries(data)));
    const newFormData = {
      ...getNominationFormState,
      answers: mapData as Map<string, string>,
    };
    setNominationFormState(newFormData);

    if (!user) {
      console.error("user not logged in!");
      return;
    }

    setSubmitDialogOpen(true);
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
          const newNominationForm = {
            ...newFormData,
            case_id: response.case_id,
          };
          setNominationFormState(newNominationForm);
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
        </Box>
        <SectionSubtitle mb={4} color="#212b36">
          Complete the quiz and answer the questions as accurately as possible.
        </SectionSubtitle>
      </Box>
      {/* display quiz form if quiz form data fetched AND if form is new, if form
      is not new then display after saved responses are fetched */}
      {data &&
      (caseId
        ? draftQuizResponseData && Object.keys(getValues()).length > 0
        : true) ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"column"} spacing={3} mb={8}>
            {data?.qna_questions.map(({ quiz_question_name, answers }) => (
              <NominationQuestion
                control={control}
                key={`qn ${quiz_question_name}`}
                question={quiz_question_name}
                questionName={`${MD5(quiz_question_name).toString()}`}
                answers={answers}
                isEdit={isEdit}
                getValues={getValues}
              />
            ))}
            {data.rating_questions && data.rating_questions.length > 0 && (
              <Divider />
            )}
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
                        questionName={`${MD5(
                          child_quiz_question_name
                        ).toString()}`}
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
                loading={submitLoading}
              >
                Submit
              </PrimaryButton>
            </Box>
          </Stack>
        </form>
      ) : (
        <FallbackSpinner />
      )}
      <SubmitDialog
        case_id={case_id}
        open={submitDialogOpen}
        setOpen={setSubmitDialogOpen}
        getNominationFormState={getNominationFormState}
        setSubmitSuccessSnackbarOpen={setSubmitSuccessSnackbarOpen}
        setSubmitErrorSnackbarOpen={setSubmitErrorSnackbarOpen}
        resetFormState={resetFormState}
      />
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
      <FeedbackSnackbar
        successOpen={submitSuccessSnackbarOpen}
        setSuccessOpen={setSubmitSuccessSnackbarOpen}
        successMsg="Successfully submitted your nomination!"
        errorOpen={submitErrorSnackbarOpen}
        setErrorOpen={setSubmitErrorSnackbarOpen}
        errorMsg="Error occurred while trying to submit your nomination! Please try again."
      />
    </Box>
  );
}
