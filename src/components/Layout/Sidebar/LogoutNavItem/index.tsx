import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Logout } from "@mui/icons-material";
import React, { useState } from "react";
import SidebarListItem from "../SidebarListItem";
import useAuth from "@/hooks/useAuth";
import FeedbackSnackbar from "@/components/Form/Common/FeedbackSnackbar";
import { BASE_URL } from "@/constants";

export default function LogoutNavItem() {
  const { logout } = useAuth();

  const [logoutSuccessOpen, setLogoutSuccessOpen] = useState<boolean>(false);
  const [logoutErrorOpen, setLogoutErrorOpen] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const response = await logout();
      if (response?.status_code === 200) {
        setLogoutSuccessOpen(true);
        setLogoutLoading(false);
        setTimeout(() => {
          window.location.replace(BASE_URL as string);
        }, 1500);
      }
    } catch (err) {
      console.error("error occurred while logging out: ", err);
      setLogoutErrorOpen(true);
    }
  };

  return (
    <>
      <SidebarListItem>
        <ListItemButton
          // startIcon={icon}
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: "grey.600",
            justifyContent: "flex-start",
            px: 3,
            py: 0.75,
            textAlign: "left",
            textTransform: "capitalize",
            width: "100%",
            "& .MuiListItemIcon-root": {
              color: "grey.600",
              mr: -2,
            },
            "& .MuiListItemText-primary": {
              fontWeight: "medium",
              fontSize: 14,
            },
            "&:hover": {
              backgroundColor: "grey.100",
              color: "grey.800",
              "& .MuiListItemIcon-root": {
                color: "grey.800",
              },
              transitionDuration: 300,
            },
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText sx={{ flexGrow: 1, py: 0.5 }} primary="Log out" />
        </ListItemButton>
      </SidebarListItem>
      <FeedbackSnackbar
        successOpen={logoutSuccessOpen}
        errorOpen={logoutErrorOpen}
        setSuccessOpen={setLogoutSuccessOpen}
        setErrorOpen={setLogoutErrorOpen}
        successMsg="Successfully logged out!"
        errorMsg="Error occurred when trying to log out. Please try again."
      />
    </>
  );
}
