import { ListItemButton, ListItemButtonProps, styled } from "@mui/material";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  justifyContent: "flex-start",
  textAlign: "left",
  textTransform: "capitalize",
  width: "100%",
}));

interface StyledListItemButtonProps extends ListItemButtonProps {
  active: boolean;
}

export default function index({
  onClick,
  active,
  children,
  ...other
}: StyledListItemButtonProps) {
  return (
    <StyledListItemButton
      onClick={onClick}
      sx={{
        px: 3,
        py: { lg: 0.75 },
        borderRadius: 2,
        backgroundColor: active ? "secondary.main" : "white",
        color: active ? "white" : "secondary.main",
        "& .MuiListItemIcon-root": {
          color: active ? "white" : "secondary.main",
          mr: -2,
        },
        "& .MuiListItemText-primary": {
          fontWeight: active ? 600 : 500,
          fontSize: { xs: 18, md: 14 },
        },
        "&:hover": {
          backgroundColor: !active ? "secondary.light" : "secondary.main",
          color: !active ? "secondary.main" : "white",
          "& .MuiListItemIcon-root": {
            color: !active ? "secondary.main" : "white",
          },
          transitionDuration: 300,
        },
      }}
      {...other}
    >
      {children}
    </StyledListItemButton>
  );
}
