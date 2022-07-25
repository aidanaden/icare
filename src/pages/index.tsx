import type { NextPage } from "next";
import { CircularProgress, Box } from "@mui/material";

const Home: NextPage = () => {
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
