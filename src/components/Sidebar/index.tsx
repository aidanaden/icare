import {
  Create,
  Article,
  ThumbUp,
  Dashboard,
  Login,
  People,
} from "@mui/icons-material";
import { Box, Drawer, List, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import LogoutNavItem from "./LogoutNavItem";
import NavItem, { NavItemProps } from "./NavItem";
import NextImage from "next/image";

// const items: NavItemProps[] = [
//   {
//     href: "/dashboard",
//     icon: <Dashboard fontSize="small" />,
//     title: "Dashboard",
//   },
//   {
//     href: "/nominations",
//     icon: <Article fontSize="small" />,
//     title: "My Nominations",
//   },
//   {
//     href: "/nominations",
//     icon: <Article fontSize="small" />,
//     title: "My Nominations",
//     items: [
//       {
//         href: "/nominations/all",
//         icon: "•",
//         title: "All",
//       },
//       {
//         href: "/nominations/incomplete",
//         icon: "•",
//         title: "Incomplete",
//       },
//       {
//         href: "/nominations/completed",
//         icon: "•",
//         title: "Completed",
//       },
//     ],
//   },
//   {
//     href: "/endorsements",
//     icon: <Person fontSize="small" />,
//     title: "Endorsements",
//   },
//   {
//     href: "/login",
//     icon: <Login fontSize="small" />,
//     title: "Login",
//   },
// ];

const items = [
  {
    href: "/dashboard",
    icon: <Dashboard fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/nominations/new",
    icon: <Create fontSize="small" />,
    title: "New Nomination",
  },
  {
    href: "/nominations",
    icon: <Article fontSize="small" />,
    title: "My Nominations",
  },
  {
    href: "/endorsements",
    icon: <ThumbUp fontSize="small" />,
    title: "Endorsements",
  },
  {
    href: "/committee",
    icon: <People fontSize="small" />,
    title: "Committee",
  },
  {
    href: "/login",
    icon: <Login fontSize="small" />,
    title: "Login",
  },
];

interface ContentProps {
  onClose: (event: unknown, reason: "backdropClick" | "escapeKeyDown") => void;
}

const Content = ({ onClose }: ContentProps) => {
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
        {items.map((item, i) => (
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
  const router = useRouter();
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
        <Content onClose={onClose} />
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
      <Content onClose={onClose} />
    </Drawer>
  );
}
