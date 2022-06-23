import { Box, Typography } from "@mui/material";
import React from "react";

export default function Unauthorized() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: "1 1 auto",
        flexDirection: "column",
        height: "calc(100vh - 240px)",
      }}
    >
      <Typography
        fontWeight={600}
        fontSize={{ xs: "32px", md: "48px" }}
        textAlign="center"
        gutterBottom
      >
        Unauthorized Access
      </Typography>
      <Typography fontWeight={500} textAlign="center">
        Please contact the IT team for help if you are a Head of Department or
        you are an ICare Committee Member.
      </Typography>
    </Box>
  );
}
