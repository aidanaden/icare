import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/router";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

import SubNavItem from "../SubNavItem";
import StyledListItemButton from "../StyledListItemButton";
import NextMuiLink from "@/components/Common/NextMuiLink";

export interface NavItemProps {
  href: string;
  icon: any;
  title: string;
  items?: NavItemProps[];
  onClose: (event: unknown, reason: "backdropClick" | "escapeKeyDown") => void;
}

export default function NavItem(props: NavItemProps) {
  const [open, setOpen] = useState(false);
  const { href, icon, title, items, onClose } = props;
  const router = useRouter();
  const active = href
    ? router.pathname.replace("/", "").includes(href.replace("/", ""))
    : false;

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          display: "flex",
          mb: 1,
          py: 0,
          px: 2,
        }}
        //   {...others}
      >
        <NextMuiLink href={href} width="100%" variant="button" borderRadius={2}>
          <StyledListItemButton
            active={active}
            onClick={onClose as MouseEventHandler<HTMLDivElement>}
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
          </StyledListItemButton>
        </NextMuiLink>
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
