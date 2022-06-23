import { Typography } from "@mui/material";
import React from "react";
import LoginLayout from "../../Layout/LoginLayout";

interface ErrorFallbackProps {
  error: Error;
}

export default function ErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <LoginLayout>
      <Typography>{error.message}</Typography>
      <Typography>
        Error has occured, please refresh this page and try again.
      </Typography>
    </LoginLayout>
  );
}
