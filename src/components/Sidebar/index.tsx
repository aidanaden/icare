import {
  Create,
  Article,
  ThumbUp,
  Dashboard,
  Login,
  People,
  Person,
  Edit,
} from "@mui/icons-material";
import { Box, Drawer, List, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import LogoutNavItem from "./LogoutNavItem";
import NavItem, { NavItemProps } from "./NavItem";
import NextImage from "next/image";
import useAuth from "@/hooks/useAuth";
import { UserRole } from "@/enums";
import { useState } from "react";

interface Item {
  href: string;
  icon: JSX.Element;
  title: string;
}

const DashboardItem: Item = {
  href: "/dashboard",
  icon: <Dashboard fontSize="small" />,
  title: "Dashboard",
};

const NominationsItem: Item = {
  href: "/nominations",
  icon: <Article fontSize="small" />,
  title: "My Nominations",
};

const NewNominationItem: Item = {
  href: "/nominations/new",
  icon: <Create fontSize="small" />,
  title: "New Nomination",
};

const HodItem: Item = {
  href: "/endorsements",
  icon: <ThumbUp fontSize="small" />,
  title: "Endorsements",
};

const CommitteeItem: Item = {
  href: "/committee",
  icon: <People fontSize="small" />,
  title: "Committee",
};

interface ContentProps {
  role?: UserRole[];
  onClose: (event: unknown, reason: "backdropClick" | "escapeKeyDown") => void;
}

const Content = ({ role, onClose }: ContentProps) => {
  const [contentItems, setContentItems] = useState<Set<Item>>(
    new Set([DashboardItem])
  );

  if (role?.includes(UserRole.STAFF) || role?.includes(UserRole.HOD)) {
    contentItems.add(NewNominationItem);
  }

  contentItems.add(NominationsItem);

  if (role?.includes(UserRole.HOD)) {
    contentItems.add(HodItem);
  }

  if (role?.includes(UserRole.COMMITTEE)) {
    contentItems.add(CommitteeItem);
  }

  return (
    <Box
      sx={{
        borderRight: 1,
        borderColor: "rgb(255,255,255,.5)",
        height: "100%",
      }}
    >
      <Box
        sx={{
          pt: { xs: 6, md: 2 },
          mb: { xs: 4, md: 2 },
          justifyItems: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <NextImage src={"/logo.svg"} alt="icare logo" width={242} height={94} />
      </Box>
      <List>
        {Array.from(contentItems).map((item, i) => (
          <NavItem
            href={item.href}
            icon={item.icon}
            title={item.title}
            key={i}
            onClose={onClose}
          />
        ))}
      </List>
      <LogoutNavItem />
    </Box>
  );
};

interface SidebarProps {
  open: boolean;
  onClose: (event: unknown, reason: "backdropClick" | "escapeKeyDown") => void;
}

export default function Sidebar(props: SidebarProps) {
  const { open, onClose } = props;
  const { user } = useAuth();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: true,
  });

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        <Content role={user?.role} onClose={onClose} />
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: { xs: "80%", sm: "320px" },
        },
      }}
      sx={{ zIndex: (theme: any) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      <Content role={user?.role} onClose={onClose} />
    </Drawer>
  );
}
