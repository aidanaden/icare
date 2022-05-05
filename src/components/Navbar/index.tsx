import { Add, DensityMedium } from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  styled,
  Toolbar,
  IconButton,
  Stack,
} from "@mui/material";
import PrimaryButton from "../Common/PrimaryButton";

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
  handleSidebar: () => void;
  handleNomination: () => void;
  handleLogin: () => void;
}

export default function Navbar({
  handleSidebar,
  handleLogin,
  handleNomination,
  ...other
}: NavbarProps) {
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
          onClick={handleSidebar}
        >
          <DensityMedium />
        </IconButton>
        <Stack
          justifyContent="space-between"
          flexDirection="row"
          width="100%"
          maxWidth="1150px"
          mx="auto"
        >
          <PrimaryButton
            sx={{
              marginLeft: { xs: "auto" },
              textTransform: "capitalize",
              borderRadius: "6px",
            }}
            size="large"
            endIcon={<Add />}
          >
            Create nomination
          </PrimaryButton>
        </Stack>
      </StyledToolbar>
    </DashboardNavbarRoot>
  );
}
