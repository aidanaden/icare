import CustomSnackbar from "@/components/Common/Snackbar";
import React, { Dispatch, SetStateAction } from "react";

interface FeedbackSnackbarProps {
  successOpen: boolean;
  errorOpen: boolean;
  setSuccessOpen: Dispatch<SetStateAction<boolean>>;
  setErrorOpen: Dispatch<SetStateAction<boolean>>;
  successMsg: string;
  errorMsg: string;
}

export default function FeedbackSnackbar({
  successOpen,
  errorOpen,
  setSuccessOpen,
  setErrorOpen,
  successMsg,
  errorMsg,
}: FeedbackSnackbarProps) {
  return (
    <>
      <CustomSnackbar
        open={successOpen}
        setOpen={setSuccessOpen}
        severity="success"
        message={successMsg}
      />
      <CustomSnackbar
        open={errorOpen}
        setOpen={setErrorOpen}
        severity="error"
        message={errorMsg}
      />
    </>
  );
}
