import { Typography, TypographyProps } from "@mui/material";

export default function index({ children, ...other }: TypographyProps) {
  return (
    <Typography
      variant="subtitle2"
      color="#637381"
      fontSize={"16px"}
      fontWeight={400}
      {...other}
    >
      {children}
    </Typography>
  );
}
