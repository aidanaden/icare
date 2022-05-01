import { Typography, TypographyProps } from "@mui/material";

export default function index({ children, ...other }: TypographyProps) {
  return (
    <Typography
      variant="subtitle2"
      color="grey.500"
      fontSize={"14px"}
      {...other}
    >
      {children}
    </Typography>
  );
}
