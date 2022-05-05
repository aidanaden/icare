import { DensityMedium } from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  Box,
  InputBase,
  styled,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  // backgroundColor: theme.palette.background.paper,
  justifyContent: "center",
  boxShadow: theme.shadows[0],
  backgroundColor: "rgba(255,255,255,.7)",
  backdropFilter: "blur(10px)",
  [theme.breakpoints.up("lg")]: {
    left: 280,
    width: "calc(100% - 280px)",
  },
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "grey.100",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

interface NavbarProps extends AppBarProps {
  handleClick: () => void;
}

export default function Navbar({ handleClick, ...other }: NavbarProps) {
  return (
    <DashboardNavbarRoot
      sx={{
        height: { xs: 72, md: 64 },
      }}
      {...other}
    >
      <StyledToolbar>
        <IconButton
          size="large"
          edge="start"
          sx={{
            display: { xs: "flex", lg: "none" },
            justifyContent: "center",
          }}
          aria-label="open-sidebar"
          onClick={handleClick}
        >
          <DensityMedium />
        </IconButton>
        {/* <Search>
          <InputBase placeholder="search..." />
        </Search> */}
      </StyledToolbar>
    </DashboardNavbarRoot>
  );
}
