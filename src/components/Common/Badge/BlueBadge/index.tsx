import { BoxProps } from "@mui/material";
import BasicBadge from "../BasicBadge";

export default function index({ children, ...other }: BoxProps) {
  return (
    <BasicBadge color="secondary.main" bgcolor="secondary.light" {...other}>
      {children}
    </BasicBadge>
  );
}
