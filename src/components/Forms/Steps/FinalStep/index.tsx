import { TextField, Box, Stack } from "@mui/material";
import { useContext, useCallback, useState, Dispatch } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "@/components/Common/PrimaryButton";
import SectionHeader from "@/components/Common/SectionHeader";
import SectionSubtitle from "@/components/Common/SectionSubtitle";
import { RecoilState, useRecoilState, useResetRecoilState } from "recoil";
import { NominationFormSubmissionData } from "@/interfaces";
import { upsertNominationForm } from "@/lib/nominations";
import useAuth from "@/hooks/useAuth";
import CustomSnackbar from "@/components/Common/Snackbar";
import { useRouter } from "next/router";
import FeedbackSnackbar from "../../Common/FeedbackSnackbar";

interface FinalStepProp {
  recoilFormState: RecoilState<NominationFormSubmissionData>;
  handleBack: () => void;
  case_id?: string;
}

export default function FinalStep({
  recoilFormState,
  handleBack,
  case_id,
}: FinalStepProp) {
  const router = useRouter();
  const { user } = useAuth();
  const [getNominationFormState, setNominationFormState] =
    useRecoilState(recoilFormState);
  const resetFormState = useResetRecoilState(recoilFormState);
  const [successSnackbarOpen, setSuccessSnackbarOpen] =
    useState<boolean>(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const handleFinalFormSubmit = async () => {
    if (!user) {
      console.error("user not logged in!");
    } else {
      setSubmitLoading(true);
      try {
        const response = await upsertNominationForm(
          user?.staff_id,
          getNominationFormState,
          false,
          case_id ?? getNominationFormState.case_id
        );
        if (response.status_code === 200) {
          setSuccessSnackbarOpen(true);
          resetFormState();
          setTimeout(() => {
            router.push("/nominations");
          }, 2500);
        } else {
          setErrorSnackbarOpen(true);
        }
      } catch (err) {
        console.error(err);
      }
      setSubmitLoading(false);
    }
  };

  return (
    <Box width="100%">
      <Box>
        <SectionHeader mb={2} fontSize={{ xs: "24px", md: "32px" }}>
          Submit your nomination
        </SectionHeader>
        <SectionSubtitle mb={4}>
          Your nomination will be submitted to your HOD for endorsement. Please
          click submit if you’ve confirmed your answers.
        </SectionSubtitle>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        // height="100%"
        minHeight={{ sm: "340px" }}
      >
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
            onClick={handleFinalFormSubmit}
            loading={submitLoading}
          >
            Submit
          </PrimaryButton>
        </Stack>
      </Box>
      <FeedbackSnackbar
        successOpen={successSnackbarOpen}
        setSuccessOpen={setSuccessSnackbarOpen}
        successMsg="Successfully submitted your nomination!"
        errorOpen={errorSnackbarOpen}
        setErrorOpen={setErrorSnackbarOpen}
        errorMsg="Error occurred while trying to submit your nomination! Please try again."
      />
    </Box>
  );
}
