import theme from "@/styles/theme";
import { BoxProps } from "@mui/material";
import BasicBadge from "../BasicBadge";

export default function index({ children, ...other }: BoxProps) {
  return (
    <BasicBadge
      color={theme.palette.error.main}
      bgcolor={theme.palette.error.light}
      {...other}
    >
      {children}
    </BasicBadge>
  );
}
