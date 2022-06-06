import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image"
import { CircularProgress, Box } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  // const router = useRouter();
  // const { user } = useAuth();
  // if (user) {
  //   router.push("/dashboard");
  // } else {
  //   router.push("/login");
  // }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: "1 1 auto",
        flexDirection: "column",
        height: "calc(100vh - 160px)",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Home;
