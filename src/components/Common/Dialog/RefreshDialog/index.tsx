import useAuth from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../PrimaryButton";

export default function RefreshDialog() {
  const { refreshToken } = useAuth();
  const [refreshDialogOpen, setRefreshDialogOpen] = useState<boolean>(false);
  const [refreshLoading, setRefreshLoading] = useState<boolean>(false);

  const handleRefresh = async () => {
    setRefreshLoading(true);
    try {
      const response = await refreshToken();
      if (response?.status_code == 200) {
        console.log("successfully refreshed token with resp: ", response);
      }
    } catch (err) {
      console.error("Token failed to refresh with error: ", err);
    }
    setRefreshLoading(false);
    setRefreshDialogOpen(false);
  };

  // run refreshToken api call every 10 mins
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshDialogOpen(true);
    }, 60000);

    // This represents the unmount function, in which you need
    // to clear your interval to prevent memory leaks.
    return () => clearInterval(interval);
  }, []);

  return (
    <Dialog
      open={refreshDialogOpen}
      onClose={() => setRefreshDialogOpen(false)}
    >
      <DialogContent>
        <DialogContentText>
          Do you want to continue this session?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <PrimaryButton
          variant={"outlined"}
          color="error"
          onClick={() => setRefreshDialogOpen(false)}
        >
          Cancel
        </PrimaryButton>
        <PrimaryButton onClick={handleRefresh} loading={refreshLoading}>
          Confirm
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}
