import { Delete } from "@mui/icons-material";
import { styled } from "@mui/material";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";

const StyledMenuItem = styled((props: MenuItemProps) => (
  <MenuItem {...props} />
))(({ theme }) => ({}));

const ErrorStyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.error.main,
}));

export default function index({ onClick, children, ...other }: MenuItemProps) {
  return (
    <ErrorStyledMenuItem onClick={onClick} {...other}>
      {children}
    </ErrorStyledMenuItem>
  );
}
