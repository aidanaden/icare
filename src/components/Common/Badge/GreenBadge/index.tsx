import { BoxProps } from "@mui/material/Box";
import BasicBadge from "../BasicBadge";

export default function index({ children, ...other }: BoxProps) {
  return (
    <BasicBadge color="#269D1A" bgcolor="#E5F9DD" {...other}>
      {children}
    </BasicBadge>
  );
}
