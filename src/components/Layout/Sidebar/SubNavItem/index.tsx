import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";
import { NavItemProps } from "../NavItem";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import SidebarListItem from "../SidebarListItem";
import { Url } from "url";

interface SubNavItemProps {
  subItem: NavItemProps;
  setOpen: any;
}

export default function SubNavItem(props: SubNavItemProps) {
  const { subItem, setOpen } = props;
  const { href, icon, title } = subItem;
  const router = useRouter();
  const active = href ? router.pathname === `${href}` : false;

  useEffect(() => {
    if (active) {
      setOpen(true);
    }
  }, [active]);

  return (
    <SidebarListItem>
      <ListItemButton
        sx={{
          backgroundColor: active ? "grey.100" : "white",
          borderRadius: 2,
          color: active ? "grey.700" : "grey.500",
          justifyContent: "flex-start",
          px: 4,
          py: 0.75,
          textAlign: "left",
          textTransform: "capitalize",
          width: "100%",
          "& .MuiListItemIcon-root": {
            color: active ? "secondary.main" : "grey.500",
            mr: -3,
          },
          "& .MuiListItemText-primary": {
            fontWeight: active ? "bold" : "regular",
            fontSize: 14,
          },
          "&:hover": {
            backgroundColor: "grey.100",
            // color: "grey.",
            // "& .MuiListItemIcon-root": {
            //   color: "secondary.main",
            // },
            transitionDuration: 300,
          },
        }}
        onClick={() => router.push(href!)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </SidebarListItem>
  );
}
