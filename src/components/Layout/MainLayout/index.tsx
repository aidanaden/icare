import RefreshDialog from "@/components/Common/Dialog/RefreshDialog";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import useAuth from "@/hooks/useAuth";
import { Box, BoxProps, Container, styled } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
  const { user, validateToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function validateUser() {
      const validated = await validateToken();
      if (!validated) {
        router.push("/login");
        return;
      }
      if (router.pathname === "/") {
        router.push("/dashboard");
        return;
      }
    }
    validateUser();
  }, []);

  return (
    <>
      {user && !router.pathname.includes("login") ? (
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
          <Navbar handleSidebar={() => setSidebarOpen(true)} />
          <Sidebar
            open={isSidebarOpen}
            onOpen={() => setSidebarOpen(true)}
            onClose={() => setSidebarOpen(false)}
          />
          <RefreshDialog />
        </Box>
      ) : (
        <Box {...other}>
          <LoginLayout>{children}</LoginLayout>
        </Box>
      )}
    </>
  );
}
