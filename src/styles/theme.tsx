import { createTheme, OutlinedInput } from "@mui/material";
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
  components: {
    MuiFormLabel: {
      defaultProps: {
        sx: { mb: 2, color: "#637381" },
      },
    },
    MuiPopper: {
      defaultProps: {
        sx: {
          borderRadius: "6px",
          minWidth: 180,
          color: "rgb(55, 65, 81)",
          boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          PaperProps: {
            sx: {
              borderRadius: "6px",
              minWidth: 180,
              color: "rgb(55, 65, 81)",
              boxShadow:
                "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              "& .MuiMenu-list": {
                pt: "6px",
                px: "6px",
                pb: "2px",
              },
              "& .MuiMenuItem-root": {
                mb: "4px",
                borderRadius: "6px",
                "& .MuiSvgIcon-root": {
                  fontSize: 18,
                  color: "#019CDE",
                  marginRight: 1.5,
                },
              },
            },
          },
        },
      },
    },
    MuiTableSortLabel: {
      defaultProps: {
        sx: {
          "& .Mui-active": {
            color: "#212B36",
          },
          "&:hover": {
            color: "#212B36",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "secondary",
        disableElevation: true,
      },
    },
  },
});

theme.shadows.push(
  "0 6px 20px 0 rgba(0, 0, 0, 0.03), 0 6px 20px 0 rgba(0, 0, 0, 0.03)"
);

export default theme;
