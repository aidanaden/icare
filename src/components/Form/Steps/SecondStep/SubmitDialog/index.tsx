import PrimaryButton from "@/components/Common/PrimaryButton";
import useAuth from "@/hooks/useAuth";
import { NominationFormSubmissionData } from "@/interfaces";
import { upsertNominationForm } from "@/lib/nominations";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import router from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { Resetter } from "recoil";

interface SubmitDialogProps {
  case_id?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  getNominationFormState: NominationFormSubmissionData;
  setSubmitSuccessSnackbarOpen: Dispatch<SetStateAction<boolean>>;
  setSubmitErrorSnackbarOpen: Dispatch<SetStateAction<boolean>>;
  resetFormState: Resetter;
}

export default function SubmitDialog({
  case_id,
  open,
  setOpen,
  getNominationFormState,
  setSubmitSuccessSnackbarOpen,
  setSubmitErrorSnackbarOpen,
  resetFormState,
}: SubmitDialogProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = async () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!user) {
      console.error("user is not logged in");
      return;
    }

    try {
      const response = await upsertNominationForm(
        user?.staff_id,
        getNominationFormState,
        false,
        case_id ?? getNominationFormState.case_id
      );
      if (response.status_code === 200) {
        setSubmitSuccessSnackbarOpen(true);
        resetFormState();
        setTimeout(() => {
          router.push("/nominations");
        }, 1500);
      } else {
        setSubmitErrorSnackbarOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>
          Do you want to submit this nomination?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <PrimaryButton variant={"outlined"} color="error" onClick={handleClose}>
          Cancel
        </PrimaryButton>
        <PrimaryButton onClick={handleSubmit} loading={loading}>
          Confirm
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}
