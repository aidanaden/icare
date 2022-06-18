import { BoxProps } from "@mui/material/Box";
import BasicBadge from "../BasicBadge";
import { deepOrange } from "@mui/material/colors";

export default function index({ children, ...other }: BoxProps) {
  return (
    <BasicBadge color={deepOrange[400]} bgcolor={deepOrange[50]} {...other}>
      {children}
    </BasicBadge>
  );
}
