import { BoxProps } from "@mui/material/Box";
import BasicBadge from "../BasicBadge";

export default function index({ children, ...other }: BoxProps) {
  return (
    <BasicBadge color="#ffc107" bgcolor="#fffaeb" {...other}>
      {children}
    </BasicBadge>
  );
}
