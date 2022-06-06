import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import useAuth from "@/hooks/useAuth";
import { Box, BoxProps, Container, styled } from "@mui/material";
import React, { useState } from "react";
import LoginLayout from "../LoginLayout/";

const MainLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 100,
  paddingBottom: 32,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
    paddingTop: 148,
  },
}));

export default function MainLayout({ children, ...other }: BoxProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  if (user) {
    return (
      <Box {...other}>
        <MainLayoutRoot>
          <Container
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {children}
          </Container>
        </MainLayoutRoot>
        <Navbar
          handleSidebar={() => setSidebarOpen(true)}
          handleNomination={() => console.log("handling nomination!")}
          handleLogin={() => console.log("handling login!")}
        />
        <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        {/* <Navbar onSidebarOpen={() => setSidebarOpen(true)} /> */}
        {/* <Sidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} /> */}
      </Box>
    );
  } else {
    return <LoginLayout>{children}</LoginLayout>;
  }
}
