import { BASE_URL } from "@/constants";
import useAuth from "@/hooks/useAuth";
import useInterval from "@/hooks/useInterval";
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

  const resetLogoutInterval = useInterval(async () => {
    try {
      const response = await logout();
      if (response?.status_code === 200) {
        window.location.replace(BASE_URL);
      }
    } catch (err) {
      console.error("error occurred while logging out: ", err);
    }
  }, 900000);

  const resetRefreshDialogInterval = useInterval(() => {
    setRefreshDialogOpen(true);
  }, 720000);

  const handleRefresh = async () => {
    setRefreshLoading(true);
    try {
      const response = await refreshToken();
    } catch (err) {
      console.error("Token failed to refresh with error: ", err);
    }
    setRefreshLoading(false);
    setRefreshDialogOpen(false);
    resetRefreshDialogInterval();
    resetLogoutInterval();
  };

  const handleClose = async () => {
    setRefreshDialogOpen(false);
    try {
      const response = await logout();
      if (response?.status_code === 200) {
        window.location.replace(BASE_URL);
      }
    } catch (err) {
      console.error("error occurred while logging out: ", err);
    }
  };

  const resetRefreshLogoutIntervals = () => {
    console.log("resetting refresh dialog and logout intervals");
    resetRefreshDialogInterval();
    resetLogoutInterval();
  };

  window.addEventListener("mousemove", resetRefreshLogoutIntervals);
  // useEffect(() => {
  //   return window.removeEventListener("mousemove", resetRefreshLogoutIntervals);
  // }, []);

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
