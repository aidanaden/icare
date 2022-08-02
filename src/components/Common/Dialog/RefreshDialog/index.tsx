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
  const { sessionTokenStart, refreshToken, logout } = useAuth();
  const [mouseLastMoved, setMouseLastMoved] = useState<Date>(() => new Date());
  const [refreshDialogOpen, setRefreshDialogOpen] = useState<boolean>(false);
  const [refreshLoading, setRefreshLoading] = useState<boolean>(false);

  const resetLogoutInterval = useInterval(async () => {
    try {
      const response = await logout();
      if (response?.status_code === 200) {
        window.location.replace(BASE_URL as string);
      }
    } catch (err) {
      console.error("error occurred while logging out: ", err);
    }
  }, 15 * 60 * 1000);

  const resetRefreshDialogInterval = useInterval(() => {
    setRefreshDialogOpen(true);
  }, 12 * 60 * 1000);

  const handleRefresh = async () => {
    setRefreshLoading(true);
    try {
      const response = await refreshToken();
      resetRefreshDialogInterval();
      resetLogoutInterval();
    } catch (err) {
      console.error("Token failed to refresh with error: ", err);
    }
    setRefreshLoading(false);
    setRefreshDialogOpen(false);
  };

  const resetRefreshInterval = useInterval(async () => {
    if (mouseLastMoved < new Date(Date.now() - 30 * 1000)) {
      // mouse last moved more than 30s ago
      // console.log("no activity detected in past 30s, skipping refresh...");
      return;
    }

    try {
      // console.log("refreshing token due to activity detected");
      const response = await refreshToken();
      resetRefreshDialogInterval();
      resetLogoutInterval();
    } catch (err) {
      console.error("Token failed to refresh with error: ", err);
    }
  }, 5 * 60 * 1000);

  const handleClose = async () => {
    setRefreshDialogOpen(false);
    try {
      const response = await logout();
      if (response?.status_code === 200) {
        window.location.replace(BASE_URL as string);
      }
    } catch (err) {
      console.error("error occurred while logging out: ", err);
    }
  };

  const resetRefreshLogoutIntervals = () => {
    // if mouse last moved 5 mins ago, refresh token automatically
    // every 15 mins + reset refresh dialog interval
    setMouseLastMoved(new Date());
    // if mouse not moved for 5 mins or more, DO NOT reset refresh dialog interval
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
