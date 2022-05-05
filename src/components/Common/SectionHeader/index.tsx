import { Typography, TypographyProps } from "@mui/material";

export default function index({ children, ...other }: TypographyProps) {
  return (
    <Typography
      variant="h2"
      fontWeight={700}
      fontSize={{ xs: "20px", md: "24px" }}
      {...other}
    >
      {children}
    </Typography>
  );
}
