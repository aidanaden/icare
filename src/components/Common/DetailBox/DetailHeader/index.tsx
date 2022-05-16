import { TypographyProps, Typography } from "@mui/material";

export default function index({ children, ...props }: TypographyProps) {
  return (
    <Typography
      variant="h4"
      mb={4}
      fontSize="20px"
      color="#212b36"
      textTransform="capitalize"
      fontWeight={700}
      {...props}
    >
      {children}
    </Typography>
  );
}
