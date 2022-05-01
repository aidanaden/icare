import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

import { NavItemProps } from "@/interfaces";
import SubNavItem from "../SubNavItem";

export default function NavItem(props: NavItemProps) {
  const [open, setOpen] = useState(false);
  const { href, icon, title, items } = props;
  const router = useRouter();
  const active = href
    ? router.pathname.replace("/", "").includes(href.replace("/", ""))
    : false;

  const handleClick = () => {
    if (items) {
      setOpen(!open);
    } else {
      router.push(href!);
    }
  };

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          display: "flex",
          mb: 1,
          py: 0,
          px: 2,
          // width: 280,
        }}
        //   {...others}
      >
        <ListItemButton
          // startIcon={icon}
          onClick={handleClick}
          // disableRipple
          sx={{
            backgroundColor: active ? "secondary.main" : "white",
            borderRadius: 2,
            color: active ? "white" : "secondary.main",
            justifyContent: "flex-start",
            px: 3,
            py: 0.75,
            textAlign: "left",
            textTransform: "capitalize",
            width: "100%",
            "& .MuiListItemIcon-root": {
              color: active ? "white" : "secondary.main",
              mr: -2,
            },
            "& .MuiListItemText-primary": {
              fontWeight: active ? "bold" : 500,
              fontSize: 14,
            },
            "&:hover": {
              backgroundColor: !active ? "secondary.light" : "secondary.main",
              color: !active ? "secondary.main" : "white",
              "& .MuiListItemIcon-root": {
                color: !active ? "secondary.main" : "white",
              },
              transitionDuration: 300,
            },
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText sx={{ flexGrow: 1, py: 0.5 }} primary={title} />
          {items && open ? (
            <ExpandLess />
          ) : items && !open ? (
            <ExpandMore />
          ) : (
            <></>
          )}
        </ListItemButton>
      </ListItem>
      {items && (
        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {items.map((subItem, i) => (
              <SubNavItem
                key={`sub ${i}`}
                subItem={subItem}
                setOpen={setOpen}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}
