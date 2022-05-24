import { TypographyProps, Typography } from "@mui/material";

interface UserDetailTextProps extends TypographyProps {
  isMultiLine?: boolean;
}

export default function index({
  isMultiLine,
  children,
  ...props
}: UserDetailTextProps) {
  return (
    <Typography
      variant="body2"
      fontWeight={500}
      fontSize="16px"
      color="#212b36"
      textTransform="capitalize"
      noWrap={!isMultiLine}
      // maxWidth={isMultiLine ? "100%" : 160}
      {...props}
    >
      {children}
    </Typography>
  );
}
