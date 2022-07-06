import FeedbackSnackbar from "@/components/Form/Common/FeedbackSnackbar";
import useAuth from "@/hooks/useAuth";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import PrimaryButton from "../../PrimaryButton";
import SectionSubtitle from "../../SectionSubtitle";
import StyledTextField from "../../StyledTextField";

export default function ForgetPasswordDialog() {
  const { forgetPassword } = useAuth();
  const [staffId, setStaffId] = useState("");
  const [staffIdError, setStaffIdError] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    if (staffId.length === 0) {
      setStaffIdError(true);
      return;
    }

    setLoading(true);
    try {
      const responseStatus = await forgetPassword(staffId);
      setLoading(false);
      if (responseStatus === 200 || responseStatus === 202) {
        setSuccessOpen(true);
      } else {
        setErrorOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
    handleClose();
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    setStaffId(newValue);
    if (newValue.length !== 0) {
      setStaffIdError(false);
    }
  };

  return (
    <>
      <PrimaryButton variant={"outlined"} onClick={handleOpen}>
        Forget password?
      </PrimaryButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Forget password</DialogTitle>
        <DialogContent>
          <SectionSubtitle mb={4}>
            Please enter your staff ID here and we will send you an email
            reminder.
          </SectionSubtitle>
          <StyledTextField
            sx={{ flexGrow: 1 }}
            size="medium"
            color="secondary"
            id="staff_id"
            label={"Staff ID"}
            helperText={staffIdError ? "Please enter your staff ID" : ""}
            error={staffIdError}
            required
            placeholder="Enter your staff ID..."
            fullWidth
            value={staffId}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <PrimaryButton
            variant={"outlined"}
            color="error"
            onClick={handleClose}
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton onClick={onSubmit} loading={loading}>
            Submit
          </PrimaryButton>
        </DialogActions>
      </Dialog>
      <FeedbackSnackbar
        successOpen={successOpen}
        errorOpen={errorOpen}
        setSuccessOpen={setSuccessOpen}
        setErrorOpen={setErrorOpen}
        successMsg="Successfully sent email reminder."
        errorMsg="Error occurred while sending email reminder. Please try again."
      />
    </>
  );
}
