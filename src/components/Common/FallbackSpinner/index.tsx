import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function ErrorFallback() {
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
}
