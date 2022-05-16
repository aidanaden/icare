import { TypographyProps, Typography } from "@mui/material";

export default function index({ children, ...props }: TypographyProps) {
  return (
    <Typography
      variant="body2"
      fontWeight={600}
      fontSize="12px"
      color="#8C9AA6"
      textTransform="uppercase"
      mb={1}
      letterSpacing={0.25}
      {...props}
    >
      {children}
    </Typography>
  );
}
