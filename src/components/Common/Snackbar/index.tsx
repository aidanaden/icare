import {
  Stack,
  Button,
  Snackbar,
  Alert,
  SnackbarProps,
  AlertColor,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface CustomSnackbarProps extends SnackbarProps {
  message: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  severity?: AlertColor;
}

export default function CustomSnackbar({
  message,
  setOpen,
  severity,
  ...props
}: CustomSnackbarProps) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar autoHideDuration={6000} onClose={handleClose} {...props}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
