import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ChildrenProps } from "@/interfaces";
import { Box, BoxProps, Container, styled } from "@mui/material";
import React, { useState } from "react";

const MainLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 100,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
    paddingTop: 148,
  },
}));

export default function index({ children, ...other }: BoxProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
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
      <Navbar />
      <Sidebar open={false} onClose={() => console.log("close")} />
      {/* <Navbar onSidebarOpen={() => setSidebarOpen(true)} /> */}
      {/* <Sidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} /> */}
    </Box>
  );
}
