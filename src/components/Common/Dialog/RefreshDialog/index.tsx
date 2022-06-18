import { BASE_URL } from "@/constants";
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
  const { refreshToken, logout } = useAuth();
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

  const handleClose = async () => {
    console.log("log out!");
    setRefreshDialogOpen(false);
    try {
      const response = await logout();
      if (response?.status_code === 200) {
        window.location.replace(BASE_URL);
      }
    } catch (err) {
      console.log("error occurred while logging out: ", err);
    }
  };

  // run refreshToken api call every 10 mins
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshDialogOpen(true);
    }, 720000); // 720000 (12 mins)

    // This represents the unmount function, in which you need
    // to clear your interval to prevent memory leaks.
    return () => clearInterval(interval);
  }, []);

  return (
    <Dialog open={refreshDialogOpen} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>
          Do you want to continue this session? (Press confirm to stay logged
          in)
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <PrimaryButton variant={"outlined"} color="error" onClick={handleClose}>
          Cancel
        </PrimaryButton>
        <PrimaryButton onClick={handleRefresh} loading={refreshLoading}>
          Confirm
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}
