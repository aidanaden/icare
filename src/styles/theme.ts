import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
  palette: {
    primary: {
      main: "#019CDE",
    },
    secondary: {
      main: "#019CDE",
      light: "#ECF9FF",
    },
    error: {
      main: red.A400,
      light: red[50],
    },
    action: {
      hover: "#F5F6F9",
    },
  },
});

theme.shadows.push(
  "0 6px 20px 0 rgba(0, 0, 0, 0.03), 0 6px 20px 0 rgba(0, 0, 0, 0.03)"
);

export default theme;
