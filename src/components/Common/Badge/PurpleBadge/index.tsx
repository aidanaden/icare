import { BoxProps } from "@mui/material/Box";
import BasicBadge from "../BasicBadge";

export default function index({ children, ...other }: BoxProps) {
  return (
    <BasicBadge color="#9c27b0" bgcolor="#f3e5f5" {...other}>
      {children}
    </BasicBadge>
  );
}
