import { BoxProps } from "@mui/material";
import BasicBadge from "../BasicBadge";

export default function index({ children, ...other }: BoxProps) {
  return (
    <BasicBadge color="#637381" bgcolor="#F5F6F9" {...other}>
      {children}
    </BasicBadge>
  );
}
