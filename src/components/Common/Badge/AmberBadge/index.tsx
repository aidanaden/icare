import { BoxProps } from "@mui/material/Box";
import BasicBadge from "../BasicBadge";
import { amber } from "@mui/material/colors";

export default function index({ children, ...other }: BoxProps) {
  return (
    <BasicBadge color={amber[600]} bgcolor={amber[50]} {...other}>
      {children}
    </BasicBadge>
  );
}
