import styled from "@emotion/styled";
import { TextField, TextFieldProps } from "@mui/material";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "white",
    fontSize: "16px",
    fontWeight: 500,
  },
  color: "secondary",
  backgroundColor: "transparent",
});

export default function index({ name, children, ...other }: TextFieldProps) {
  return (
    <StyledTextField name={name} {...other}>
      {children}
    </StyledTextField>
  );
}
