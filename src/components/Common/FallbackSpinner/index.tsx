import { Box, BoxProps, CircularProgress } from "@mui/material";
import React from "react";

export default function FallbackSpinner({ ...other }: BoxProps) {
  console.log("rendinger fallback spinner");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: "1 1 auto",
        flexDirection: "column",
        width: "100%",
      }}
      height="calc(100vh - 160px)"
      {...other}
    >
      <CircularProgress />
    </Box>
  );
}
