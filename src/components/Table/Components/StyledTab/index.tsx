import styled from "@emotion/styled";
import { Tab } from "@mui/material";

export const StyledTab = styled(Tab)(({ theme }) => ({
  marginTop: "4px",
  marginBottom: "4px",
  textTransform: "capitalize",
  color: "#637381",
  fontWeight: 500,
  "&.Mui-selected": {
    color: "#212b36",
  },
}));
