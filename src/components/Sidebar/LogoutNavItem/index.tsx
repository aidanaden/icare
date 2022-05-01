import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Logout } from "@mui/icons-material";
import React from "react";
import SidebarListItem from "../SidebarListItem";

export default function index() {
  return (
    <>
      <SidebarListItem>
        <ListItemButton
          // startIcon={icon}
          onClick={() => console.log("log out!")}
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
    </>
  );
}
