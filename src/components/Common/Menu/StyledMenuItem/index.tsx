import { styled } from "@mui/material";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 500,
}));

export default function index({ onClick, children, ...other }: MenuItemProps) {
  return (
    <StyledMenuItem onClick={onClick} {...other}>
      {children}
    </StyledMenuItem>
  );
}
