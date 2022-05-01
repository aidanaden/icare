import { NavItemProps } from "@/interfaces";
import { Article, Person, Dashboard, Login } from "@mui/icons-material";
import { Box, Drawer, List, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import LogoutNavItem from "./LogoutNavItem";
import NavItem from "./NavItem";
import NextImage from "next/image";

const items: NavItemProps[] = [
  {
    href: "/dashboard",
    icon: <Dashboard fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/nominations",
    icon: <Article fontSize="small" />,
    title: "My Nominations",
  },
  // {
  //   href: "/nominations",
  //   icon: <Article fontSize="small" />,
  //   title: "My Nominations",
  //   items: [
  //     {
  //       href: "/nominations/all",
  //       icon: "•",
  //       title: "All",
  //     },
  //     {
  //       href: "/nominations/incomplete",
  //       icon: "•",
  //       title: "Incomplete",
  //     },
  //     {
  //       href: "/nominations/completed",
  //       icon: "•",
  //       title: "Completed",
  //     },
  //   ],
  // },
  {
    href: "/endorsements",
    icon: <Person fontSize="small" />,
    title: "Endorsements",
  },
  {
    href: "/login",
    icon: <Login fontSize="small" />,
    title: "Login",
  },
];

const content = (
  <Box
    sx={{
      display: { xs: "none", sm: "block" },
      borderRight: 1,
      borderColor: "rgb(255,255,255,.5)",
      height: "100%",
    }}
  >
    <Box
      sx={{
        pt: 2,
        mb: { md: 2 },
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
          items={item.items}
          key={i}
        />
      ))}
    </List>
    <LogoutNavItem />
  </Box>
);

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
        {content}
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
          width: 280,
        },
      }}
      sx={{ zIndex: (theme: any) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}
